import { useEffect, } from 'react';
import { useLocation } from 'react-router-dom';
import FetchPost from '../components/FetchPost';
import Followers from '../components/Followers';
import MakePost from '../components/MakePost'
import SearchUser from '../components/SearchUser';
import { MyContext } from '../context/ContextProvider';

const PostFeeds = () => {
  // border border-red-500  
  const location = useLocation();
  const { setPosts, onlineUsers } = MyContext();

  useEffect(() => {
   
   return () => {
    setPosts([]);
   } 
  },[location]);

  return (
    <div className='flex w-full max-w-[940px]'>

      <div className='block border-x border-gray-200 w-full min-h-screen h-full py-6 '>
          <h1 className='font-extrabold text-lg px-4 py-2 sticky z-10 bg-white/60 backdrop-blur top-0'>Home</h1>
            <MakePost />
            <FetchPost />
      </div>

      <div className='h-screen w-full max-w-[300px] block sticky top-0 py-6 px-4 overflow-auto'>
      
        <SearchUser/>

        <div className='px-3 mt-10'>
            <div className='mb-9 flex items-center'>
              <span className='bg-green-400 p-2 rounded-full inline-block mr-3'/>
              <p>{onlineUsers?.length} Online users.</p>
            </div>

            <Followers/>         
        </div>
      </div>
      
    </div>
  )
}

export default PostFeeds