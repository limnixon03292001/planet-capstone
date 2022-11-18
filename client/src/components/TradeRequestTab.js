import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getRequest } from '../api/userApi';

const TradeRequestTab = () => {


  const { data, isLoading } = useQuery('requests', getRequest,
  {
    onSuccess: ({ data }) => {
      console.log("trade requests data", data);
    },
    onError: (err) => {
      const errObject = err.response.data.error;
      console.log(errObject);
    }
  });

  return (

    <div className='px-4 mt-5 grid md:grid-cols-2 xl:grid-cols-3 gap-4'>

       {/* This card component located at the bottom */}
      {data?.data?.seller.map((r,id) => (
        <Card r={r} id={id} key={id}/>
      ))}
       

    </div>
  )
}

export default TradeRequestTab


const Card  = ({r, id}) => {
 return (
    <>
     {/* card start */}
     <div className='h-[140px] md:h-[140px] w-full max-w-[470px] shadow-md overflow-hidden rounded-md m-2 bg-[#F7F9F9]'>
          <div className=' w-full h-full flex items-center relative'>
            <div className='relative w-full h-full mr-[140px] md:mr-[160px] px-4 py-2'>
              <div className='h-full w-full space-y-1 flex flex-col justify-evenly'>
                <div className='w-full space-y-[2px]'>
                  <h1 className='text-lg font-bold text-gray-800'>{r?.plant_name}</h1>
                  <p className='text-xs text-gray-600'>Owner: {r?.firstname} {r?.lastname}</p>
                  <p className='text-xs text-gray-600'>Status: <span className='text-blue-500'>{r?.trade_status}</span></p>
                </div>
                <div className='space-x-2'>
                  <button className='p-1 inline-block w-max bg-red text-green-700 bg-green-500/30 rounded-full
                  focus:ring-2 ring-green-500/70'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" 
                    className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <button className='p-1 inline-block w-max bg-red text-red-700 bg-red-500/30 rounded-full
                  focus:ring-2 ring-red-500/70'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" 
                    className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                 
              </div>
              <img src={r?.profile}
              className='bg-blue-400 object-center object-cover h-14 w-14 rounded-full border-[4px] border-white
              absolute top-1/2 bottom-1/2 -right-12 -translate-y-1/2 z-10' />
            </div>
              <img src={r?.plant_img} alt="plant_img"
              className='bg-emerald-400 block h-full w-full max-w-[140px] md:max-w-[160px] object-cover object-left absolute top-0 bottom-0 right-0 clip '/>
          </div>
      </div>
      {/* card end */}
    </>
 )
}