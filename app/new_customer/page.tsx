"use client"
import { useEffect } from 'react';
import Toppart from '../components/Toppart';
import CustomerForm from './CustomerForm';
import { hasToken } from '@/axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router=useRouter()
  useEffect(()=>{
    if(!hasToken()){
      router.push("/login")
      router.refresh()
    }
  },[router])
  return (
    <div>
      <Toppart sortDesc='Provide your customer information' title='Customer Form'/>
      <CustomerForm/>
    </div>
  );
}

export default Page;
