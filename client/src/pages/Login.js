import { Link } from 'react-router-dom';

import planetLogo from '../assets/PLANeTlogo.png';

const Login = () => {
  return (
    <div className="p-3 w-full h-screen relative overflow-hidden">
        <img src={planetLogo} className="w-[233px] h-[238px] absolute rotate-[210deg] -top-[40px] -right-[45px]"/>
        <div className="w-full max-w-[1200px] m-auto flex justify-center items-center p-4 h-full">

            <div className="flex-shrink-0 w-full max-w-[540px]">
                <div className="w-full max-w-[347px]">
                    <div className="flex justify-start items-end mb-5">
                        <img src={planetLogo} className="w-[33px] h-[38px] mr-2"/>
                        <div className="font-bold text-lg">
                            <span>PLANeT</span>
                        </div>
                    </div>

                    <h1 className="font-bold text-3xl mb-7">Login to your account</h1>

                    <form>
                        <div className="mb-5">
                            <label htmlFor="email" className="block text-[#536471] mb-3">Email address</label>
                            <input type="text" placeholder="email address" id="email"
                            className="rounded-md border border-[#536471] w-full p-4"/>
                        </div>
                        <div className="mb-7">
                            <label htmlFor="password" className="block text-[#536471] mb-3">Password</label>
                            <input type="password" placeholder="password" id="password"
                            className="rounded-md border border-[#536471] w-full p-4"/>
                        </div>

                        <button type="submit" className="bg-[#3DDAB4] text-white px-5 py-3 w-full rounded-full
                        focus:outline-none focus:ring-4 focus:ring-green-100">Login</button>

                        <Link to="/register" className="mt-3 text-sm font-light text-center block w-full underline text-blue-500">
                            Don’t have an account? Click here to Sign up!
                        </Link>
                    </form>
                </div>
            </div>

            <div className="hidden lg:block justify-self-start">
                <div className="flex justify-start items-center mb-3">
                    <img src={planetLogo} className="w-[140px] h-[157px] mr-2"/>
                    <div className="font-bold text-lg">
                        <div>
                        <h1 className="font-bol text-4xl mb-1">PLANeT</h1>
                        <p className="text-[#536471] text-sm font-light">The perfect place for Malabonian plant enthusiasts.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Login