import ProfileTabs from '../components/ProfileTabs';
import ProfileTopInfo from '../components/ProfileTopInfo';


const Profile = () => {

  return (
    <div className='block border-x border-gray-200  w-full max-w-[860px] min-h-screen h-full py-6 overflow-hidden'>
      <ProfileTopInfo/>
      <ProfileTabs/>
    </div>
  )
}

export default Profile