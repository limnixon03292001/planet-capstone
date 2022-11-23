import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { registerUser } from '../api/userApi';

import { validationSchemaRegistration } from '../utils/formValidationSchema';
import ButtonLoader from './ButtonLoader';
import checkToken from '../utils/checkToken';

//initialState of our forms
const initialState = { firstName: '', lastName: '', phoneNumber: '', baranggay: '', city: '', age: '', birthday: '', email: '', confirmPassword: '', password: '' };

const RegisterForm = () => {

    const navigate = useNavigate();
    const [errData, setErrData] = useState({email: ''}); //this error state comes from server

    //request to server after validation
    const { mutate, isLoading } = useMutation(registerUser,{
        onSuccess: ({data}) => {
            console.log("hey", data);
            navigate(`/verification/?userId=${data.userId}&email=${data?.email}`, { replace: true });
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

    //handle form values and validations
    const formik = useFormik({
        initialValues: initialState,
        validationSchema: validationSchemaRegistration,
        onSubmit: (formData) => {
            mutate(formData);
        },
    });

  return (
    <>
    {!checkToken() ? 
        <form onSubmit={formik.handleSubmit}>
            <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                <div className="mb-5 mx-2">
                    <label htmlFor="firstName" className="block text-[#536471] mb-3">Firstname</label>
                    <input type="text" placeholder="firstname" id="firstName" name="firstName" 
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.firstName && Boolean(formik.errors.firstName) && 
                    <span className='text-red-500 font-light text-xs'>{formik.touched.firstName && formik.errors.firstName}</span>}
                </div>

                <div className="mb-5 mx-2">
                    <label htmlFor="lastName" className="block text-[#536471] mb-3">Lastname</label>
                    <input type="text" placeholder="Lastname" id="lastName"name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.lastName && Boolean(formik.errors.lastName) && 
                    <span className='text-red-500 font-light text-xs'>{formik.touched.lastName && formik.errors.lastName}</span>}
                </div>

                <div className="mb-5 mx-2">
                    <label htmlFor="phoneNumber" className="block text-[#536471] mb-3">Phone number</label>
                    <input type="number" placeholder="phone number" id="phoneNumber" name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber) && 
                    <span className='text-red-500 font-light text-xs'>{formik.touched.phoneNumber && formik.errors.phoneNumber}</span>}
                </div>

                <div className="mb-5 mx-2">
                    <label htmlFor="baranggay" className="block text-[#536471] mb-3">Baranggay</label>
                    <input type="text" placeholder="baranggay" id="baranggay" name="baranggay"
                    value={formik.values.baranggay}
                    onChange={formik.handleChange}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.baranggay && Boolean(formik.errors.baranggay) && 
                    <span className='text-red-500 font-light text-xs '>{formik.touched.baranggay && formik.errors.baranggay}</span>}
                </div>

                <div className="mb-5 mx-2">
                    <label htmlFor="city" className="block text-[#536471] mb-3">City</label>
                    <input type="text" placeholder="city" id="city" name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.city && Boolean(formik.errors.city) && 
                    <span className='text-red-500 font-light text-xs '>{formik.touched.city && formik.errors.city}</span>}
                </div>

                <div className="mb-5 mx-2">
                    <label htmlFor="age" className="block text-[#536471] mb-3">Age</label>
                    <input type="number" placeholder="age" id="age" name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.age && Boolean(formik.errors.age) && 
                    <span className='text-red-500 font-light text-xs '>{formik.touched.age && formik.errors.age}</span>}
                </div>

                <div className="mb-5 mx-2">
                    <label htmlFor="birthday" className="block text-[#536471] mb-3">Birthday</label>
                    <input type="date" placeholder="birthday" id="birthday" name="birthday"
                    value={formik.values.birthday}
                    onChange={(formik.handleChange)}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.birthday && Boolean(formik.errors.birthday) && 
                    <span className='text-red-500 font-light text-xs '>{formik.touched.birthday && formik.errors.birthday}</span>}
                </div>

                <div className="mb-5 mx-2">
                    <label htmlFor="email" className="block text-[#536471] mb-3">Email address</label>
                    <input type="email" placeholder="email" id="email" name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.email && Boolean(formik.errors.email) && 
                    <span className='text-red-500 font-light text-xs '>{formik.touched.email && formik.errors.email}</span>}
                    {Boolean(errData?.email) && <span className='text-red-500 font-light text-xs '>{errData?.email}</span>}
                </div>

                <div className="mb-5 mx-2">
                    <label htmlFor="password" className="block text-[#536471] mb-3">Password</label>
                    <input type="password" placeholder="password" id="password" name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.password && Boolean(formik.errors.password) && 
                    <span className='text-red-500 font-light text-xs '>{formik.touched.password && formik.errors.password}</span>}
                </div>

                <div className="mb-5 mx-2">
                    <label htmlFor="confirmPassword" className="block text-[#536471] mb-3">Confirm password</label>
                    <input type="password" placeholder="confirm password" id="confirmPassword" name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    className="rounded-md border border-[#536471] w-full p-4"/>
                    {formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword) && 
                    <span className='text-red-500 font-light text-xs '>{formik.touched.confirmPassword && formik.errors.confirmPassword}</span>}
                </div>
            </div>
            
            {isLoading ?  <ButtonLoader 
                            loadingText="Creating account..."
                            style="bg-[#3DDAB4] text-white px-7 py-3 flex items-center justify-center ml-auto w-max rounded-full
                            focus:outline-none focus:ring-4 focus:ring-green-100"/> :    
                <button type="submit" className="bg-[#3DDAB4] text-white px-7 py-3 block ml-auto w-max rounded-full
                focus:outline-none focus:ring-4 focus:ring-green-100">Create my account</button>
            }
        
            <Link to="/login" className="mt-3 text-xs font-light text-center block w-max ml-auto underline text-blue-500">Already have an account? Click here to Sign in!</Link>

        </form>
    :
        <Navigate to="/" replace={true} />
    }
    </>
  )
}

export default RegisterForm