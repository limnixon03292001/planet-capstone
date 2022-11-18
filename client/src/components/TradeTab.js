import React from 'react'
import { useQuery } from 'react-query';
import moment from 'moment';
import { getIncomingRequest } from '../api/userApi';
import { Link } from 'react-router-dom';

const TradeTab = () => {


    const { data, isLoading } = useQuery('incoming-requests', getIncomingRequest,
    {
      onSuccess: ({ data }) => {
        console.log("incoming requests", data?.tradeRequests);
      },
      onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject);
      }
    });


  return (
    <div className='px-4 grid grid-cols-gridMarketPlace gap-3'>
        
        {data?.data?.tradeRequests.map((t, id) => (
            <Card t={t} key={id}/>
        ))}
    </div>
  )
}

export default TradeTab

const Card = ({ t }) => {
    return (
        <Link to={`/trade/details/${t?.trade_id}`}>
            <div className='shadow-lg w-full  rounded-lg p-2'>
                <div className='flex items-center h-48 relative'>
                    {/* status */}
                    <span className='text-blue-700 bg-blue-500/30 text-[9px] py-[3px] px-[5px] rounded-full 
                    absolute top-0 right-0'>{t?.trade_status}</span>
                    <div className='flex-1 self-start ml-3 mt-2 '>
                        <div className='relative w-max mx-auto'>
                            <img src={t?.s_plant_img} alt="plant_img"
                            className='w-24 h-24 rounded-full object-cover object-center block mx-auto'/>
                            <img src={t?.s_p} alt="plant_img"
                            className='w-9 h-9 rounded-full object-cover object-center block border-[3px] border-white absolute top-0 left-0'/>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="51" fill="none" viewBox="0 0 26 30"
                        className='ml-auto rotate-[190deg]'>
                            <g clipPath="url(#clip0_649_5)">
                            <path
                                stroke="#3DDAB4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M11.199 20.383L5 16.21m0 0l3.14-6.782M5 16.209s8.247-2.49 9.338-2.607c1.091-.118 2.472-.335 4.162.398 1.69.733 2.018 1.436 3 3 .982 1.564 1.487 5.54 1.5 7 .013 1.46.006 3.85-1.233 4.196h-3.685"
                            ></path>
                            </g>
                            <defs>
                            <clipPath id="clip0_649_5">
                                <path
                                fill="#fff"
                                d="M0 0H20.323V23.892H0z"
                                transform="rotate(-15.601 23.558 3.227)"
                                ></path>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className='flex-1 self-end mr-3 mb-2 0'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="51" fill="none" viewBox="0 0 26 30">
                            <g clipPath="url(#clip0_649_5)">
                            <path
                                stroke="#3DDAB4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M11.199 20.383L5 16.21m0 0l3.14-6.782M5 16.209s8.247-2.49 9.338-2.607c1.091-.118 2.472-.335 4.162.398 1.69.733 2.018 1.436 3 3 .982 1.564 1.487 5.54 1.5 7 .013 1.46.006 3.85-1.233 4.196h-3.685"
                            ></path>
                            </g>
                            <defs>
                            <clipPath id="clip0_649_5">
                                <path
                                fill="#fff"
                                d="M0 0H20.323V23.892H0z"
                                transform="rotate(-15.601 23.558 3.227)"
                                ></path>
                            </clipPath>
                            </defs>
                        </svg>
                        <div className='relative w-max mx-auto'>
                            <img src={t?.r_plant_img} alt="plant_img"
                            className='w-24 h-24 rounded-full object-cover object-center block mx-auto'/>
                            <img src={t?.r_p} alt="plant_img"
                            className='w-9 h-9 rounded-full object-cover object-center block border-[3px] border-white absolute bottom-0 right-0'/>
                        </div>
                    </div>
                </div>

                <div className='mt-2'>
                    <p className='text-gray-500 text-[10px]'>Sent to you {moment(t?.created_at).fromNow()}.</p>
                    <p className='text-sm  text-gray-600 mt-2'> <span className='font-medium'>{t?.r_fn} {t?.r_ln}</span> sent you a trade request for your 
                    <span> {t?.s_plant_name}</span>.</p>
                </div>

                <div className='mt-3'>
                    <button className='w-full text-green-700 bg-green-500/30 py-1 rounded-md '>
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    )
}