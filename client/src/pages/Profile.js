import Followers from '../components/Followers';
import ProfileTabs from '../components/ProfileTabs';
import ProfileTopInfo from '../components/ProfileTopInfo';
import SearchUser from '../components/SearchUser';
import { MyContext } from '../context/ContextProvider';


const Profile = () => {

  const { onlineUsers } = MyContext();

  return (
    <div className='flex w-full max-w-[1000px]'>
      <div className='block border-x border-gray-200  w-full min-h-screen h-full py-6 overflow-hidden'>
          <ProfileTopInfo/>
          <ProfileTabs/>
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

export default Profile