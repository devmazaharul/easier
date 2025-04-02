"use client"

import { instance } from "@/axios";
import { CustomError } from "@/error/customError";
import { ProductInfo } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductTable = ({productId}:{productId:string | undefined}) => {

  const [product,setProduct]=useState<ProductInfo |null>(null)

useEffect(()=>{
async function getProduct() {
 try {
  const responce=await instance.get(`/main/transactions/${productId}`)
  if(responce.status==200){
    setProduct(responce.data)
    console.log(responce.data);
  }
 } catch (error) {
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
 }
}
getProduct()
},[productId])
  return (
    <div>
          <table className="min-w-full border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Amount</th>
          <th className="border px-4 py-2">Type</th>
          <th className="border px-4 py-2">Number</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Added By</th>
          <th className="border px-4 py-2">Adder Name</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">{product?.data.items.name}</td>
          <td className="border px-4 py-2">{product?.data.items.amount}</td>
          <td className="border px-4 py-2">{product?.data.items.type}</td>
          <td className="border px-4 py-2">{product?.data.items.userNumber}</td>
          <td className="border px-4 py-2">{product?.data.items.updatedAt.toString()}</td>
          <td className="border px-4 py-2">{product?.data.addedByInfo.addedBy}</td>
          <td className="border px-4 py-2">{"maza"}</td>
        
        </tr>
      </tbody>
    </table>
    </div>
  );
}

export default ProductTable;
