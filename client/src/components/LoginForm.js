import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { validationSchemaLogin } from '../utils/formValidationSchema';
import { loginUser } from '../api/userApi';
import ButtonLoader from './ButtonLoader';
import checkToken from '../utils/checkToken';
import { MyContext } from '../context/ContextProvider';
import decode  from 'jwt-decode';

const initialState = {email: '', password: ''};
const LoginForm = () => {

    const { setAuthId } = MyContext();
    const [errData, setErrData] = useState({email: '', password:''});
    const [attempt, setAttempt] = useState(0);
    const [countDown, setCountDown] = useState(30);
    const [popUpErrNotVer, setPopUpErrNotVer] = useState(false);
    const [popUpErrBlocked, setPopUpErrBlocked] = useState(false);
    const id = useRef(null);
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(loginUser,{
        onSuccess: ({data}) => {

            localStorage.setItem('token', data?.token);
            const { id, position } = decode(localStorage?.token);
            localStorage.setItem('pstRle', position);
            setAuthId(id);
        
            if(data?.pstRle === '2001') {
                navigate('/', { replace: true });
            } else {
                navigate('/admin', { replace: true });
            }
        },
        onError: (err) => {
            // const error = JSON.parse(err?.response)
            // toast.error(`Error: ${error.err}`);
            if(attempt !== 3) {
                setAttempt(prev => prev + 1);
            }
            const errObject = err.response.data.error;
            console.log(errObject);
            if(errObject?.accVerified === false){
                setPopUpErrNotVer(prev => !prev);
                setPopUpErrBlocked(false);
            } else if (errObject?.blocked !== false){
                setPopUpErrBlocked(prev => !prev);
                setPopUpErrNotVer(false);
            }
            for (const [key, value] of Object.entries(errObject)) {
                setErrData({...errData, [key]: value});
            }
        }
    });

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: validationSchemaLogin,
        onSubmit: (formData) => {
          mutate(formData)
        },
    });


    //checking for failed attempts
    const clear = () => {
        clearInterval(id.current);
    };

    useEffect(() => {
        if(attempt === 3) {
           id.current = setInterval(() => {
                setCountDown(prev => prev - 1);
            },1000);

            setTimeout(() => {
                setAttempt(0);
                setCountDown(30);
            },30000);
        }
        return () => {
            clear();
        }
    },[attempt]);

    useEffect(() =>{
        if(countDown === 0) {
            clear();
        }
    },[countDown]);
    //checking for failed attempts ---end---

  return (
    <>
    {!checkToken() ? 
    <>
        {popUpErrNotVer &&
            <div className='text-yellow-700 bg-yellow-500/30 border-2 border-yellow-500 rounded-lg p-2 my-3
            text-sm flex items-center justify-center gap-x-3'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
                <div>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-semibold'>Account not verified!</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
                        className="w-4 h-4 cursor-pointer" onClick={() => setPopUpErrNotVer(false)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <p className='text-xs mt-1 text-ellipsis'>We noticed your account's email has not been verified. 
                    You can check your email to see the verification link that we've sent.</p>
                </div>
            </div>
        }
        {
            popUpErrBlocked && 
            <div className='text-red-700 bg-red-500/30 border-2 border-red-500 rounded-lg p-2 my-3
            text-sm flex items-center justify-center gap-x-3'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
                <div>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-semibold'>Your account is blocked!</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
                        className="w-4 h-4 cursor-pointer" onClick={() => setPopUpErrBlocked(false)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <p className='text-xs mt-1 text-ellipsis'>It seems like your account has been blocked!</p>
                </div>
            </div>
        }
    {
        //when user failed to login 3 times disable login for 30 seconds.
        attempt !== 3 ?
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
                <label htmlFor="email" className="block text-[#536471] mb-3">Email address</label>
                <input type="text" placeholder="email address" id="email" name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="rounded-md border border-[#536471] w-full p-4"/>
                {formik.touched.email && Boolean(formik.errors.email) && 
                <span className='text-red-500 font-light text-xs '>{formik.touched.email && formik.errors.email}</span>}
                {Boolean(errData?.email) && <span className='text-red-500 font-light text-xs '>{errData?.email}</span>}
            </div>
            <div className="mb-7">
                <label htmlFor="password" className="block text-[#536471] mb-3">Password</label>
                <input type="password" placeholder="password" id="password" name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="rounded-md border border-[#536471] w-full p-4"/>
                {formik.touched.password && Boolean(formik.errors.password) && 
                <span className='text-red-500 font-light text-xs '>{formik.touched.password && formik.errors.password}</span>}
                {Boolean(errData?.password) && <span className='text-red-500 font-light text-xs '>{errData?.password}</span>}
            </div>
            
            {isLoading ? <ButtonLoader 
                            loadingText="Checking credentials..."
                            style="bg-[#3DDAB4] text-white px-7 py-3 flex items-center justify-center ml-auto w-full rounded-full
                            focus:outline-none focus:ring-4 focus:ring-green-100"
                            /> :
                <button type="submit" className="bg-[#3DDAB4] text-white px-5 py-3 w-full rounded-full
                focus:outline-none focus:ring-4 focus:ring-green-100">Login</button>
            }
            <Link to="/register" className="mt-3 text-xs font-light text-center block w-full underline text-blue-500">
                Don’t have an account? Click here to Sign up!
            </Link>
            
            <Link to="/account-recovery" className="mt-3 text-xs font-light text-center block w-full underline text-blue-500">
                Forgot Password?
            </Link>
        </form>
        :
        <div className='flex items-start justify-start text-red-400'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="-mt-1 w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>

            <p className='ml-1'>Too many attempts! Login has been disabled for {countDown} seconds.</p>
        </div>
    }
    </>
    :
        <Navigate to="/" replace={true} />
    }
    </>
  )
}

export default LoginForm