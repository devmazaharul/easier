import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <div className='bg-[url(/b.jpeg)] bg-cover bg-center h-[470px] w-full'>
      <div className='bg-[#0000008c] w-full h-full bg-opacity-50 flex items-center justify-center'>
<div className='md:w-3/5 w-[94%] mx-auto text-center'>
<p className='text-gray-300 text-2xl font-semibold tex-center py-2'>Shop Transaction Management</p>
<p className='text-gray-400 leading-6'>A computer-based system for maintain mobile recharge, and cash-out transactions, ensuring seamless payment processing a shop.</p>

<div className='text-center w-full mt-7'>
  <Link className='primary-btn text-gray-300' href={"/new_customer"}>New customer</Link>
</div>
</div>
      </div>
      
    </div>
  );
}

export default Hero;
