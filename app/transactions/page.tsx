"use client"
import { useEffect } from "react";
import TransationList from "./TransationList";
import { hasToken } from "@/axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router=useRouter()

  useEffect(()=>{
    if(!hasToken())   router.push("/login")
    

    
  },[router])


  return <TransationList/>
}

export default Page;
