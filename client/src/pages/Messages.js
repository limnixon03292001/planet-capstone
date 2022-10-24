import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Route, Routes, useLocation } from 'react-router-dom'
import { getAllChats } from '../api/userApi'
import MessageList from '../components/MessageList'
import { MyContext } from '../context/ContextProvider'
import MainMessages from './MainMessages'

const Messages = () => {

  const { setChats, socket } = MyContext();
  const location = useLocation();
  //fetching all chats of a user
  const { isLoading, refetch: refetchAllChats } = useQuery('all-chats', getAllChats,
  {
      onSuccess: ({ data }) => {
          console.log("all-chats", data?.allChats);
          setChats(data?.allChats);
      },
      onError: (err) => {
          const errObject = err.response.data.error;
          console.log(errObject)
      }
  });

  useEffect(() => {
    socket?.on("messageReceived", (newMsgReceived) => {
        //checking the current url if the user is in the right room, if the user is in the right room don't make a toast!
       refetchAllChats();
    });
  },[socket]);

  useEffect(() => {
    refetchAllChats();
  },[location]);
    
  return (

    // max-w-[660px]
  <div className='block border-x border-gray-200 w-full max-w-[860px] h-full min-h-screen pt-6 overflow-hidden'>
    <h1 className='font-extrabold text-lg mt-1 px-4'>Messages</h1>
    <div className='h-full w-full'>
      <Routes>
        <Route path="/" element={<MessageList/>}/>
        <Route path="/chatroom/:id" element={<MainMessages />}/>
      </Routes>
    </div>

  </div>
  )
}

export default Messages