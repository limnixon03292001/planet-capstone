import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { sendRecoveryLink } from '../api/userApi';
import EmailSentIllustration from '../assets/email_sent_illustration.svg';
import Forgot from '../assets/forgot.svg';
import planetLogo from '../assets/PLANeTlogo.png';
import ButtonLoader from '../components/ButtonLoader';

const AccountRecover = () => {

    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const { mutate, isLoading } = useMutation(sendRecoveryLink,
    {
        onSuccess: ({data}) => {
            console.log("recovery link", data?.message);
            if(data?.success){
              setSent(!sent);
            }
          },
          onError: (err) => {
              const errObject = err.response.data.error;
              console.log(errObject)
          }
    })

    const handleRecover = (e) => {
        e.preventDefault()
        mutate({ email });
    }

  return (

    sent ? 
        <div className='p-2 w-full h-screen flex flex-col items-center justify-between'>
            <div className='w-full my-auto text-left md:text-center'>
                <img src={EmailSentIllustration} alt="illustration_undraw_email" className='w-56 h-56 object-center md:mx-auto'/>
                <div>
                <h1 className='font-bold text-xl mt-2 text-gray-800'>Account's recovery link</h1>
                <p className='text-sm text-gray-600 mt-2'>We've already sent the account recovery link to your email.</p>
                <p className='text-sm text-[#00BFA6] mt-2'>Note! If you can't find the email in your inbox, try checking your spam folder.</p>
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
            <div className='w-full my-auto text-left md:text-center'>
                <img src={Forgot} alt="illustration_undraw_email" className='w-56 h-56 object-center md:mx-auto'/>
                <div>
                <h1 className='font-bold text-xl mt-2 text-gray-800'>Forgot your password?</h1>
                <p className='text-sm text-gray-600 mt-2'>In order for you to recover your account you need to enter your account's email.</p>
                <p className='text-sm text-[#00BFA6] mt-2'>We will send another link where you can safely reset your account's password</p>
                </div>
                <form onSubmit={(e) => handleRecover(e)}>
                    <input onChange={(e) => setEmail(e?.target?.value)}
                    required type="text" placeholder="email address" id="email" name="email"
                    className="rounded-md border border-[#8a9299] w-full max-w-[300px] p-2 px-4 mt-4"/>

                    {isLoading ? 
                        <ButtonLoader 
                            loadingText="Processing..."
                            style="bg-[#00BFA6] text-white py-2 px-3 rounded-lg mt-3 focus:ring-2 focus:ring-emerald-300 ml-2"
                        /> 
                    :
                        <button type="submit" className='bg-[#00BFA6] text-white py-2 px-3 rounded-lg mt-3 focus:ring-2 focus:ring-emerald-300 ml-2'>
                            Confirm
                        </button>
                    }
                </form>
            
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

export default AccountRecover