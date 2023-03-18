import LoginForm from '../components/LoginForm';
import planetLogo from '../assets/PLANeTlogo.png';
import cmuccsLogo from '../assets/cmu.png';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="pb-3 w-full h-screen relative overflow-hidden">
        <nav className='flex items-center justify-center gap-3 px-4 h-[70px] bg-gradient-to-b from-[#20BF55] to-[#01BAEF] text-white'>
            <Link to="/" className='relative group'>
                <span>Transaction Process</span>

                <div className='bg-white group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all shadow-md rounded
                text-gray-600 absolute px-2 py-3 h-max translate-y-4 '>
                    <div className=' w-full relative flex flex-col space-y-2'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        className="absolute -top-7 text-white w-6 h-6 -rotate-90 ">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                        <Link to="/">Geospatial Map</Link>
                        <Link to="/messages">Messages</Link>
                        <Link to="/marketplace">Marketplace</Link>
                    </div>
                </div>
            </Link>
            <Link to="/" className='relative group'>
               <span>System Management</span>

                <div className='bg-white group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all shadow-md rounded
                 text-gray-600 absolute px-2 py-3 h-max translate-y-4 '>
                    <div className=' w-full relative flex flex-col space-y-2'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        className="absolute -top-7 text-white w-6 h-6 -rotate-90 ">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                        <Link to="/admin">Account List</Link>
                        <Link to="/admin/marketplace">Marketplace Data</Link>
                    </div>
                </div>
            </Link>
            <Link to='/homepage' className='bg-gray-800 px-4 py-2 rounded-lg'>Home</Link>
        </nav>
        {/* <img src={planetLogo} className="w-[233px] h-[238px] absolute rotate-[210deg] -top-[40px] -right-[45px]"/> */}
      
      
        <div className="w-full max-w-[1200px] overflow-auto min-h-[220px] m-auto flex justify-center items-center px-4 h-full">

            <div className="flex-shrink-0 w-full max-w-[540px]">
                <div className="w-full max-w-[347px]">
                    <div className="flex justify-start items-end mb-5">
                        <img src={planetLogo} className="w-[33px] h-[38px] mr-2"/>
                        <div className="font-bold text-lg">
                            <span>PLANeT</span>
                        </div>
                    </div>

                    <h1 className="font-bold text-3xl mb-7">Login to your account</h1>

                    <LoginForm/>
                </div>
            </div>

            <div className="hidden lg:block justify-self-start">
                <div className="flex justify-start items-center mb-3">
                    <img src={planetLogo} className="w-[140px] h-[157px] mr-2"/>
                    <div className="font-bold text-lg">
                        <div>
                        <h1 className="font-bol text-4xl mb-1">PLANeT</h1>
                        <p className="text-[#536471] text-sm font-light">The perfect place for plant enthusiasts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='m-2 first-letter inline-block absolute bottom-0 right-0'>
            <img src={cmuccsLogo} className="object-cover block w-52" />
        </div>
    </div>
  )
}

export default Login