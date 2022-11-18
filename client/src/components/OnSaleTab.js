import moment from 'moment';
import React, { useState } from 'react'
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getPlantsUser } from '../api/userApi';
import { MyContext } from '../context/ContextProvider';
import { checkOnline } from '../utils/checkOnline';

const OnSaleTab = () => {

    const { id } = useParams();
    const { onlineUsers } = MyContext();
    const [onSalePlants, setOnSalePlants] = useState([]);
    

    const { isLoading } = useQuery(['onSale', id], getPlantsUser,
    {
        onSuccess: ({ data }) => {
            // console.log("on sale", data?.data)
            setOnSalePlants(data?.data)
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });

  return (
    <div className='border-b border-gray-200'>
        {/* <nav className='px-7 py-2 flex items-center border-b border-gray-200'>
        </nav> */}

        {/* items start */}
        <main className='px-6 mt-6 grid grid-cols-gridMarketPlace gap-5'>
        {onSalePlants?.map((p, id) => (
            <div className="relative w-full" key={id}>
            <Link to={`/marketplace/item/${p?.plant_detail_id}`} className="w-full" >
                <div className='group w-full'>
                <img src={p?.profile} alt="profile_img" 
                className='aspect-square absolute -top-3 -left-2 rounded-full w-10 h-10 object-cover object-center
                bg-emerald-300 border-[4px] border-white text-white z-20 block cursor-pointer'/>

                <div className='group-hover:opacity-100 opacity-0 group-hover:visible invisible absolute z-10 bg-white 
                translate-x-5 translate-y-4 rounded-lg overflow-hidden transition-opacity w-full max-w-[280px] shadow-xl'>
                    <Link to={`/profile/${p?.user_id}`}>
                    <div className='relative'>
                    <img src={p?.cover} alt="cover" className='absolute inset-0 w-full h-full object-cover object-center'/>
                    <div className='absolute inset-0 w-full h-full bg-gradient-to-tr from-black to-black/20 '/>
                    <div className='relative z-20 text-white p-3'>
                        <div className='flex items-center'>
                        <img src={p?.profile} alt="profile_img" 
                        className='aspect-square rounded-lg w-10 h-10 object-cover object-center
                        bg-emerald-300 block z-10 mr-2'/>

                        <div>
                            <p className='mx-1 font-bold'>{p?.firstname} {p?.lastname}</p>
                            <p className='text-gray-200 text-[9px] mx-1'>{p?.email}</p>
                        </div>
                        </div>

                        {checkOnline(onlineUsers, p?.user_id) ? 
                        <div className='flex items-center mt-4'>
                        <div className='bg-green-500 p-[5px] h-3 w-3 rounded-full z-10 inline-block mr-2'/>
                        <p className='text-sm'>Online</p>
                        </div>
                        :
                        <div className='flex items-center mt-4'>
                        <div className='bg-gray-500 p-[5px] h-3 w-3 rounded-full z-10 inline-block mr-2'/>
                        <p className='text-sm'>Offline</p>
                        </div>
                        }

                        <div className='mx-1 mt-4 flex items-center'>
                        <p className='text-xs mr-2 font-bold'>{p?.followerscount} <span className='font-normal'>followers</span></p>
                        <p className='text-xs font-bold'>{p?.followingcount} <span className='font-normal'>following</span></p>
                        </div>
                    </div>
                    </div>
                    </Link>
                </div>
                </div>

                <div className="relative overflow-hidden rounded-lg w-full shadow-md">
                    <img src={p?.plant_img} alt="plant_img" 
                    className='w-full h-[280px] aspect-square object-cover object-center bg-emerald-300 text-white'/>
                    <div className='px-3 py-2 w-full h-full bg-gradient-to-t from-black 
                text-white absolute left-0 right-0 bottom-0 flex flex-col justify-end'>
                        <div className='h-32'>
                        <h1 className='font-md text-xs text-green-400'>{p?.status}</h1>
                            <h1 className='font-bold text-lg'>
                            <EllipsisText text={p?.plant_name} length={19} />
                            </h1>
                            {p?.address &&   
                            <p className='text-[9px] flex items-end mb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                                className="w-3 h-3 mr-1">
                                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                </svg>

                                <span>{p?.address}</span>
                            </p> }
                        
                            <p className='text-gray-300 font-light text-[11px] mt-1'>
                            <EllipsisText text={p?.description} length={60} />
                            </p>
                        </div>
                    
                    </div>
                    <p className='absolute bottom-0 right-0 text-gray-200 m-2 text-[9px]'>{moment(p?.created_at).fromNow()}</p>
                </div>
                <div className='rounded-full bg-emerald-500 border-[4px] border-white
                text-white w-28 py-2 px-4 self-end text-center -mt-6 mx-3 relative'>
                    {p?.price}
                </div>
            </Link>
            </div>
        ))}
        </main>
        {/* items end */}

    </div>
  )
}

export default OnSaleTab