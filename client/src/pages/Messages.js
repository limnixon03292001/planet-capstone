import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MessageList from '../components/MessageList'
import MainMessages from './MainMessages'

const Messages = () => {
  
  return (
  <div className='block border border-gray-200 w-full max-w-[660px] min-h-screen pt-6 overflow-hidden'>
    <h1 className='font-extrabold text-lg mt-1 px-4'>Messages</h1>
    <div className='h-full w-full'>
      <Routes>
        <Route path="/" element={<MessageList/>}/>
        <Route path="/chatroom/:id" element={<MainMessages/>}/>
      </Routes>
    </div>
  </div>
  )
}

export default Messages