import React from 'react'
import planetLogo from '../assets/PLANeTlogo.png';
import cmuccsLogo from '../assets/cmu.png';
import { Link } from 'react-router-dom';
import { AnimatedSvg } from '../components/AnimatedSvg';

const Homepage = () => {
  return (
    <div className='h-screen'>
        <nav className='flex items-center justify-center gap-3 px-4 h-[70px] bg-gradient-to-b from-[#20BF55] to-[#01BAEF] text-white'>
            <Link to="/" className='relative group'>
               <span>Transaction Process</span>

                <div className='bg-white group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all shadow-md rounded
                 text-gray-600 absolute px-2 py-3 h-max translate-y-4 '>
                    <div className=' w-full relative flex flex-col space-y-2'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        className="absolute -top-7 text-white w-6 h-6 -rotate-90 ">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                        <Link to="/">Geospatial Map</Link>
                        <Link to="/messages">Messages</Link>
                        <Link to="/marketplace">Marketplace</Link>
                    </div>
                </div>
            </Link>

             <Link to="/" className='relative group'>
               <span>System Management</span>

                <div className='bg-white group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all shadow-md rounded
                 text-gray-600 absolute px-2 py-3 h-max translate-y-4 '>
                    <div className=' w-full relative flex flex-col space-y-2'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        className="absolute -top-7 text-white w-6 h-6 -rotate-90 ">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                        <Link to="/admin">Account List</Link>
                        <Link to="/admin/marketplace">Marketplace Data</Link>
                    </div>
                </div>
            </Link>
            <Link to='/login' className='bg-gray-800 px-4 py-2 rounded-lg'>Login</Link>
        </nav>

        <div className='h-full w-full px-5 flex flex-col items-center justify-center xbg min-h-[340px]'>
            <div className="block justify-self-start mt-auto relative">
            
 
                <p className='font-semibold text-lg ml-2'>Welcome to</p>
                
                <div className="flex justify-start items-center mb-3">
                    <img src={planetLogo} className="md:w-[140px] md:h-[157px] w-[110px] h-[127px] mr-2"/>
                    <div className="font-bold text-lg relative  z-20">
                        <div>
                        <h1 className="font-bol text-4xl mb-1">PLANeT</h1>
                        <p className="text-[#536471] text-sm font-light">The perfect place for plant enthusiasts.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-auto w-max inline-block mb-'>
                <img src={cmuccsLogo} className="object-cover w-52" />
            </div>

      
        </div>
      
        <div className='w-full h-full absolute top-0 left-0 -z-20'>
            <AnimatedSvg/>
        </div>
    </div>
  )
}

export default Homepage