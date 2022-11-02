import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MyContext } from '../context/ContextProvider';

const ScrollMainMessages = ({  scrollRef, authId, sender }) => {

    const { socket, messages, setMessages } = MyContext();
    const [open, setOpen] = useState(false);
    const [imgLink, setImgLink] = useState("");

    useEffect(() => {
        socket?.on("messageReceived", (newMsgReceived) => {
            //here its important that we check the room_id here
            //we want to send the message to the correct room and not send it to other room lol!
            console.log("newMsgPath", newMsgReceived?.msgContent)
            if(Number(window.location.pathname.split("/")[3]) !== newMsgReceived?.msgContent?.chatroom_id){
                return ;
            } else {
                // console.log("truee", newMsgReceived?.msgContent)
                setMessages([...messages, newMsgReceived?.msgContent]);  
                console.log("x",newMsgReceived?.msgContent)
            }
        });
    }, [messages]);

  return (
    <div className='overflow-auto w-full h-full msgOuterContainer px-4 mt-4'>
        {messages.length === 0 ? 
        <div className='text-gray-500 mt-4 flex flex-col items-center justify-center'>
            <div>
                <img src={sender?.profile} alt="profile" className='w-24 h-24 rounded-full object-center object-cover'/>
                <p className='font-bold mt-2 text-gray-900'>{sender?.firstname} {sender?.lastname}</p>
            </div>
            <div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 m-auto">
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                </svg> */}
                <p className='text-gray-500 mt-3 text-sm'>You can now send a message to {sender?.firstname} {sender?.lastname}</p>
            </div>
        </div>
        :
            messages?.map((m, id) => {
                if(m?.sent_by === authId) {
                    return <div ref={scrollRef} key={id} className="flex flex-row-reverse items-center justify-start my-3">
                        <img src={m?.profile} alt='profile'  
                        className='flex-shrink-0 self-end rounded-full h-10 w-10 object-center object-cover'/>

                        <div className='mr-2'>
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
                        </div>
                    </div>
                } else {
                    return <div ref={scrollRef} key={id} className="flex items-center justify-start my-3">
                        <img src={m?.profile} alt='profile' 
                        className='rounded-full self-end h-10 w-10 object-center object-cover'/>

                        <div className='ml-2'>
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

                                <p className='break-all text-sm text-justify bg-emerald-200 text-emerald-900 p-2 rounded-md'>
                                    {m?.msg_content}
                                </p>
                            }
                         
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
