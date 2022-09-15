import { Link } from 'react-router-dom';

import planetLogo from '../assets/PLANeTlogo.png';

const Register = () => {
  return (
    <div className="p-5">
        <div className="w-full max-w-[800px] m-auto">
            <div className="flex justify-start items-center mb-8">
                <img src={planetLogo} className="w-[75px] h-[73px] mr-2"/>
                <div className="font-bold text-lg">
                    <div>
                        <h1 className="font-bol text-xl">PLANeT</h1>
                        <p className="text-[#536471] text-xs font-light">The perfect place for Malabonian plant enthusiasts.</p>
                    </div>
                </div>
            </div>

            <h1 className="font-bold text-3xl mb-8 ml-3">Create your account</h1>

            <form>
                <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    <div className="mb-5 mx-2">
                        <label htmlFor="firstname" className="block text-[#536471] mb-3">Firstname</label>
                        <input type="text" placeholder="firstname" id="firstname"
                        className="rounded-md border border-[#536471] w-full p-4"/>
                    </div>

                    <div className="mb-5 mx-2">
                        <label htmlFor="lastname" className="block text-[#536471] mb-3">Lastname</label>
                        <input type="text" placeholder="Lastname" id="lastname"
                        className="rounded-md border border-[#536471] w-full p-4"/>
                    </div>

                    <div className="mb-5 mx-2">
                        <label htmlFor="baranggay" className="block text-[#536471] mb-3">Baranggay</label>
                        <input type="text" placeholder="baranggay" id="baranggay"
                        className="rounded-md border border-[#536471] w-full p-4"/>
                    </div>

                    <div className="mb-5 mx-2">
                        <label htmlFor="city" className="block text-[#536471] mb-3">City</label>
                        <input type="text" placeholder="city" id="city"
                        className="rounded-md border border-[#536471] w-full p-4"/>
                    </div>

                    <div className="mb-5 mx-2">
                        <label htmlFor="age" className="block text-[#536471] mb-3">Age</label>
                        <input type="number" placeholder="age" id="age"
                        className="rounded-md border border-[#536471] w-full p-4"/>
                    </div>

                    <div className="mb-5 mx-2">
                        <label htmlFor="birthday" className="block text-[#536471] mb-3">Birthday</label>
                        <input type="date" placeholder="birthday" id="birthday"
                        className="rounded-md border border-[#536471] w-full p-4"/>
                    </div>

                    <div className="mb-5 mx-2">
                        <label htmlFor="email" className="block text-[#536471] mb-3">Email address</label>
                        <input type="email" placeholder="email" id="email"
                        className="rounded-md border border-[#536471] w-full p-4"/>
                    </div>

                    <div className="mb-5 mx-2">
                        <label htmlFor="confirmPassword" className="block text-[#536471] mb-3">Confirm Password</label>
                        <input type="password" placeholder="confirm password" id="confirmPassword"
                        className="rounded-md border border-[#536471] w-full p-4"/>
                    </div>

                    <div className="mb-5 mx-2">
                        <label htmlFor="password" className="block text-[#536471] mb-3">Password</label>
                        <input type="password" placeholder="password" id="password"
                        className="rounded-md border border-[#536471] w-full p-4"/>
                    </div>
                </div>

                    <button type="submit" className="bg-[#3DDAB4] text-white px-7 py-3 block ml-auto w-max rounded-full
                    focus:outline-none focus:ring-4 focus:ring-green-100">Create my account</button>

                    <Link to="/login" className="mt-3 text-xs font-light text-center block w-max ml-auto underline text-blue-500">Already have an account? Click here to Sign in!</Link>

            </form>
        </div>
    </div>
  )
}

export default Register