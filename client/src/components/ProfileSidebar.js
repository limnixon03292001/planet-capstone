import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../context/ContextProvider'
import { linkNavigationBar, shortcutsNavigationBar } from '../data';

const ProfileSidebar = () => {

    const { authUser } = MyContext();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    
    const Logout = () => {
        localStorage.clear("token");
        navigate("/login")
    }

  return (
    <div className='sm:hidden'>
        <img src={authUser?.profile} alt="profile" 
        className='w-8 h-8 rounded-full object-cover object-center'
        onClick={() => setIsOpen(prev => !prev)}/>

        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} authUser={authUser} Logout={Logout}/>
    </div>
  )
}

export default ProfileSidebar


const Sidebar = ({ isOpen, setIsOpen, authUser, Logout }) => {

    return (
        <>
        <div className={`${isOpen ? `bg-black/20` : `invisible`} transition-all w-full h-full absolute inset-0 z-30`} onClick={() => setIsOpen(false)}/>
        <div className={`${isOpen ? `-translate-x-0` : `-translate-x-full`}
          text-gray-900 fixed h-screen left-0 top-0 bottom-0 w-72 transition-all bg-white z-40 overflow-auto`}>
        <div className='h-full flex flex-col pt-4 pb-2'>
            <div className=' mx-4'>
                <h1 className='font-bold text-lg'>Account Info</h1>
            </div>

            <div className='mx-4 my-5'>
                <img src={authUser?.profile} alt="profile" 
                className='w-10 h-10 rounded-full object-cover object-center'/>
                <h1 className='mt-3 font-bold'>{authUser?.firstname} {authUser?.lastname}</h1>
                <p className='text-gray-500 text-xs'>{authUser?.email}</p>
            </div>

            <div className='space-y-2'>
                {shortcutsNavigationBar.map((data, id) => (
                    <Link to={data?.link} key={id} className="transiton-all hover:bg-gray-100 flex px-4 py-2 items-start justify-start">
                        {data?.icon}
                        <span className='text-lg self-end ml-3 font-[100]'>{data?.title}</span>
                    </Link>
                ))}

                {linkNavigationBar?.slice(0,2)?.map((data, id) => (
                    <Link to={data?.link} key={id} className="flex items-start px-4 py-2 justify-start">
                        {data?.icon}
                        <span className='text-lg  self-end ml-3 font-[100] block'>{data.title}</span>
                    </Link>
                ))}
                

                <button className="w-full transiton-all hover:bg-gray-100 flex px-4 py-2 items-start justify-start"
                onClick={Logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span className='text-lg self-end ml-3 font-[100]'>Logout</span>
                </button>
            </div>
          
            <div className='mt-auto'>
                <p className='text-gray-500 text-[10px] px-4'>
                    PLANeT Eco-trading: Platform for Malabonian Plant Enthusiast with Geospatial Mapping Support.
                    <span className='text-emerald-900'> [Beta Version]</span>
                </p>
            </div>
        </div>
        </div>
        </>
    )
}