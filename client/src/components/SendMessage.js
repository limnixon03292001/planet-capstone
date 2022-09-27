import e from 'cors'
import React from 'react'

const SendMessage = ({setMsgContent, mutate, msgContent, chatroomId}) => {

    const handleSendMsg = (e) => {
        e.preventDefault();
        mutate({chatroom_id: chatroomId, msg_content: msgContent});
        setMsgContent('');
    }

  return (
    <form className='relative block z-20' onSubmit={(e) => handleSendMsg(e)}>
        <input type="text" 
        value={msgContent} 
        onChange={(e) => setMsgContent(e.target.value)} name="message" placeholder='Send a message.' className='p-4 rounded border border-gray-200 block w-full inset-0 focus:border-none focus:outline-none focus:ring-1 focus:ring-green-300'/>
        <button type="submit" className='text-green-900 bg-green-200 px-4 rounded absolute top-0 bottom-0 right-0'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-6 h-6 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
        </button>
    </form>
  )
}

export default SendMessage