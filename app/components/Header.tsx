'use client';
import { hasToken } from '@/axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import jwt from "jsonwebtoken"
import { IoMenuSharp } from 'react-icons/io5';
import { MdLock } from 'react-icons/md';
import { jsonKeys } from '@/types';

export default function Header() {
  const router=useRouter()

  const [name,setName]=useState<jsonKeys | null>(null)
  useEffect(()=>{
    if(typeof window!="undefined"){
      const getToken=window.localStorage.getItem("token")
      const token=getToken?.startsWith("Bearer")?getToken.split(" ")[1]:localStorage.removeItem("token")
        if (typeof token === 'string') {
         const tokenValue = jwt.decode(token);
         //token type object keys are name role id
         setName(tokenValue as jsonKeys)

        }
    }

  },[])



  const pathNmae = usePathname();
const isLogin=typeof window!="undefined" && window.localStorage.getItem("token")?true:false


  function logoutFun(){
if(hasToken() && confirm("are you sure?")){
  window.localStorage.removeItem("token");
  router.push("/login")
  router.refresh()
}else{
  toast.error("Logout cancel")
}
  }


  



  return (
    <div className='w-[95%] mx-auto'>
      <div className="flex items-center py-4  justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            <Link href={'/'}>Easiyer</Link>
          </h1>
        </div>

        <div className="hidden font-extralight capitalize  items-center gap-4 md:flex">
          <Link
            className={`${
              pathNmae == '/services' ? 'common-color' : ''
            } hover:text-primary `}
            href={'/services'}
          >
            services
          </Link>
          <Link
            className={`${
              pathNmae == '/new_customer' ? 'common-color' : ''
            } hover:text-primary `}
            href={'/new_customer'}
          >
            New Customer
          </Link>
          <Link
            className={`${
              pathNmae == '/transactions' ? 'common-color' : ''
            } hover:text-primary `}
            href={'/transactions'}
          >
            Transactions
          </Link>
          <Link
            className={`${
              pathNmae == '/panel' ? 'common-color' : ''
            } hover:text-primary `}
            href={'/panel'}
          >
            Panel
          </Link>

         {isLogin==false &&  <Link
            className={ pathNmae == '/reset' ? 'common-color' : 'text-gray-500'}  
            href={'/reset'}
           
          >
            reset
          </Link>}

        </div>

        <div>
          {/* mobile menu */}
          <div className="md:hidden">
            <IoMenuSharp className="text-3xl" />
          </div>

          {/* laptopm menu */}
          <div className="md:block hidden">

           {!isLogin? <Link
              href={'/login'}
              className="flex items-center gap-1 primary-btn"
            >
              Login <MdLock />
            </Link>: <button
            onClick={logoutFun}
              className="flex items-center gap-1 danger-btn"
            >
           {name && name.name.split(" ")[0]}   Logout <MdLock />
            </button>}
            
          </div>
        </div>
      </div>
    </div>
  );
}