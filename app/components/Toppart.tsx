import React from 'react';

const Toppart = ({title="",sortDesc=""}) => {
  return (
    <div className='capitalize'>
      <div className='text-center leading-6 my-4 w-[94%] md:w-2/4 mx-auto'>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <p className='text-gray-400'>{sortDesc}</p>
      </div>
    </div>
  );
}

export default Toppart;
