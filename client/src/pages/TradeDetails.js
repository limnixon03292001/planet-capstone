import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { createRoom, getTradeDetails } from '../api/userApi';
import EllipsisText from "react-ellipsis-text";
import moment from 'moment';
import { checkOnline } from '../utils/checkOnline';
import { MyContext } from '../context/ContextProvider';
import useScrollPosition from '../utils/hooks/useScrollPosition';
import { checkStatusPill } from '../utils/reusableFunctions';

const TradeDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { onlineUsers } = MyContext();
    const [details, setDetails] = useState({});
    const scrollPosition = useScrollPosition();

    const { isLoading } = useQuery(['trade-details', id], getTradeDetails,
    {
        onSuccess: ({ data }) => {
           setDetails(data);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });

    const { mutate, isLoading: gettingRoomLoading } = useMutation(createRoom,
        {
              onSuccess: ({ data }) => {
                  const chatroom = data?.chatroom;
                  const newRoom = data?.newRoom;
                  console.log(chatroom, newRoom);
      
                  if(chatroom){
                     return navigate(`/messages/chatroom/${chatroom?.chatroom_id}`);
                  } else if (newRoom){
                    return navigate(`/messages/chatroom/${newRoom?.chatroom_id}`);
                  }
              },
              onError: (err) => {
                  const errObject = err.response.data.error;
                  console.log(errObject)
              }
    });

  return (
    <div className='block border border-gray-200 w-full min-h-screen pt-6 relative '>
        <nav className={`${scrollPosition > 410 ? `sticky opacity-100 visible`: `invisible hidden` }
        flex md:justify-end py-2 transition-all  top-0 z-20 bg-white border-b border-gray-300 w-full px-3`}>
            <div className='flex items-center justify-between w-full md:w-full md:max-w-[730px]'>
                <div className='flex-1 flex items-center w-max'>
                        <img src={details?.seller?.plant_img} alt="plant_img"
                        className='rounded-lg w-10 h-10 object-cover object-center mr-2'/>
                        <div>
                            <p className='font-medium'>{details?.seller?.plant_name}</p>
                            <p className='text-xs text-emerald-500'>{details?.seller?.category}</p>
                        </div>
                </div>
                <div className='flex-1 self-end flex items-center'>
                        <img src={details?.requester?.plant_img} alt="plant_img"
                        className='rounded-lg w-10 h-10 object-cover object-center mr-2'/>
                        <div>
                            <p className='font-medium'>{details?.requester?.plant_name}</p>
                            <p className='text-xs text-emerald-500'>{details?.requester?.category}</p>
                        </div>
                </div>
            </div>
        </nav>

        <div className='px-4 pb-4 border-b border-gray-200 flex items-center justify-between'>
            <h1 className='font-extrabold text-lg mt-1 flex items-center justify-start'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                <span>Trade Details</span>
            </h1>   
            <div className='w-max'>
                <button className='w-max text-green-700 bg-green-500/30 py-1 px-2 rounded-md mr-2'>
                    Accept
                </button>
                <button className='w-max text-red-700 bg-red-500/30 py-1 px-2 rounded-md '>
                    Reject
                </button>
            </div>
        </div>

        <main className='w-full h-full'>

            <div className='px-4 py-2 mb-6'>
                <p className='text-sm text-gray-700'>Trade Request from:</p>
                <div className='flex items-center justify-start mt-2'>
                    <div className='relative'>
                        <img src={details?.requester?.r_p} alt="profile" className='w-12 h-12 
                        aspect-square self-start rounded-lg object-cover object-center'/>
                        {checkOnline(onlineUsers, details?.requester?.user_id) ? 
                        <div className='bg-green-500 p-[5px] h-3 w-3 absolute -bottom-1 -right-2 border-[3px] border-white rounded-full z-10 inline-block mr-2'/>
                        :
                        <div className='bg-gray-500 p-[5px] h-3 w-3 absolute -bottom-1 -right-2 border-[3px] border-white rounded-full z-10 inline-block mr-2'/>
                        }
                    </div>
                    <div className='flex-1 flex items-start justify-between'>
                        <div className='ml-2'>
                            <p className='font-bold'>{details?.requester?.r_fn} {details?.requester?.r_ln}</p>
                            <button type="button" onClick={() => mutate({userId: details?.requester?.user_id})}
                            className="bg-[#3DDAB4] text-white w-max px-3 py-2 rounded-lg focus:outline-none focus:ring-4
                        focus:ring-green-100 self-start text-xs font-bold tracking-wide mr-2 flex items-center justify-center " >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                            </svg>
                            <span>Send a message</span>
                        </button>
                        </div>
                        <div className='flex flex-col h-full items-center'>
                            {checkStatusPill(details?.seller?.trade_status, `text-sm py-[3px] px-[10px] rounded-full`)}
                            <p className='text-emerald-500 text-[10px] mt-2'>Requested {moment(details?.requester?.trade_creation).fromNow()}</p>
                        </div>
                    </div>
                </div>
            </div>


            <table className="table-fixed w-full h-full">
                <thead>
                    <tr>
                    <th className='hidden md:block'></th>
                    <th>
                        <div className='mr-2'>
                            <div className='relative'>
                                <img src={details?.seller?.plant_img} alt="plant_img"
                                className='rounded-lg w-full h-56 object-cover object-center'/>
                                <img src={details?.seller?.s_p} alt="plant_img"
                                className='rounded-full border-[5px] border-white w-14 h-14 object-cover object-center
                                absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2'/>
                            </div>
                            <div className='h-20 pt-2'>
                                <p>{details?.seller?.plant_name}</p>
                                <p className='text-sm text-gray-500 font-normal'>
                                    <EllipsisText text={details?.seller?.description ?? ''} length={60} />
                                </p>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div className='mr-2'>
                            <div className='relative'>
                                <img src={details?.requester?.plant_img} alt="plant_img"
                                className='rounded-lg w-full h-56 object-cover object-center'/>
                                <img src={details?.requester?.r_p} alt="plant_img"
                                className='rounded-full border-[5px] border-white w-14 h-14 object-cover object-center
                                absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2'/>
                            </div>
                            <div className='h-20 pt-2'>
                                <p>{details?.requester?.plant_name}</p>
                                <p className='text-sm text-gray-500 font-normal'>
                                    <EllipsisText text={details?.requester?.description ?? ''} length={60} />
                                </p>
                        
                            </div>
                        </div>
                    </th>
                    </tr>
                </thead>
                {/* <div className='w-full h-8 '/> */}
                <tbody>
                    {/* Growing Preference */}
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-emerald-600 whitespace-nowrap'>Growing Preference</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Sun Preference</td>
                        <td className='py-4 px-4'>{details?.seller?.sun_pref}</td>
                        <td className='py-4 px-4'>{details?.requester?.sun_pref}</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Soil Preference</td>
                        <td className='py-4 px-4'>{details?.seller?.soil_pref}</td>
                        <td className='py-4 px-4'> {details?.requester?.soil_pref}</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Interior Light</td>
                        <td className='py-4 px-4'>{details?.seller?.inter_light}</td>
                        <td className='py-4 px-4'>{details?.requester?.inter_light}</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Water Requirement</td>
                        <td className='py-4 px-4'>{details?.seller?.water_req}</td>
                        <td className='py-4 px-4'>{details?.requester?.water_req}</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Native Habitat</td>
                        <td className='py-4 px-4'>{details?.seller?.native_habitat}</td>
                        <td className='py-4 px-4'>{details?.requester?.native_habitat}</td>
                    </tr>

                    {/* Growing Information */}
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-emerald-600 whitespace-nowrap'>Growing Information</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Date Planted</td>
                        <td className='py-4 px-4'>{moment(details?.seller?.date_planted).format('LL')}</td>
                        <td className='py-4 px-4'>{moment(details?.requester?.date_planted).format('LL')}</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Average Height</td>
                        <td className='py-4 px-4'>{details?.seller?.avg_h}</td>
                        <td className='py-4 px-4'> {details?.requester?.avg_h}</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Average Width</td>
                        <td className='py-4 px-4'>{details?.seller?.avg_w}</td>
                        <td className='py-4 px-4'>{details?.requester?.avg_w}</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Foliage Color</td>
                        <td className='py-4 px-4'>{details?.seller?.foliage_color}</td>
                        <td className='py-4 px-4'>{details?.requester?.foliage_color}</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Foliage Type</td>
                        <td className='py-4 px-4'>{details?.seller?.foliage_type}</td>
                        <td className='py-4 px-4'>{details?.requester?.foliage_type}</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Foliage Scent</td>
                        <td className='py-4 px-4'>{details?.seller?.foliage_scent}</td>
                        <td className='py-4 px-4'>{details?.requester?.foliage_scent}</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Flower Color</td>
                        <td className='py-4 px-4'>{details?.seller?.flower_color}</td>
                        <td className='py-4 px-4'>{details?.requester?.flower_color}</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Fragrant</td>
                        <td className='py-4 px-4'>{details?.seller?.fragrant}</td>
                        <td className='py-4 px-4'>{details?.requester?.fragrant}</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Nocturnal Flowering</td>
                        <td className='py-4 px-4'>{details?.seller?.nocturnal_flowering}</td>
                        <td className='py-4 px-4'>{details?.requester?.nocturnal_flowering}</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Repeat Blooming</td>
                        <td className='py-4 px-4'>{details?.seller?.repeat_blooming}</td>
                        <td className='py-4 px-4'>{details?.requester?.repeat_blooming}</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Flowering Period</td>
                        <td className='py-4 px-4'>{details?.seller?.flowering_period}</td>
                        <td className='py-4 px-4'>{details?.requester?.flowering_period}</td>
                    </tr>
                </tbody>
            </table>
       

        </main>
    </div>
  )
}

export default TradeDetails

