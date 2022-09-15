import { Link } from 'react-router-dom';

import planetLogo from '../assets/PLANeTlogo.png';
import user from '../assets/nixon.jpg';
import { linkNavigationBar, shortcutsNavigationBar } from '../data';

const Sidebar = () => {
  return (
    <div className='transition-all min-h-screen w-full max-w-max lg:max-w-[402px] flex justify-end border-r border-gray-200 '>
        <div className='py-4 px-4 h-auto max-w-max self-start sticky top-0 '>
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
                <img src={user} className="w-[48px] flex-shrink-0 h-[50px] rounded-full object-cover object-center m-auto lg:mr-2"/>
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