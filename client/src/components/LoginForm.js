import { useFormik } from 'formik';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, Navigate } from 'react-router-dom';

import { validationSchemaLogin } from '../utils/formValidationSchema';
import { loginUser } from '../api/userApi';
import ButtonLoader from './ButtonLoader';
import checkToken from '../utils/checkToken';
import { MyContext } from '../context/ContextProvider';
import decode  from 'jwt-decode';

const initialState = {email: '', password: ''};
const LoginForm = () => {

    const { authId, setAuthId } = MyContext();
    const [errData, setErrData] = useState({email: '', password:''});
    const { mutate, isLoading } = useMutation(loginUser,{
        onSuccess: ({data}) => {
            localStorage.setItem('token', data?.token);
            const { id } = decode(localStorage?.token);
            setAuthId(id);
        },
        onError: (err) => {
            // const error = JSON.parse(err?.response)
            // toast.error(`Error: ${error.err}`);
            const errObject = err.response.data.error;
            console.log(errObject)
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
        }
    });

  return (
    <>
    {!checkToken() ? 
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
        </form>
    :
        <Navigate to="/" replace={true} />
    }
    </>
  )
}

export default LoginForm