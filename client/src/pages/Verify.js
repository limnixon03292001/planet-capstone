import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../api/userApi';
import EmailIllustration from '../assets/email_send_illustration.svg';
import EmailSentIllustration from '../assets/email_sent_illustration.svg';
import planetLogo from '../assets/PLANeTlogo.png';

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sent, setSent] = useState(false);
  const [credentials, setCredentials] = useState({userId: '', email: ''});

  const { mutate, isLoading } = useMutation(verifyEmail, 
  {
    onSuccess: ({data}) => {
      console.log("confirmation", data?.message);
      if(data?.success){
        setSent(!sent);
      }
    },
    onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject)
    }
  });

  const handleVerify = () => {
    mutate({
      userId: credentials?.userId,
      email: credentials?.email,
    })
  }

  useEffect(() =>  {
    if(searchParams?.get('userId') === null && searchParams?.get('email') === null) {
      return navigate('/login', {replace: true});
    }
    setCredentials({
      userId: searchParams?.get('userId'),
      email:searchParams.get('email'),
    });
  },[])

  return (
    <>
    {!sent ? 
        <div className='p-2 w-full h-screen flex flex-col items-center justify-between'>
          <div className='w-full my-auto text-left md:text-center'>
            <img src={EmailSentIllustration} alt="illustration_undraw_email" className='w-56 h-56 object-center md:mx-auto'/>
            <div>
              <h1 className='font-bold text-xl mt-2 text-gray-800'>Confirmation Link</h1>
              <p className='text-sm text-gray-600 mt-2'>You're almost there! Please check your email and click the confirmation link attached, to verify your account.</p>
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
          <img src={EmailIllustration} alt="illustration_undraw_email" className='w-56 h-56 object-center md:mx-auto'/>
          <div>
            <h1 className='font-bold text-xl mt-2 text-gray-800'>Verify your email address</h1>
        
            <div>
              <p className='text-sm text-gray-600 mt-2'>You’ve entered <span className='font-bold'>{searchParams.get('email')}</span> as the email address for your account.</p>
              <p className='text-sm text-gray-600 mt-2'>Please verify this email address by clicking the button below.</p>
            </div>

            {/* <div>
              <input type="text" placeholder='Email address' className="mt-4 rounded-md border border-[#536471] w-full max-w-[320px] p-4"/>
            </div> */}
            
            <button onClick={handleVerify}
            type="button" className='bg-[#00BFA6] text-white py-2 px-3 rounded-lg mt-3 focus:ring-2 focus:ring-emerald-300'>
              Verify my email.
            </button>

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
    }
  </>
  )
}

export default Verify