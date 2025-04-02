'use client';
import { useRouter } from 'next/navigation';
import Toppart from '../components/Toppart';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { instance } from '@/axios';
import { CustomError } from '@/error/customError';
import { isValidrsetForm } from '@/utils';
import LoadingUi from '../components/LoadingUi';
import toast from 'react-hot-toast';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token');
      if (token) {
        if (!token.startsWith('Bearer')) {
          window.localStorage.removeItem('token');
          return;
        }
        router.push('/new_customer');
      }
    }
  }, [router]);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const formdata = new FormData(form);
      const email = formdata.get('email') as string | null;
      if (!email) throw new Error('Please provide email');

      if (isValidrsetForm(email)) {
        // login logic here
        const responce = await instance.post('/reset', { email });
        if (responce.status==200) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  mt-6">
      <Toppart
        title="Reset password"
        sortDesc="Reset your password and regain access to your account."
      />

      <div className="w-[80%] md:w-[300px]  ">
        <form onSubmit={handleAction}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input"
          />
          <div className="text-center w-full ">
            <button className="danger-btn w-full">
              {loading ? <LoadingUi /> : 'Reset'}
            </button>
          </div>
        </form>
        <div className="py-2">
          <p className="text-center text-gray-400 pt-2">OR</p>

          <button className="w-full border rounded-md py-2 cursor-pointer hover:bg-gray-100 border-gray-200 my-2">
            <Link href={'/login'}>Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
