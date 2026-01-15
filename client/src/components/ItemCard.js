import React from 'react';
import nixon from '../assets/nixon.jpg';
import sampaguita from '../assets/sampaguita.jpg';

const ItemCard = () => {
  return (  
    <div className='rounded-lg border border-gray-200 w-max max-w-max pb-2 overflow-hidden my-2'>
    
        <img src={sampaguita} alt="item img" className='w-full max-w-[250px]'/>

        <div className='mt-2'>
            <div>
                <p className='text-green-400 text-xs font-medium px-4'>Available</p>
                <p className='font-bold text-lg px-4'>Sampaguita</p>
            </div>
             <p className='font-bold text-lg px-4'>₱1,125.00</p>
            <div className='text-gray-500 px-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-5 h-5 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className='text-gray-500 text-xs font-light ml-1 inline-block align-middle'>Muzon, Malabon City</span>
            </div>
        </div>
    
        <div className='px-4'>
            <button className='bg-green-200 text-green-800 rounded-lg w-full focus:outline-none focus:ring-4 
        focus:ring-green-300 flex items-center justify-center px-3 py-2 ml-auto mt-4 mr-2 text-sm'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                <span className='block mt-[1px]'>Full Details</span>
            </button>
        </div>
    </div>
  )
}

export default ItemCard