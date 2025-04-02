"use client"
import React, { useState } from 'react';
import Toppart from '../components/Toppart';
import LoadingUi from '../components/LoadingUi';
import { CustomError } from '@/error/customError';
import { isValidEmail } from '@/utils';
import toast from 'react-hot-toast';
import { instance } from '@/axios';

const Page = () => {

  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState(false)
  const [state,setState]=useState({
    email:"",
    code:""
  })
const handleChage=(name:string,value:string)=>{
  setState({...state,[name]:value})
}

const handleSubmit=async(e:React.FormEvent)=>{
  e.preventDefault()
  setLoading(true)
  try {
    if(!state.email) throw new CustomError("Please provide email address",400)
      if(!isValidEmail(state.email)) throw new CustomError("Invalid email address",400)
        if(!status) {
          const responce=await instance.patch("/main/send_code",{email:state.email});
          if(responce.status==200){
            setStatus(true)
            toast.success("Chek your email and input the verification code.")
          }
        }else{
          if(!state.code) throw new CustomError("Please provide verification code",400)
            // if(state.code.length!==5) throw new CustomError("Invalid code",400)
          const responce=await instance.patch("/main/active_account",{email:state.email,code:state.code});
          if(responce.status==200){
            setStatus(true)
            toast.success("Your account is verified.")
          }
        }

  } catch (error:unknown) {
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
      <Toppart title='Verify account' sortDesc='Verify your account then you access your account.'/>

      <div className='w-1/3 md:w-[340px] mx-auto'>
        <form onSubmit={handleSubmit}>
          <input disabled={status?true:false} value={state.email} onChange={(e)=>handleChage("email",e.target.value)} type="email" className='input disabled:bg-gray-100' placeholder='Your Email' />
          {status &&  <div>
            <input value={state.code} onChange={(e)=>handleChage("code",e.target.value)} type="number" className='input' placeholder='Code here' />
            <div className="text-center w-full ">
            <button className="primary-btn w-full">{loading?<LoadingUi/>:"Verify"}</button>
          </div>
            </div>}

         {!status &&    <div className="text-center w-full ">
            <button className="primary-btn w-full">{loading?<LoadingUi/>:"Send Code"}</button>
          </div>}
          
         

        </form>
      </div>
    </div>
  );
}

export default Page;
