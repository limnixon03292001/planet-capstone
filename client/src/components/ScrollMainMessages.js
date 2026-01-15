import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { MyContext } from '../context/ContextProvider';
import ButtonLoader from './ButtonLoader';

const ScrollMainMessages = ({  scrollRef, authId, sender, messagesLoading }) => {

    const { socket, messages, setMessages } = MyContext();
    const [open, setOpen] = useState(false);
    const [imgLink, setImgLink] = useState("");

    useEffect(() => {
        socket?.on("messageReceived", (newMsgReceived) => {
            //here its important that we check the room_id here
            //we want to send the message to the correct room and not send it to other room lol!
            if(Number(window.location.pathname.split("/")[3]) !== newMsgReceived?.msgContent?.chatroom_id){
                return ;
            } else {
                // console.log("truee", newMsgReceived?.msgContent)
                setMessages([...messages, newMsgReceived?.msgContent]);  
                // console.log("x",newMsgReceived?.msgContent)
            }
        });
    }, [messages]);

  return (
    <div className='overflow-auto w-full h-full msgOuterContainer px-4 pt-4 bg-white'>

        {messagesLoading ? 
            <div className='h-full w-full flex items-center justify-center'>
                <ButtonLoader/>
            </div>
        :

            messages.length === 0 ? 
                <div className='text-gray-500 mt-4 flex flex-col items-center justify-center'>
                    <div>
                        <img src={sender?.profile} alt="profile" className='w-24 h-24 rounded-full object-center object-cover'/>
                        <p className='font-bold mt-2 text-gray-900'>{sender?.firstname} {sender?.lastname}</p>
                    </div>
                    <div>
                        <p className='text-gray-500 mt-3 text-sm'>You can now send a message to {sender?.firstname} {sender?.lastname}</p>
                    </div>
                </div>
            :
                messages?.map((m, id) => {
                    if(m?.sent_by === authId) {
                        return <div ref={scrollRef} key={id} className="flex flex-row-reverse items-center justify-start my-3 mt-6">
                            <img src={m?.profile} alt='profile'  
                            className='flex-shrink-0 self-end rounded-full h-10 w-10 object-center object-cover'/>

                            <div className='mr-2 relative'>
                                {/* checking if the msg_content is img or not */}
                                {
                                    m?.msg_content.split("/")[2] === "res.cloudinary.com" &&
                                    m?.msg_content.split("/")[4] === "image" &&
                                    m?.msg_content.split("/")[5] === "upload" 
                                    ?
                                    <>
                                        <img src={m?.msg_content} alt="pic" 
                                        className='object-center object-cover w-full lg:h-80 h-48 bg-emerald-300 rounded-md cursor-pointer'
                                        onClick={() => {
                                            setImgLink(m?.msg_content);
                                            setOpen(prev => !prev);
                                        }}/>

                                    </>
                                    :
                                    <p className='break-all text-sm text-justify bg-emerald-400 text-white p-2 rounded-md'>
                                        {m?.msg_content}
                                    </p>
                                }
                                <span className='text-gray-500 text-[10px] absolute right-0'> {moment(m?.created_at).format('LT')}</span>
                            </div>
                        </div>
                    } else {
                        return <div ref={scrollRef} key={id} className="flex items-center justify-start my-3 mt-6">
                            <img src={m?.profile} alt='profile' 
                            className='rounded-full self-end h-9 w-9 object-center object-cover'/>

                            <div className='ml-2 relative'>
                                {/* checking if the msg_content is img or not */}
                                {
                                    m?.msg_content.split("/")[2] === "res.cloudinary.com" &&
                                    m?.msg_content.split("/")[4] === "image" &&
                                    m?.msg_content.split("/")[5] === "upload" 
                                    ?
                                    
                                    <img  src={m?.msg_content} alt="pic" 
                                    className='object-center object-cover w-full lg:h-80 h-48 bg-emerald-300 rounded-md cursor-pointer'
                                    onClick={() => {
                                        setImgLink(m?.msg_content);
                                        setOpen(prev => !prev);
                                    }}/>

                                    :
                                    
                                    <p className='break-all text-sm text-justify bg-emerald-200 msg-item text-emerald-900 p-2 rounded-md'>
                                        {m?.msg_content}
                                    </p>
                                }
                                <span className='text-gray-500 text-[10px] absolute right-0'> {moment(m?.created_at).format('LT')}</span>
                            </div>
                            
                        </div>
                    }
                })
        }

        
        {open &&
            <div className='absolute z-30 inset-0 bg-gray-900/60 backdrop-blur w-full h-full' onClick={() => setOpen(false)}>
                <div className='relative w-full h-full'>
                    <button className='absolute left-0 top-0 m-2 text-white' onClick={() => setOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className='flex items-center justify-center w-full h-full'>
                        <img src={imgLink} alt="pic" 
                        className='object-center object-contain w-3/4 h-screen block relative z-50 rounded-lg'/>
                    </div>
                </div>
            </div>
        }
    </div>



  )
}

export default ScrollMainMessages
