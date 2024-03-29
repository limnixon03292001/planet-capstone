import React, { useEffect } from 'react'
import { useQuery, } from 'react-query'
import { Route, Routes, useLocation } from 'react-router-dom'
import { getAllChats } from '../api/userApi'
import MessageList from '../components/MessageList'
import ProfileSidebar from '../components/ProfileSidebar'
import { MyContext } from '../context/ContextProvider'
import MainMessages from './MainMessages'

const Messages = () => {

  const location = useLocation();
  const { setChats } = MyContext();


  //fix the duplication of code. location : 'SideBar Component'

  const { refetch: refetchAllChats, isLoading } = useQuery('all-chats', getAllChats,
  {
      onSuccess: ({ data }) => {
          setChats(data?.allChats);
      },
      onError: (err) => {
          const errObject = err.response.data.error;
          console.log(errObject)
      }
  });

  useEffect(() =>{
    refetchAllChats();
  },[location])
    
  return (

    // max-w-[660px]
  <div className='block border-x border-gray-200 w-full max-w-[860px] h-full min-h-screen pt-3 sm:pt-5 overflow-hidden'>
    <div className='text-lg mt-1 px-4 flex items-center justify-start'>
      <ProfileSidebar/>
      <h1 className='font-extrabold ml-3'>Messages</h1>
    </div>
    <div className='h-full w-full'>
      <Routes>
        <Route path="/" element={<MessageList isLoading={isLoading}/>}/>
        <Route path="/chatroom/:id" element={<MainMessages />}/>
      </Routes>
    </div>

  </div>
  )
}

export default Messages