import { Link } from 'react-router-dom';
import { MyContext } from '../context/ContextProvider';
import decode from 'jwt-decode'
import { checkOnline } from '../utils/checkOnline';
import moment from 'moment';

const MessageList = () => {

    const { id } = decode(localStorage?.token);
    const authId = id;
    const { onlineUsers, chats } = MyContext();

    //here we are checking the user that we are sending a message
    const check = (chat) => {
        if(authId === chat?.user_id) {
        return( <div className='px-4 flex items-center justify-start py-4 cursor-pointer hover:bg-emerald-500/20 transition-all'>
                    <div className='flex-shrink-0 w-[43px] h-[44px] relative mr-1'>
                        <img src={chat?.fp} alt="profile" className="w-full h-full rounded-full object-cover object-center "/>
                        {checkOnline(onlineUsers, chat?.friend_id) ?
                            <div className='bg-green-500 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1 absolute -bottom-1 -right-1 border-[3px]
                            border-white'/>
                        :
                            <div className='bg-gray-400 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1 absolute -bottom-1 -right-1 border-[3px]
                            border-white'/>
                        }
                    </div>
                    <div className='ml-2 flex-1'>
                        <h1 className='text-lg font-bold'>{chat?.ffn} {chat?.fln}</h1>
                        {/* <p className='text-gray-500 font-light text-xs'>Status: 
                            {checkOnline(onlineUsers, chat?.friend_id) ?
                                <span>Online</span>
                            : 
                                <span>Offline</span>
                            }   
                        
                        </p> */}
                        {!chat?.msg_content ?
                            <p className='text-gray-500 font-light text-xs'>Start a conversation with {chat?.ffn}</p>
                        :

                        chat?.sentby_id === authId ? 
                            <p className='text-gray-500 font-extralight text-xs'>
                                You: {chat?.msg_content}
                            </p>
                        : 
                            <p className='text-gray-500 font-extralight text-xs'>
                                {chat?.sentbyfn} {chat?.sentbyln}: {chat?.msg_content}
                            </p>
                        }
                    </div>
                    <div className='self-end'>
                        <span className='font-extralight text-[10px] break-words text-[#536471] inline-block ml-auto'>
                            <span className='mr-1'>•</span>{moment(chat?.msgcontent_created).fromNow()}
                        </span>
                    </div>
            </div>)
        }
        if(authId === chat?.friend_id) {
            return( 
            <div className='px-4 flex items-center justify-start py-4 cursor-pointer hover:bg-emerald-500/20 transition-all'>
            
                <div className='flex-shrink-0 w-[43px] h-[44px] relative mr-1'>
                    <img src={chat?.userp} alt="profile" className="w-full h-full rounded-full object-cover object-center "/>
                    {checkOnline(onlineUsers, chat?.user_id) ?
                        <div className='bg-green-500 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1 absolute -bottom-1 -right-1 border-[3px]
                        border-white'/>
                    :
                        <div className='bg-gray-400 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1 absolute -bottom-1 -right-1 border-[3px]
                        border-white'/>
                    }
                </div>
                <div className='ml-2 flex-1'>
                    <h1 className='text-lg font-bold'>{chat?.userfn} {chat?.userln}</h1>
                        {/* {checkOnline(onlineUsers, chat?.user_id) ?
                        <div className='flex items-center text-gray-500 text-xs'>      
                            <div className='bg-green-500 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1'/>
                            <span>Online</span>
                        </div> 
                        :                      
                        <div className='flex items-center text-gray-500 text-xs'>      
                            <div className='bg-gray-400 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1'/>
                            <p> Offline</p>
                        </div>  
                        }    */}
                    {!chat?.msg_content ?
                        <p className='text-gray-500 font-light text-xs'>Start a conversation with {chat?.userfn}</p>
                    :   

                    chat?.sentby_id === authId ? 
                        <p className='text-gray-500 font-extralight text-xs'>
                            You: {chat?.msg_content}
                        </p>
                    : 
                        <p className='text-gray-500 font-extralight text-xs'>
                            {chat?.sentbyfn} {chat?.sentbyln}: {chat?.msg_content}
                        </p>
                    }
                    
                </div>
                <div className='self-end'>
                    <span className='font-extralight text-[10px] break-words text-[#536471] inline-block ml-auto'>
                        <span className='mr-1'>•</span>{moment(chat?.msgcontent_created).fromNow()}
                    </span>
                </div>
            </div>
            )
        }
    }

  return (
    <div>
        <h1 className='font-extrabold text-2xl px-4 py-4 my-5 border-b border-gray-200'>My Chats</h1>
        {chats?.map((chat, id) => (
        <Link to={`chatroom/${chat?.chatroom_id}`} key={id}>
            {check(chat)}
        </Link>  
        ))}
             
    </div>
  )
}

export default MessageList