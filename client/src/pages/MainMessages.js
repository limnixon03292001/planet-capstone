import { useEffect, useState, useRef } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom'
import { checkOnline } from '../utils/checkOnline';
import { MyContext } from '../context/ContextProvider';
import { getSelectedRoom, getMessagesRoom, sendMessage } from '../api/userApi';
import decode from 'jwt-decode';
import toast from 'react-hot-toast';
import ScrollMainMessages from '../components/ScrollMainMessages';
import SendMessage from '../components/SendMessage';

const MainMessages = ({ refetchAllChats }) => {

    const { id: authId } = decode(localStorage?.token);
    const { id } = useParams();
    const navigate = useNavigate();
    const { onlineUsers, socket, messages, setMessages } = MyContext();
    const [msgContent, setMsgContent] = useState('');
    const [selectedRoom, setSelectedRoom] = useState({});

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
   
  return (
    <div className='mt-4 w-full h-full'>
        <div className='border-y border-gray-200 px-4 '>
            <div className='py-4'>
                {check(selectedRoom)}
            </div>
        </div>

        {/* main messages of  two users */}
        <ScrollMainMessages scrollRef={scrollRef} authId={authId} refetchAllChats={refetchAllChats}/>
        {/* end of main messages of  two users */}

        {/* input and button for sending the message */}
        <SendMessage setMsgContent={setMsgContent} msgContent={msgContent} mutate={mutate} chatroomId={selectedRoom?.chatroom_id}/>
        {/* input and button for sending the message */}

    </div>

  )
}

export default MainMessages