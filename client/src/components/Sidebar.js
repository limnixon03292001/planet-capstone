import { Link, useLocation } from 'react-router-dom';
import decode from 'jwt-decode'
import io from 'socket.io-client';
import planetLogo from '../assets/PLANeTlogo.png';
import user from '../assets/nixon.jpg';
import { linkNavigationBar, shortcutsNavigationBar } from '../data';
import { MyContext } from '../context/ContextProvider';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ENDPOINT = "http://localhost:5000";
var socket;

const Sidebar = () => {

    const { id: authUserId } = decode(localStorage?.token); //id of currently logged in user
    const {setSocket, setOnlineUsers, onlineUsers, ntf } = MyContext();

    useEffect(() => {
        socket = io(ENDPOINT);
        setSocket(socket);
        socket.emit("addUser", authUserId)
        socket.on("getUsers", (users) => {
        setOnlineUsers(users);
        });
    },[]);

    // const location = useLocation();

    // console.log("path",location.pathname);

    //F I X NOTIFCATION
    // useEffect(() => {
    //     socket?.on("messageReceived", (newMsgReceived) => {
    //         //here its important that we check the room_id here
    //         //we want to send the message to the correct room and not send it to other room lol!
    //         // console.log("room",parseInt(id) === newMsgReceived?.chatroom_id)
    //         console.log("bool", location.pathname)
    //         console.log("ntf",  newMsgReceived);
    //         if(location.pathname !== newMsgReceived?.chatRoomLink){
    //           toast.custom((t) => (
    //             <div
    //               className={`${
    //                 t.visible ? 'animate-enter' : 'animate-leave'
    //               } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //             >
    //               <div className="flex-1 w-0 p-4">
    //                 <div className="flex items-start">
    //                   <div className="flex-shrink-0 pt-0.5">
    //                     {/* <img
    //                       className="h-10 w-10 rounded-full object-cover object-center"
    //                       src={newNotif?.pic}
    //                       alt=""
    //                     /> */}
    //                   </div>
    //                   <div className="ml-3 flex-1">
    //                     <p className="mt-1 text-xs text-gray-500">
    //                         New message!
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="flex border-l border-gray-200">
    //                 <button
    //                   onClick={() => toast.dismiss(t.id)}
    //                   className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                 >
    //                   Close
    //                 </button>
    //               </div>
    //             </div>
    //         ));
    //         } 
    //         // console.log(ntf)
               
    //         return;
    //     });
        
    // }, [socket, location]);


  return (
    <div className='h-full w-full max-w-max lg:max-w-[282px] xl:max-w-[402px] transition-all block sticky top-0'>
        <div className='py-4 px-4 h-auto max-w-max ml-auto '>
            <div className="flex justify-center lg:justify-start items-end mb-10 lg:mb-5">
                <img src={planetLogo} className="w-[33px] h-[38px] mr-0 lg:mr-2"/>
                <div className="font-bold text-lg">
                    <span className='font-extrabold hidden lg:block'>PLANeT</span>
                </div>
            </div>

            {/* links */}
            <div>
                <p className='text-[#536471] text-md mt-6 hidden lg:block'>Links</p>
                {linkNavigationBar.map((data, id) => (
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
            <div className="flex justify-start items-center my-10">
                <img src={user} className="w-[40px] flex-shrink-0 h-[42px] rounded-full object-cover object-center m-auto lg:mr-2"/>
                <div className="hidden lg:block">
                    <h1 className='font-extrabold block'>Nixon Lim</h1>
                    <p className='font-extralight text-xs break-words'>limnixon03292001@gmail.com</p>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Sidebar