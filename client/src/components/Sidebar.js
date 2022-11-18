import { Link, useLocation } from 'react-router-dom';
import decode from 'jwt-decode'
import io from 'socket.io-client';
import planetLogo from '../assets/PLANeTlogo.png';
import user from '../assets/nixon.jpg';
import { linkNavigationBar, shortcutsNavigationBar } from '../data';
import { MyContext } from '../context/ContextProvider';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { getAllChats, getAuthUser } from '../api/userApi';

// https://planet-capstone-production.up.railway.app/
const ENDPOINT = "http://localhost:5000";
var socket;

const Sidebar = () => {

    const { id: authUserId } = decode(localStorage?.token); //id of currently logged in user
    const { setSocket, setOnlineUsers, onlineUsers, setAuthUser, authUser, setChats, chats } = MyContext();
    
    useEffect(() => {
        socket = io(ENDPOINT);
        setSocket(socket);
        socket.emit("addUser", authUserId)
        socket.on("getUsers", (users) => {
        setOnlineUsers(users);
        });
    },[]);

    //this function is listener for incoming messages, and notify the user
    useEffect(() => {
        socket?.on("messageReceived", (newMsgReceived) => {
            //checking the current url if the user is in the right room, if the user is in the right room don't make a toast!
            if(window.location.pathname !== newMsgReceived?.chatRoomLink){
              return toast.custom((t) => (
                <Link to={`${newMsgReceived?.chatRoomLink}`} className="w-full block max-w-md">
                  <div
                    className={`${
                      t.visible ? 'animate-enter' : 'animate-leave'
                    }  w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                  >
                   
                    <div className="flex-1 w-0 p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <img
                            className="h-10 w-10 rounded-full object-cover object-center"
                            src={newMsgReceived?.msgContent?.profile}
                            alt="profile_pic"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="mt-1 text-sm text-gray-900">
                              New message from 
                              <span className='font-medium'> {newMsgReceived?.msgContent?.firstname} {newMsgReceived?.msgContent?.lastname}</span>
                          </p>
                          <p className='text-xs'>
                            <span className='font-medium'> {newMsgReceived?.msgContent?.firstname} {newMsgReceived?.msgContent?.lastname}</span>:
                            <span> {newMsgReceived?.msgContent?.msg_content}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none 
                        rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Close
                      </button>
                    </div>
                    
                  </div>
                </Link>
                ));
            }  else {
                return
            }
        });
    },[]);


    const { isLoading } = useQuery('auth-user', getAuthUser,
    {
      onSuccess: ({ data }) => {
        setAuthUser(data?.data);
      },
      onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject)
      }
    });


      //fix the duplication of code. location : 'Messages Component'
    //fetching all chats of a user
    const { refetch: refetchAllChats } = useQuery('all-chats', getAllChats,
    {
        onSuccess: ({ data }) => {
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
    },[]);

  
    // useEffect(() => {
    //   console.log("x", chats?.filter((c) => c?.read === false && c));
    // },[chats])

  return (
    <div className='h-full w-full max-w-max lg:max-w-[282px] xl:max-w-[370px] transition-all block sticky top-0'>
        <div className='py-4 px-4 h-auto w-full max-w-[280px] ml-auto overflow-auto '>
            <div className="flex justify-center lg:justify-start items-end mb-10 lg:mb-5">
                <img src={planetLogo} className="w-[33px] h-[38px] mr-0 lg:mr-2"/>
                <div className="font-bold text-lg">
                    <span className='font-extrabold hidden lg:block'>PLANeT</span>
                </div>
            </div>

            {/* links */}
            <div>
                <p className='text-[#536471] text-md mt-6 hidden lg:block'>Links</p>
                {linkNavigationBar?.slice(0,2)?.map((data, id) => (
                    <Link to={data?.link} key={id} className="flex items-start my-6
                    justify-center lg:justify-start">
                        {data?.icon}
                        <span className='text-xl  self-end ml-3 font-[100]
                        hidden lg:block'>{data.title}</span>
                    </Link>
                ))}
                {/* Message Link */}
                {linkNavigationBar?.slice(2,3)?.map((data, id) => (
                    <Link to={data?.link} key={id} className="flex items-start my-6 
                    justify-center lg:justify-start">
                        <div className='relative'>
                          {data?.icon}
                          {chats?.filter((c) => c?.read === false && c?.sentby_id !== authUser?.user_id && c)?.length !== 0 ? 
                          <span className='bg-red-500 py-[2px] px-[6px] text-[11px] border-2 border-white rounded-full text-white absolute
                          -top-2 -right-2'>{chats?.filter((c) => c?.read === false && c?.sentby_id !== authUser?.user_id && c)?.length}</span>
                          : null
                          }
                        </div>
                        <span className='text-xl  self-end ml-3 font-[100]
                        hidden lg:block'>{data.title}</span>
                    </Link>
                ))}
                {/* End Message Link */}

                {linkNavigationBar?.slice(3,5)?.map((data, id) => (
                    <Link to={data?.link} key={id} className="flex items-start my-6
                    justify-center lg:justify-start">
                        {data?.icon}
                        <span className='text-xl  self-end ml-3 font-[100]
                        hidden lg:block'>{data.title}</span>
                    </Link>
                ))}
            </div>
            
            {/* Shortcuts */}
            <div>
                <p className='text-[#536471] text-md mt-10 hidden lg:block'>Shortcuts</p>
                {shortcutsNavigationBar.map((data, id) => (
                    <Link to={data?.link} key={id} className="flex items-start my-6
                        justify-center lg:justify-start">
                        {data?.icon}
                        <span className='text-xl  self-end ml-3 font-[100]
                        hidden lg:block'>{data.title}</span>
                    </Link>
                ))}
            </div>

            {/* users-profile */}
            <Link to={`/profile/${authUser?.user_id}`}>
              <div className="flex justify-start items-center my-10">
                  <img src={authUser?.profile} className="w-[40px] flex-shrink-0 h-[42px] rounded-full object-cover object-center lg:mr-2"/>
                  <div className="hidden lg:block">
                      <h1 className='font-extrabold block'>{authUser?.firstname} {authUser?.lastname}</h1>
                      <p className='font-extralight text-xs text-gray-500 break-words'>{authUser?.email}</p>
                  </div>
              </div>
            </Link>
             {/* users-profile */}

        </div>
    </div>
  )
}

export default Sidebar