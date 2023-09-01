import { Link, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode'
import io from 'socket.io-client';
import planetLogo from '../assets/PLANeTlogo.png';
import cmuccsLogo from '../assets/cmu.png';
import { linkNavigationBar, shortcutsNavigationBar } from '../data';
import { MyContext } from '../context/ContextProvider';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { getAllChats, getAuthUser } from '../api/userApi';
import addNotification from 'react-push-notification';


// https://planet-capstone-production.up.railway.app/ 
// https://planet-capstone.onrender.com/
// http://localhost:5000/
const ENDPOINT = "https://planet-capstone-olcl.onrender.com/";
var socket;

const Sidebar = () => {

    const navigate = useNavigate();
    const { id: authUserId } = decode(localStorage?.token); //id of currently logged in user
    const { setSocket, setOnlineUsers, setCountsOnline, setAuthUser, authUser, setChats, chats } = MyContext();
    const [sidebar, setSideBar] = useState(true);

    const Logout = () => {
        localStorage.clear("token");
        socket.disconnect();
        navigate("/login",{replace: true});
    }
  //   , {
  //     reconnectionAttempts: 5,
  //     reconnectionDelay: 1000,
  // }
    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit("addUser", authUserId);

        socket.on("getUsers", (users) => {
          setOnlineUsers(users);
          
          // console.log("realtime on", users?.numVer);
        });
  
        //for the actual websocket having an error attempt to reconnect
        socket.io.on("error", (error) => {
          // ...
          console.log('socket io error on ' + error);
          socket = io(ENDPOINT);
          socket.emit("addUser", authUserId);
        });

        let socketArray = ['reconnect', 'reconnect_attempt', 'reconnect_error', 'reconnect_failed'];

        for(let i = 0, len = socketArray.length; i < len; i++) {
          socket.io.on(socketArray[i], (attempt) => {
              // ...
              console.log(socketArray[i] + ' socket io on ' + attempt);
              socket.emit("addUser", authUserId);
          });
        }
        setSocket(socket);
    },[]);

    //this function is listener for incoming messages, and notify the user
    useEffect(() => {
        socket?.on("messageReceived", (newMsgReceived) => {
            //checking the current url if the user is in the right room, if the user is in the right room don't make a toast!
            if(window.location.pathname !== newMsgReceived?.chatRoomLink){
              addNotification({
                title: `${newMsgReceived?.msgContent?.firstname} ${newMsgReceived?.msgContent?.lastname}`,
                subtitle: `New message!`,
                message: `${newMsgReceived?.msgContent?.msg_content}`,
                icon: `${newMsgReceived?.msgContent?.profile}`,
                duration: 9000,
                native: true,
              });
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


  return (
    <div className='sm:visible sm:w-full sm:max-w-max sm:min-w-min invisible w-0 p-0 lg:max-w-[282px] xl:max-w-[370px] transition-all
     sticky top-0 overflow-auto' style={{height: '100vh'}}>
        <div className='py-4 px-4 h-full w-full max-w-[280px] ml-auto overflow-y-auto flex flex-col'>
        
          <div className='flex-shrink-0'>
            <div className="flex justify-center lg:justify-start items-end mb-10 lg:mb-5">
                <img src={planetLogo} className="w-[33px] h-[38px] mr-0 lg:mr-2"/>
                <div className="font-bold text-lg">
                    <span className='font-extrabold hidden lg:block'>PLANeT</span>
                </div>
            </div>

            <div>
              {/* links */}
              <div className='h-max mt-10'>
                  <button className='text-[#536471] text-md hidden lg:flex lg:items-center' onClick={() => setSideBar((prev) => !prev)}>
                    <span className='text-gray-900'>Transaction Process </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ml-2 
                     text-gray-600  ${sidebar ? `-rotate-90` : `rotate-90`}  transition-all`}>
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className={`${sidebar ? `h-max` : `h-0`} transition-transform overflow-hidden`}>
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
                        justify-center lg:justify-start border border-blue-500">
                            {data?.icon}
                            <span className='text-xl  self-end ml-3 font-[100]
                            hidden lg:block'>{data.title}</span>
                        </Link>
                    ))}
                  </div>
              </div>
              
              {/* Shortcuts */}
              {/* <div>
                  <p className='text-[#536471] text-md mt-10 hidden lg:block'>Shortcuts</p>
                  {shortcutsNavigationBar.map((data, id) => (
                      <Link to={data?.link} key={id} className="flex items-start my-6
                          justify-center lg:justify-start">
                          {data?.icon}
                          <span className='text-xl  self-end ml-3 font-[100]
                          hidden lg:block'>{data?.title}</span>
                      </Link>
                  ))}
              </div> */}

              {/* users-profile */}
              <Link to={`/profile/${authUser?.user_id}`}>
                <div className="flex justify-start items-center my-10">
                    <img src={authUser?.profile} className="w-[40px] h-[42px] rounded-full object-cover object-center lg:mr-2"/>
                    <div className="hidden lg:block">
                        <h1 className='font-extrabold block'>{authUser?.firstname} {authUser?.lastname}</h1>
                        <p className='font-extralight text-xs text-gray-500 break-words'>{authUser?.email}</p>
                    </div>
                </div>
              </Link>
              {/* users-profile */}

              <button className="flex items-center my-6 justify-center lg:justify-start"
                  onClick={Logout}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" 
                      className="w-7 h-7 block m-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      <span className='text-lg self-end ml-3 font-[100] hidden lg:block'>Logout</span>
                  </button>
            </div>
          </div>

          <div className='hidden lg:block mt-auto flex-shrink-0'>
              {/* <p className='text-gray-500 text-[10px] px-4 leading-normal'>
                  PLANeT Eco-trading: Platform for Malabonian Plant Enthusiast with Geospatial Mapping Support.
                  <span className='text-emerald-900'>[Beta Version]</span>
              </p> */}
              <img src={cmuccsLogo} className="w-56 object-cover"/>
          </div> 

        </div>
    </div>
  )
}

export default Sidebar