import React from 'react'
import { Link } from 'react-router-dom';
import NotFoundSvg from '../assets/notfound.svg';
import planetLogo from '../assets/PLANeTlogo.png';

const NotFound = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center p-2'>
      <div className='text-left sm:text-center mt-auto'>
        <img src={NotFoundSvg} alt='notfound_svg' className='w-44 h-44 sm:w-56 sm:h-56 object-center sm:mx-auto' />
        <h1 className='font-bold text-2xl text-gray-700'>Page not found</h1>
        <p className='text-gray-600 mt-3 text-xs sm:text-sm w-full max-w-[350px]'>Uh oh, we can't seem to find the page you're looking for.
        Try going back to the previous page, <Link>click here</Link></p>
      </div>

       <div className='flex flex-nowrap items-center mt-auto mb-3'>
          <img src={planetLogo} className="w-[33px] h-[38px] mr-2"/>
            <div className="font-bold text-lg flex flex-col leading-tight">
                <span>PLANeT</span>
                <p className='text-[8px] font-light text-gray-600'>The perfect place for Malabonian plant enthusiasts.</p>
            </div>
        </div>
    </div>
  )
}

export default NotFound