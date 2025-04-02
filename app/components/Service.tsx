import React from 'react';
import Toppart from './Toppart';
import Image from 'next/image';

const Service = () => {
  return (
    <div className='section'>
      <Toppart title='Services' sortDesc='Our system offers seamless mobile recharge, and cash-out services. It ensures quick, secure transactions ang shop operations smoother.'/>

      <div className='section'>
        <div className='grid grid-cols-1 w-[85%] mx-auto md:grid-cols-4 gap-5'>

      <div className=' bg-gray-50 rounded-sm border border-gray-200 hover:bg-amber-700 cursor-pointer hover:text-gray-300 hover:scale-105 duration-300 ease-in-out'>
        <Image className='h-[400px] bg-cover ' src={'/f.jpeg'} width={500} height={500} alt='imge'/>
        <h1 className='text-lg text-center py-2'>Pyment</h1>
      </div>
      <div className=' bg-gray-50 rounded-sm border border-gray-200 hover:bg-amber-700 cursor-pointer hover:text-gray-300 lg:scale-110 hover:scale-105 duration-300 ease-in-out'>
        <Image className='h-[400px] bg-cover ' src={'/e.jpeg'} width={500} height={500} alt='imge'/>
        <h1 className='text-lg text-center py-2'>Cash out</h1>
      </div>
      <div className=' bg-gray-50 rounded-sm border border-gray-200 hover:bg-amber-700 cursor-pointer hover:text-gray-300 hover:scale-105 duration-300 ease-in-out'>
        <Image className='h-[400px] bg-cover ' src={'/d.jpeg'} width={500} height={500} alt='imge'/>
        <h1 className='text-lg text-center py-2'>Bill</h1>
      </div>
      <div className=' bg-gray-50 rounded-sm border border-gray-200 hover:bg-amber-700 cursor-pointer hover:text-gray-300 hover:scale-105 duration-300 ease-in-out'>
        <Image className='h-[400px] bg-cover ' src={'/g.jpeg'} width={500} height={500} alt='imge'/>
        <h1 className='text-lg text-center py-2'>Mobile recharge</h1>
      </div>

      
        </div>
      </div>
    </div>
  );
}

export default Service;
