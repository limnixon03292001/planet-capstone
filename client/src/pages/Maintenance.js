import React from 'react'

const Maintenance = () => {
  return (
    <div className='h-screen w-full 
    flex items-center justify-center'>
        <div className='flex flex-col items-center p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} 
            stroke="currentColor" className="w-14 h-14">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span className='text-lg font-bold'></span>
            <p className='text-sm text-gray-600'>We sincerely apologize for this inconvenience. Our site is currently down.</p>
            <p className='text-sm text-gray-600'>We are working to get it back up and running as soon as possible.</p>
        </div>
    </div>
  )
}

export default Maintenance