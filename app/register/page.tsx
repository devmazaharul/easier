"use client"
import React, { useEffect, useState } from 'react';
import Toppart from '../components/Toppart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { instance } from '@/axios';
import { CustomError } from '@/error/customError';
import { isValidSignupfields } from '@/utils';
import toast from 'react-hot-toast';
import LoadingUi from '../components/LoadingUi';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router=useRouter()
  useEffect(() => {
    if(typeof window !=="undefined"){
      const token = window.localStorage.getItem('token')
      if (token) {
        if (!token.startsWith('Bearer')) {
          window.localStorage.removeItem('token');
          return;
        }
        router.push('/new_customer');
      }
    }
   
  }, [router]);


  const handleAction = async (e:React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form=e.target as HTMLFormElement;
      const formdata = new FormData(form);

      const email = formdata.get('email') as string | null;
      const name = formdata.get('name') as string | null;
      const address= formdata.get('address') as string | null;
      const shopname = formdata.get('shopname') as string | null;
      const number = formdata.get('number') as string | null;
      const password = formdata.get('password') as string | null;

      if (!email || !password || !address ||!shopname||!number||!name)
        throw new Error('Please provide name email number shopname address and password');
      const fieldValidation = isValidSignupfields({name,email,address,number,password,shopname});
      if (fieldValidation) {
   
        // login logic here
        const responce = await instance.post('/main/register', { name,email,number,address,shopname,password });
        if (responce.status==201) {
          toast.success(responce.data?.message)
          router.push('/login');
        }
      }
    } catch (error: unknown) {
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
  };


  return (
    <div className='flex flex-col items-center justify-center  mt-6'>
    <Toppart title='Register' sortDesc='Create your account today and unlock amazing possibilities! 🚀'/>

<div className='w-[80%] md:w-[300px]  '>
<form onSubmit={handleAction} >
    <input type="name" name='name' placeholder='Your name' className='input'  />
    <input type="email" name='email' placeholder='Your email' className='input'  />
    <input type="number" name='number' placeholder='Your number' className='input'  />
    <input type="text" name='shopname' placeholder='Your shop name' className='input'  />
    <input type="text" name='address' placeholder='Your sort address' className='input capitalize'  />
    <input type="password" name='password' placeholder='Your password' className='input'  />
 
   <div className='text-center w-full '>
   <button className="primary-btn w-full">{loading?<LoadingUi/>:"Register"}</button>
   </div>
</form>
<div className='py-4'>
  <p className='text-center text-gray-400 pt-2'>OR</p>

  <div className=' w-full text-center py-2'>Already have an account? <Link className='text-emerald-500 hover:text-emerald-600' href={"/login"}>Login</Link></div>
  
</div>
</div>

    </div>
  );
}

export default Page;
