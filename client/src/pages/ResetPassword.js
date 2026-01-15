import React, { useState } from 'react'
import ButtonLoader from '../components/ButtonLoader'
import toast from 'react-hot-toast';
import Reset from '../assets/reset.svg';
import Expired from '../assets/expired.svg';
import planetLogo from '../assets/PLANeTlogo.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { checkLinkExpiration, resetPassword } from '../api/userApi';

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();
    const [isExpired, setIsExpired] = useState(false);
    const [reset, setReset] = useState({password: '', confirmPassword: ''});
    

    const { data, isLoading: checkExpirationLinkLoading } = useQuery([token], checkLinkExpiration,
    {
        retry: 0,
        onSuccess: ({data}) => {
          console.log("Reset Password Link", data?.message);
          setIsExpired(false);
        },
        onError: (err) => {
            const errObject = err.response?.data?.error;
    
            if(errObject === "expired" || errObject === "jwt malformed") {
              setIsExpired(true);
            }
        }
    });

    const { mutate, isLoading: resetPasswordLoading } = useMutation(resetPassword,
    {
        onSuccess: ({data}) => {
            toast.success(`Reset password successfully!`);
            navigate('/login', { replace: true });
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });

    const handleReset = (e) => {
        e.preventDefault();
       
        if(reset.password !== reset.confirmPassword){
            return alert('Your password and confirm password must match!');
        }

        mutate({
            token: token,
            password: reset?.password,
        })
    }

  return (

    checkExpirationLinkLoading ? 
        <p>Processing link</p> 
    :
        isExpired ? 
            <div className='p-2 w-full h-screen flex flex-col items-center justify-between'>
                <div className='w-full my-auto text-left md:text-center'>
                <img src={Expired} alt="illustration_undraw_email" className='w-56 h-56 object-center md:mx-auto'/>
                <div>
                    <h1 className='font-bold text-xl mt-2 text-gray-800'>Invalid or Expired Link</h1>
                    <p className='text-sm text-gray-600 mt-2'>It seems like this link is invalid or expired!</p>
                    <p className='text-sm text-[#00BFA6] mt-2'>Note! The recovery link is only valid for 30mins! <Link to="/login" replace={true} className='underline text-blue-400'>Go back</Link></p>
                </div>
                </div>

                <div className='flex flex-nowrap items-center mt-2 mb-3'>
                <img src={planetLogo} className="w-[33px] h-[38px] mr-2"/>
                    <div className="font-bold text-lg flex flex-col leading-tight">
                        <span>PLANeT</span>
                        <p className='text-[8px] font-light text-gray-600'>The perfect place for Malabonian plant enthusiasts.</p>
                    </div>
                </div>
            </div>
        :
            <div className='p-2 w-full h-screen flex flex-col items-center justify-between'>
                <div className='w-full my-auto text-left md:text-center p-1'>
                    <img src={Reset} alt="illustration_undraw_email" className='w-56 h-56 object-center md:mx-auto'/>
                    <div>
                        <h1 className='font-bold text-xl mt-2 text-gray-800'>Reset your password</h1>
                        <p className='text-sm text-gray-600 mt-2'>You can now reset your account's password.</p>
                    </div>
                    <div>
                        <form className='flex flex-col md:items-center' onSubmit={(e) => handleReset(e)}>
                            <input onChange={(e) => {
                                setReset({...reset, password: e?.target?.value});
                            }} 
                            required
                            type="password" placeholder="password" id="password" name="confirmPassword"
                            className="rounded-md border border-[#8a9299] w-full max-w-[300px] p-2 px-4 mt-4"/>

                            <input onChange={(e) => {
                                setReset({...reset, confirmPassword: e?.target?.value});
                            }} 
                            required
                            type="password" placeholder="confirm password" id="confirmPassword" name="confirmPassword"
                            className="rounded-md border border-[#8a9299] w-full max-w-[300px] p-2 px-4 mt-4"/>

                            {resetPasswordLoading ? 
                                <ButtonLoader 
                                    loadingText="Resetting your password..."
                                    style="bg-[#00BFA6] text-white py-2 px-3 w-full max-w-[300px] block md:mx-auto rounded-lg mt-3 focus:ring-2 focus:ring-emerald-300"
                                /> 
                            :
                                <button
                                type="submit" className='bg-[#00BFA6] w-full max-w-[300px] block md:mx-auto text-white py-2 px-3 rounded-lg mt-3 focus:ring-2 focus:ring-emerald-300'>
                                    Reset password
                                </button>
                            }
                        </form>
                    </div>

                    
                    {/* <Link to="/login" replace={true} className='underline text-blue-400'>Go back</Link> */}
                </div>

                <div className='flex flex-nowrap items-center mt-2 mb-3'>
                    <img src={planetLogo} className="w-[33px] h-[38px] mr-2"/>
                    <div className="font-bold text-lg flex flex-col leading-tight">
                        <span>PLANeT</span>
                        <p className='text-[8px] font-light text-gray-600'>The perfect place for Malabonian plant enthusiasts.</p>
                    </div>
                </div>
            </div>
  )
}

export default ResetPassword