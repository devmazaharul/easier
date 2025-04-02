"use client"

import { CustomError } from "@/error/customError";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingUi from "../components/LoadingUi";
import { isValidName, isValidNumberbd } from "@/utils";
import { instance } from "@/axios";

const CustomerForm = () => {
const [state,setState]=useState({
  name:"",
  amount:"",
  type:"others",
  number:""
})

const [loading,setLoading]=useState(false)

const handleChange=(name:string,value:string)=>{
  setState({...state,[name]:value})
}

const handleSubmit=async(e:React.FormEvent)=>{
  e.preventDefault()
  setLoading(true)
  try {

    const {name,number,amount,type}=state;
    if(!name || !amount || !type) throw new CustomError("Please provide name amount type thos field are required",400)
      if(name.length>30 || name.length<2) throw new CustomError("Name max 30 and min 2 character ",400)
      if(!isValidName(name) ) throw new CustomError("Please provide a valid name",400);
        if(Number(amount)>999999999 || Number(amount)<1) throw new CustomError("Invalid amount",400);
    if(type !== "others" && !number) throw new CustomError("Please provide number",400)
      if(number && !isValidNumberbd(number)) throw new CustomError("Invalid bd 11 digit number",400)
        //api logic
      
    const responce=await instance.post("/main/transactions",{...state})
    if(responce.status==200){
      toast.success("Transactions added")
    }
  }catch (error: unknown) {
    const err = error as {
      response?: { data?: { message?: string } };
    } & Error;

    if (error instanceof CustomError) {
      toast.error(error.message);
    } else if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Something went wrong');
    }
  }finally{
    setLoading(false)
  }
  
}

  return (
    <div>
      <form onSubmit={handleSubmit} className='w-3/4 mx-auto md:w-[400px]'>

        <div>
          <label className='text-gray-600'>Customer Name</label>
          <input value={state.name} onChange={(e)=>handleChange("name",e.target.value)} type="text"  placeholder='John Doe' className='input capitalize'/>
        </div>
        <div>
          <label className='text-gray-600'>Amount</label>
          <input value={state.amount} onChange={(e)=>handleChange("amount",e.target.value)} type="number"  placeholder='100' className='input'/>
        </div>
        <div>
          <label className='text-gray-600'>Transaction type</label>
          <select value={state.type} onChange={(e)=>handleChange("type",e.target.value)} className='input'>
            <option value="mobile_recharge">Mobile Recharge</option>
            <option value="send_money">Send Money</option>
            <option value="cash_out">Cash Out</option>
            <option value="bill">Bill</option>
            <option value="others">Others</option>
          </select>
        </div>

        {state.type!=="others" && <div>
          <label className='text-gray-600'>Customer Number</label>
          <input value={state.number} onChange={(e)=>handleChange("number",e.target.value)} type="number"  placeholder='0123456789' className='input '/>
        </div>}

        <div className="my-2 text-center w-full">
          <button className="primary-btn w-full">{loading?<LoadingUi/>:"Process"}</button>
        </div>

      </form>
    </div>
  );
}

export default CustomerForm;
