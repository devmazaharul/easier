'use client';
import Toppart from '../components/Toppart';
import Link from 'next/link';
import { isValidLoginfields } from '@/utils';
import React, { useEffect, useState } from 'react';
import { hasToken, instance } from '@/axios';
import { useRouter } from 'next/navigation';
import { CustomError } from '@/error/customError';
import LoadingUi from '../components/LoadingUi';
import toast from 'react-hot-toast';

const Page = () => {
  const router=useRouter()
  useEffect(() => {
   if(hasToken()){
    router.push("new_customer")
    router.refresh()
   }
   
  }, [router]);

  const [loading,setLoading]=useState(false)

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const form = e.target as HTMLFormElement;
      const formdata = new FormData(form);
      const email = formdata.get('email') as string | null;
      const password = formdata.get('password') as string | null;
      if (!email || !password)
        throw new Error('Please provide email and password');
      const fieldValidation = isValidLoginfields({ email });
      if (fieldValidation) {
  
        // login logic here
        const responce = await instance.post('/main', { email, password });
        if (responce.status == 200) {
          localStorage.setItem('token', responce.data?.data?.token);
          router.push('/new_customer');
          router.refresh()
          toast.success("Successfully login")
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
    <div className="flex flex-col items-center justify-center  mt-6">
      <Toppart
        title="Login now"
        sortDesc="Welcome back! Sign in to access your account."
      />

      <div className="w-[80%] md:w-[300px]  ">
        <form onSubmit={handleAction}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            className="input"
          />

          <div className="text-center w-full ">
            <button className="primary-btn w-full">{loading?<LoadingUi/>:"Login"}</button>
          </div>
        </form>
       

        <div className="py-6">
          <p className="text-center text-gray-400 pt-2">OR</p>

          <div className=" w-full text-center py-2">
            Don&apos;t have an account?{' '}
            <Link
              className="text-emerald-500 hover:text-emerald-600"
              href={'/register'}
            >
              Register
            </Link>
          </div>
          <div className='block gap-2 text-sm'>
          <p className='inline'> verify your account?</p>
         <Link
            className=" text-center px-2 text-emerald-500 inline  my-2"
            href={'/account_verify'}
          >
            Verify account
          </Link>
         </div>
          <Link
            className="outline-btn text-center block  my-2"
            href={'/staf_access'}
          >
            Staf login
          </Link>
   
        </div>
      </div>
    </div>
  );
};

export default Page;
