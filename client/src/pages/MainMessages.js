import React, { Fragment, useState, useRef, useEffect  } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom'
import { checkOnline } from '../utils/checkOnline';
import { MyContext } from '../context/ContextProvider';
import { getSelectedRoom, getMessagesRoom, sendMessage, deleteConvo } from '../api/userApi';
import decode from 'jwt-decode';
import ScrollMainMessages from '../components/ScrollMainMessages';
import SendMessage from '../components/SendMessage';
import { openModal, closeModal } from '../utils/reusableFunctions';


const MainMessages = ({ refetchAllChats }) => {

    const { id: authId } = decode(localStorage?.token);
    const { id } = useParams();
    const navigate = useNavigate();
    let [isOpen, setIsOpen] = useState(false);
    const { onlineUsers, socket, messages, setMessages } = MyContext();
    const [selectedRoom, setSelectedRoom] = useState({});
    const [open, setOpen] = useState(false);
    const [msgContent, setMsgContent] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');


    const scrollRef = useRef();   

    //when a new message arrived auto scroll down
    //listener for upcoming messages sent by other user
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth'});
        // console.log("all msg", messages);
    },[messages]);

    //here we are fetching the participants/member of the selected room
    const { isLoading } = useQuery(['selected-room',id], getSelectedRoom,
    {
        retry: false,
        onSuccess: ({ data }) => {
            // console.log("room", data?.chatroom[0]);
            setSelectedRoom(data?.chatroom[0]);
        },
        onError: (err) => {
            
            const errCode = err.response.data.errorCode;
            console.log('error:', err.response.data.message)
            if(errCode === 401) {
                navigate('/messages')
            }
           
        }
    });

    //fetching all the messages associated/related in this room
    const { isLoading: messagesLoading } = useQuery(['messages',id], getMessagesRoom,
    {
        onSuccess: ({ data }) => {
            // console.log("allmessages", data?.messages);
            setMessages(data?.messages);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    });

    //sending a message to this room
    const { mutate, isLoading: sendMessageLoading } = useMutation(sendMessage,
    {
        onSuccess: ({ data }) => {
            // console.log("newmesage", data?.newMessage);
            setMsgContent('');
            setPictureUrl('');
            setOpen(false);
            //after the user succesfully sent a message, we are taking the new message inside the server to send it to the other user
            socket.emit("sendMessage", 
            {data: {sendTo: selectedRoom?.user_id === authId ? selectedRoom?.friend_id : selectedRoom?.user_id, 
                    msg: data?.newMessage, chatRoomLink: `/messages/chatroom/${id}`}});

            setMessages([...messages, data?.newMessage]);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    });

    const { mutate: mutateDeleteConvo, isLoading: isLoadingDelete } = useMutation(deleteConvo, 
    {
        onSuccess: ({ data }) => {
            console.log("deleted convo", data?.message);
            navigate('/messages')
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    });


    // //logic for checking the chatmate
    const check = (selectedRoom) => {
        if(authId === selectedRoom?.user_id) {
          return( <div className='flex items-center justify-start'>
                    <img src={selectedRoom?.fp} alt='profile' className="rounded-full w-12 h-12 object-cover object-center"/>
                    <div className='ml-2'>
                        <h1 className='text-xl font-bold'>{selectedRoom?.ffn} {selectedRoom?.fln}</h1>
                            
                            {checkOnline(onlineUsers, selectedRoom?.friend_id) ?
                            <div className='flex items-center justify-start'>
                                <div className='bg-green-500 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1'/>
                                <span className='text-xs font-light text-gray-500'>Active now.</span>
                            </div>
                            :
                            <div className='flex items-center justify-start'>
                                <div className='bg-gray-400 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1'/>
                                <span className='text-xs font-light text-gray-500 '>Offline.</span>
                            </div>
                            }
                    </div>
                </div>
            )
        }
        if(authId === selectedRoom?.friend_id) {
            
            return ( <div className='flex items-center justify-start'>
                        <img src={selectedRoom?.userp} alt='profile' className="rounded-full w-12 h-12 object-cover object-center"/>
                        <div className='ml-2'>
                        <h1 className='text-xl font-bold'>{selectedRoom?.userfn} {selectedRoom?.userln}</h1>
                    
                        {checkOnline(onlineUsers, selectedRoom?.user_id) ?
                        <div className='flex items-center justify-start'>
                            <div className='bg-green-500 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1'/>
                            <span className='text-xs font-light text-gray-500'>Active now.</span>
                        </div>
                        :
                        <div className='flex items-center justify-start'>
                            <div className='bg-gray-400 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1'/>
                            <span className='text-xs font-light text-gray-500 '>Offline.</span>
                        </div>
                        }
                    </div>
                </div>)
        }
    }

    const check2 = (selectedRoom) => {
        if(authId === selectedRoom?.user_id) {
          return {
            profile: selectedRoom?.fp, 
            firstname: selectedRoom?.ffn, 
            lastname: selectedRoom?.fln
        }
        
        }
        if(authId === selectedRoom?.friend_id) {
            
            return {
                profile: selectedRoom?.userp, 
                firstname: selectedRoom?.userfn, 
                lastname: selectedRoom?.userln
            }
        }
    }

    const handleSubmit = () => {
        mutateDeleteConvo({
            chatroom_id: selectedRoom?.chatroom_id,
            visible_to: selectedRoom?.visible_to,
            user1: selectedRoom?.user_id,
            user2: selectedRoom?.friend_id
        });
    }

   
  return (
    <div className='mt-4 w-full h-full'>
        <div className='border-b border-gray-200 px-4 flex items-center justify-between z-10'>
            <div className='py-4'>
                {check(selectedRoom)}
            </div>
            <div>
                <button className=' text-red-700 bg-red-500/30 p-2 rounded-full' type="button"
                onClick={() => openModal(setIsOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" 
                    className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>

        {/* main messages of  two users */}
        <ScrollMainMessages scrollRef={scrollRef} authId={authId} refetchAllChats={refetchAllChats} sender={check2(selectedRoom)}/>
        {/* end of main messages of  two users */}

        {/* input and button for sending the message */}
        <SendMessage setMsgContent={setMsgContent}
        msgContent={msgContent} mutate={mutate} chatroomId={selectedRoom?.chatroom_id}
        pictureUrl={pictureUrl} setPictureUrl={setPictureUrl} sendMessageLoading={sendMessageLoading} open={open} setOpen={setOpen}/>
        {/* input and button for sending the message */}
            
        {/* this component is at the bottom */}
        <LeaveConversationModal isOpen={isOpen} closeModal={closeModal} setIsOpen={setIsOpen} handleSubmit={handleSubmit} />
    </div>

  )
}

export default MainMessages


const LeaveConversationModal = ({isOpen , closeModal, setIsOpen, handleSubmit}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => closeModal(setIsOpen)}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 
                    text-left align-middle shadow-xl transition-all">
                        {/* <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 border-b border-gray-200 pb-3 mb-5"
                        >
                        {comments.length > 1 ? <p>{comments.length} Comments</p> : <p>{comments.length} Comment</p> } 
                        </Dialog.Title>
                         */}
                        <div>
                            <h1 className='font-bold text-xl text-gray-800'>Leave Conversation?</h1>
                            <p className='text-gray-600 text-sm mt-2 text-left'>This conversation will be deleted from your inbox, 
                                as well as deleting all of your messages Keep in mind that other people in the conversation 
                                will still be able to see it. </p>
                            <p className='mt-2 text-red-500 text-sm'>Warning! This action cannot be undone.</p>
                            <div className='w-max ml-auto mt-4'>
                                <button onClick={handleSubmit}
                                className='text-gray-100 bg-emerald-500 px-2 py-1 rounded-md mr-2'>
                                    Yes, I understand.
                                </button>
                                <button onClick={() => closeModal(setIsOpen)}
                                className='text-gray-100 bg-red-500 px-2 py-1 rounded-md'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition>
    )
}