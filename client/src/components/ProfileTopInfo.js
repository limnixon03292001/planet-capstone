import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserProfile } from '../api/userApi';
import decode from 'jwt-decode';
import moment from 'moment';
import ButtonFollow from './ButtonFollow';
import { MyContext } from '../context/ContextProvider';
import { checkOnline } from '../utils/checkOnline';
import ButtonMessage from './ButtonMessage';

const ProfileTopInfo = () => {
    const { id: authId } = decode(localStorage?.token);
    const [visible, setVisible]= useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userFollowers, setUserFollowers] = useState(0);
    const { onlineUsers } = MyContext();


    const { isLoading } = useQuery(['user-profile', id], getUserProfile,
    {   
        onSuccess: ({data}) => {
            setUser(data?.profile);
            setUserFollowers(Number(data?.profile?.followerscount));
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    });

    // const textFormatFollowers = (followersCount) => {
    //      return followersCount > 1 ?
    //             <span>{followersCount} followers</span>
    //         :
    //             <span>{followersCount ?? 0} follower</span>
    // }

    const toggleVisible = () => {
        if (window.scrollY > 80){
          setVisible(true)
        } 
        else if (window.scrollY  <= 300){
          setVisible(false)
        }
      };
    
      window.addEventListener('scroll', toggleVisible);


  return (
    <div>
        {/* top nav profile */}
        <h1 className={`${visible ? `fixed top-0 z-50 -translate-y-0` : `-translate-y-0`} w-full transition-all bg-white/80 backdrop-blur`}>
        <div className='flex items-center justify-start px-3 py-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"
            onClick={() => navigate(-1)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <div className='ml-5'>
            <h1 className='font-extrabold text-md mt-1'>{user?.firstname} {user?.lastname}</h1>
            {checkOnline(onlineUsers,Number(id)) ?
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
        </h1>
        {/* top nav profile */} 

    <div>
        {/* cover */}
        <div>
            <img src={user?.cover} alt="cover" className="bg-green-400 object-cover object-center w-full h-64"/>
        </div>
        {/* cover */}
        
        {/* user info */}
        <div className="md:flex ">
            <div className="flex-shrink-0 overflow-hidden relative z-10 -mt-12 ml-5 w-24 h-24">
                <img src={user?.profile} alt="profile" className="object-cover object-center w-full h-full border-4 border-white rounded-full"/>
                {checkOnline(onlineUsers,Number(id)) ?
                    <div className='bg-green-500 p-2 h-3 w-3 rounded-full z-10 absolute bottom-0 right-2 border-4 border-white'/>
                :
                    <div className='bg-gray-400 p-2 h-3 w-3 rounded-full z-10 absolute bottom-0 right-2 border-4 border-white'/>
                }
            </div>

            <div className="flex-1 w-full pl-8 md:pl-0 md:ml-3 mt-2 ">
                <div className='flex'>
                    <div className='flex-1'>
                    <h1 className="text-lg font-extrabold text-gray-900">{user?.firstname} {user?.lastname}</h1>
                    <a className="text-gray-500 text-xs underline block">{user?.email}</a>
                    <span className="text-xs text-gray-900 mr-2 font-bold">{userFollowers ?? 0} 
                    {userFollowers > 1 ?  <span className='text-gray-500 font-light'> followers</span> : <span className='text-gray-500 font-light'> follower</span>}</span>
                    <span className="text-xs text-gray-900 font-bold">{user?.followingcount ?? 0} <span className='text-gray-500 font-light'>following</span></span>
                    </div>
                    
                    {authId !== user?.user_id &&
                    <div className='self-start mr-4 -mt-12 md:-mt-0'>
                        <div className='flex items-center'>
                            <ButtonMessage id={id}/>
                            <ButtonFollow id={id} userFollowers={userFollowers} setUserFollowers={setUserFollowers}/>
                        </div>
                    </div>}
            
                </div>
            </div>
        </div>
        {/* user info */}

        {/* user descrip birthday etc */}
        <div className='mt-4'>
            <p className='mx-9 text-gray-500 text-sm'>{user?.description}</p>

            <div className='mx-8 mt-4 flex flex-wrap items-center justify-start'>
            <div className='text-gray-500 mb-1 mr-3 md:mr-7'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-5 h-5 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className='text-gray-500 text-xs font-light ml-1 inline-block align-middle'>{user?.city} City</span>
            </div>

            <div className='text-gray-700 mb-1 mr-3 md:mr-7'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[17px] h-[17px] inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <span className='text-gray-500 text-xs font-light ml-1 inline-block align-middle'>{user?.phonenumber}</span>
            </div>

            <div className='text-gray-500 mb-1 md:mr-7'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>

                <span className='text-gray-500 text-xs font-light ml-1 inline-block align-middle'>Joined {moment(user?.created_at).format("MMMM YYYY")}</span>
            </div>

            </div>
        </div>
        {/* user descrip birthday etc */}
    </div>

    </div> //outer end div
  )
}

export default ProfileTopInfo