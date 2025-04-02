'use client';
import { useEffect, useState } from 'react';
import Toppart from '../components/Toppart';
import { useRouter } from 'next/navigation';
import { hasToken, instance } from '@/axios';
import { CustomError } from '@/error/customError';
import { isValidStafForm } from '@/utils';
import LoadingUi from '../components/LoadingUi';
import toast from 'react-hot-toast';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if(hasToken()) router.push("/new_customer")
  }, [router]);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const formdata = new FormData(form);
      const number = formdata.get('number') as string | null;
      const password = formdata.get('password') as string | null;

      if (!number || !password)
        throw new Error('Please provide number and password');
      const fieldValidation = isValidStafForm(number);
      if (fieldValidation) {
        // login logic here
        const responce = await instance.post('/main/stafs/access', {
          number,
          password,
        });
        if (responce.status == 200) {
         if(typeof window!="undefined"){
          window.localStorage.setItem("token",responce.data?.data?.token)
          toast.success(`Successfully login ${responce.data?.data?.name}`)
          router.push('/new_customer');
         }
         
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  mt-6">
      <Toppart
        title="Staf Login"
        sortDesc="Welcome back! Sign in to access your shop."
      />

      <div className="w-[80%] md:w-[300px]  ">
        <form onSubmit={handleAction}>
          <input
            type="number"
            name="number"
            placeholder="Your number"
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            className="input"
          />
          <div className="text-center w-full ">
            <button className="primary-btn w-full">
              {loading ? <LoadingUi /> : 'Access'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
