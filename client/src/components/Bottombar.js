import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { MyContext } from '../context/ContextProvider';
import { linkNavigationBar, shortcutsNavigationBar } from '../data';

const Bottombar = () => {

    const { chats, authUser } = MyContext();
    const location = useLocation();

  return (
    <div className={`w-full bg-white fixed left-0 right-0 bottom-0 z-20 sm:hidden 
    ${location.pathname.split("/")[2] === `chatroom` && `hidden`}`}>

        <div className='flex justify-around items-center h-14 border-t border-gray-200'>
            {linkNavigationBar?.slice(0,2)?.map((data, id) => (
                <Link to={data?.link} key={id} className="flex items-center my-6
                justify-center lg:justify-start">
                    {data?.icon}
                </Link>
            ))}
            {linkNavigationBar?.slice(2,3)?.map((data, id) => (
                <Link to={data?.link} key={id} className="flex items-center my-6 
                justify-center lg:justify-start">
                    <div className='relative'>
                        {data?.icon}
                        {chats?.filter((c) => c?.read === false && c?.sentby_id !== authUser?.user_id && c)?.length !== 0 ? 
                        <span className='bg-red-500 py-[2px] px-[6px] text-[11px] border-2 border-white rounded-full text-white absolute
                        -top-2 -right-2'>{chats?.filter((c) => c?.read === false && c?.sentby_id !== authUser?.user_id && c)?.length}</span>
                        : null
                        }
                    </div>
                    <span className='text-xl  self-end ml-3 font-[100]
                    hidden lg:block'>{data.title}</span>
                </Link>
            ))}

            {shortcutsNavigationBar.map((data, id) => (
                <Link to={data?.link} key={id} className="flex items-center my-6
                    justify-center lg:justify-start">
                    {data?.icon}
                    <span className='text-xl  self-end ml-3 font-[100]
                    hidden lg:block'>{data.title}</span>
                </Link>
            ))}

            {linkNavigationBar?.slice(3,5)?.map((data, id) => (
                    <Link to={data?.link} key={id} className="flex items-center my-6
                    justify-center">
                        {data?.icon}
                        <span className='text-xl  self-end ml-3 font-[100]
                        hidden lg:block'>{data.title}</span>
                    </Link>
            ))}
        </div>
    </div>
  )
}

export default Bottombar