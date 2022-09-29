
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FetchPost from '../components/FetchPost';
import MakePost from '../components/MakePost'
import { MyContext } from '../context/ContextProvider';

const PostFeeds = () => {
  // border border-red-500  
  const location = useLocation();
  const { setPosts } = MyContext();

  useEffect(() => {
   
   return () => {
    setPosts([]);
   } 
  },[location]);


  return (
    <div className='block border-x border-gray-200  w-full max-w-[860px] min-h-screen h-full py-6'>
        <h1 className='font-extrabold text-lg mt-1 px-4'>Home</h1>
        <MakePost/>
        <FetchPost/>
    </div>
  )
}

export default PostFeeds