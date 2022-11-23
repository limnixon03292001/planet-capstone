import React, { useEffect, useState } from 'react'
import Verified from '../assets/verified.svg';
import Expired from '../assets/expired.svg';
import planetLogo from '../assets/PLANeTlogo.png';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { confirmation } from '../api/userApi';

const Confirmation = () => {

  const { token } = useParams();
  const [isExpired, setIsExpired] = useState(false);

  const { data, isLoading } = useQuery([token], confirmation,
  {
    retry: 0,
    onSuccess: ({data}) => {
      console.log("confirmation", data?.message);
      setIsExpired(false);
      
    },
    onError: (err) => {
        const errObject = err.response?.data?.error;

        if(errObject === "expired" || errObject === "jwt malformed") {
          setIsExpired(true);
        }
    }
  });

  return (

    isLoading ? 
      <p>Processing Link....</p> 
    :
      isExpired ?
        <div className='p-2 w-full h-screen flex flex-col items-center justify-between'>
            <div className='w-full my-auto text-left md:text-center'>
              <img src={Expired} alt="illustration_undraw_email" className='w-56 h-56 object-center md:mx-auto'/>
              <div>
                <h1 className='font-bold text-xl mt-2 text-gray-800'>Invalid or Expired Link</h1>
                <p className='text-sm text-gray-600 mt-2'>It seems like this link is invalid or expired!</p>
                <p className='text-sm text-[#00BFA6] mt-2'>Note! The confirmation link is only valid for 30mins! <Link to="/login" replace={true} className='underline text-blue-400'>Go back</Link></p>
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
            <img src={Verified} alt="illustration_undraw_email" className='w-56 h-56 object-center md:mx-auto'/>
            <div>
              <h1 className='font-bold text-xl mt-2 text-gray-800'>Email verified successfully!</h1>
              <p className='text-sm text-gray-600 mt-2'>Your email has been verified Successfully!</p>
              <p className='text-sm text-[#00BFA6] mt-2'>You can now login to PLANeT <Link to="/login" replace={true} className='underline text-blue-400'>Click here!</Link></p>
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
    
  )
}

export default Confirmation