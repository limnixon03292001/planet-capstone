import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FetchPost from '../components/FetchPost';
import MakePost from '../components/MakePost'
import SearchUser from '../components/SearchUser';
import { MyContext } from '../context/ContextProvider';

const PostFeeds = () => {
  // border border-red-500  
  const location = useLocation();
  const { setPosts, authUser, onlineUsers } = MyContext();

  useEffect(() => {
   
   return () => {
    setPosts([]);
   } 
  },[location]);


  return (
    <div className='flex w-full max-w-[940px]'>

      <div className='block border-x border-gray-200 w-full min-h-screen h-full py-6 '>
          <h1 className='font-extrabold text-lg px-4 py-2 sticky z-10 bg-white/60 backdrop-blur top-0'>Home</h1>
            <MakePost/>
            <FetchPost/>
      </div>

      <div className='h-screen w-full max-w-[300px] block sticky top-0 py-6 px-4 overflow-auto'>
      
        <SearchUser/>

        <div className='px-3 mt-10'>
            <div className='mb-9 flex items-center'>
              <span className='bg-green-400 p-2 rounded-full inline-block mr-3'/>
              <p>{onlineUsers?.length} Online users.</p>
            </div>

            <h1 className='font-extrabold text-xl'>Your followers</h1>
            <div className='h-full min-h-[200px]'>
              <div className="flex justify-start items-center mt-8">
                <img src={authUser?.profile} className="w-[40px] self-start flex-shrink-0 h-[42px] rounded-full object-cover object-center lg:mr-2"/>
                <div>
                    <h1 className='font-medium block text-sm'>{authUser?.firstname} {authUser?.lastname}  
                    <span className='text-sm text-gray-500 font-extralight'> followed you.</span></h1>
                    <span className='text-sm text-gray-500 font-extralight'>2 mins ago.</span>
                </div>
              </div>

              <div className="flex justify-start items-center my-10">
                <img src={authUser?.profile} className="w-[40px] self-start flex-shrink-0 h-[42px] rounded-full object-cover object-center lg:mr-2"/>
                <div>
                    <h1 className='font-medium block text-sm'>
                    <span className='text-sm text-gray-500 font-extralight'> New message from </span>
                      {authUser?.firstname} {authUser?.lastname}  
                    </h1>
                    <span className='text-sm text-gray-500 font-extralight'>2 mins ago.</span>
                </div>
              </div>

              <div className="flex justify-start items-center my-10">
                <img src={authUser?.profile} className="w-[40px] self-start flex-shrink-0 h-[42px] rounded-full object-cover object-center lg:mr-2"/>
                <div>
                    <h1 className='font-medium block text-sm'>
                    <span className='text-sm text-gray-500 font-extralight'> New message from </span>
                      {authUser?.firstname} {authUser?.lastname}  
                    </h1>
                    <span className='text-sm text-gray-500 font-extralight'>2 mins ago.</span>
                </div>
              </div>

          

            </div>
        </div>

      </div>
    </div>
  )
}

export default PostFeeds