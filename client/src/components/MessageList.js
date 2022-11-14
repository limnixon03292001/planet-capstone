import { Link } from 'react-router-dom';
import { MyContext } from '../context/ContextProvider';
import decode from 'jwt-decode'
import { checkOnline } from '../utils/checkOnline';
import moment from 'moment';
import { DebounceInput } from 'react-debounce-input';
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';

const MessageList = () => {

    const { id } = decode(localStorage?.token);
    const authId = id;
    const { onlineUsers, chats } = MyContext();
    
    //here we are checking the user that we are sending a message
    const check = (chat, id) => {
 
        if(authId === chat?.user_id) {
        return( <div className={`px-4 flex items-center justify-start py-4 cursor-pointer hover:bg-emerald-500/5 
                transition-all relative`}>
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
                    <div className={`ml-2 flex-1 
                        ${Boolean(chat?.read) === false && authId !== chat?.sentby_id ? 'text-emerald-500 font-medium': 'text-gray-500'}
                        `}>
                        <h1 className='text-lg font-bold text-gray-900'>{chat?.ffn} {chat?.fln}</h1>
    
                        {!chat?.msg_content ?
                            <p className='text-xs'>Start a conversation with {chat?.ffn}</p>
                        :

                        chat?.sentby_id === authId ? 
                            <p className='text-xs'>
                                You: <EllipsisText text={chat?.msg_content} length={90} />
                            </p>
                        : 
                            <p className='text-xs'>
                                {chat?.sentbyfn} {chat?.sentbyln}: <EllipsisText text={chat?.msg_content} length={90} />
                            </p>
                        }
                    </div>
                    <div className='self-end text-[#536471]'>
                        {Boolean(chat?.read) === false && authId !== chat?.sentby_id && 
                            <span className='bg-emerald-400 p-[6px] w-max ml-auto block rounded-full'/>
                        }
                        <span className='text-[10px] break-words inline-block ml-auto'>
                            <span className='mr-1'>•</span>{moment(chat?.msgcontent_created).fromNow()}
                        </span>
                    </div>
                    {/* <button className='absolute top-0 bottom-0 right-0 -translate-x-24'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button> */}
                </div>)
        }
        if(authId === chat?.friend_id) {
            return( 
            <div className={`px-4 flex items-center justify-start py-4 cursor-pointer hover:bg-emerald-500/5 transition-all`}>
            
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
                <div className={`ml-2 flex-1 
                ${Boolean(chat?.read) === false && authId !== chat?.sentby_id ? 'text-emerald-500 font-medium': 'text-gray-500'}
                `}>
                    <h1 className='text-lg font-bold text-gray-900'>{chat?.userfn} {chat?.userln}</h1>
                    
                    {!chat?.msg_content ?
                        <p className='text-xs'>Start a conversation with {chat?.userfn}</p>
                    :   

                    chat?.sentby_id === authId ? 
                        <p className='text-xs'>
                            You: <EllipsisText text={chat?.msg_content} length={90} />
                        </p>
                    : 
                        <p className='text-xs'>
                            {chat?.sentbyfn} {chat?.sentbyln}: <EllipsisText text={chat?.msg_content} length={90} />
                        </p>
                    }
                    
                </div>
                <div className='self-end text-[#536471] '>
                    {Boolean(chat?.read) === false && authId !== chat?.sentby_id && 
                        <span className='bg-emerald-400 p-[6px] w-max ml-auto block rounded-full'/>
                    }
                    <span className='font-extralight text-[10px] break-words inline-block ml-auto'>
                        <span className='mr-1'>•</span>{moment(chat?.msgcontent_created).fromNow()}
                    </span>
                </div>
            </div>
            )
        }
    }

    // useEffect(() =>{ 
    //     console.log("all Chats!", chats)
    // },[chats])

  return (
    <div>
        <div className='px-4 mt-5 mb-7 flex items-center justify-between'>
            <DebounceInput
                minLength={2}
                debounceTimeout={300}
                className= 'bg-white px-4 pr-7 py-2 rounded-full w-full text-sm max-w-[230px] md:text-base md:max-w-[380px] mr-2 h-full outline-none border border-gray-300 focus:ring-2 focus:ring-green-200'
                placeholder='Search user'
                // onChange={e => setSearchData(e.target.value)} 
              />
            <button 
                type='button'
                className='bg-green-200 text-green-800 rounded-full focus:outline-none focus:ring-4 
                focus:ring-green-300 flex items-center justify-center p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  self-center">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
        {chats?.map((chat, id) => (
            <Link to={`chatroom/${chat?.chatroom_id}`} key={id}>
                {check(chat, id)}
            </Link>  
        ))}
    </div>
  )
}

export default MessageList