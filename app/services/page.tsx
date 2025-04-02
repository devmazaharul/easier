"use client"
import { hasToken } from '@/axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
  const router=useRouter()
  useEffect(()=>{
    if(!hasToken()) router.push("/login")
    
  },[router])
  return (
    <div>
      
    </div>
  );
}

export default Page;
