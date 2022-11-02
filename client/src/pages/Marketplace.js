import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input'
import FilterButton from '../components/FilterButton'
import { getPlantsMarketplace } from '../api/userApi';
import { useQuery } from 'react-query';
import EllipsisText from "react-ellipsis-text";
import { MyContext } from '../context/ContextProvider';
import { checkOnline } from '../utils/checkOnline';
import moment from 'moment';


const lowestHighest = [
  { name: 'Default' },
  { name: 'Lowest Price' },
  { name: 'Highest Price' },
]

const plantsCategories = [
  { name: 'All' },
  { name: 'Homeplant' },
  { name: 'Fruit' },
  { name: 'Vegetable' },
  { name: 'Flowers'},
  { name: 'Seed' },
  { name: 'Herbs' },
  { name: 'Waterplant' },
  { name: 'Others' },
]

const dateAdded = [
  { name: 'Default' },
  { name: 'Newest' },
  { name: 'Oldest' },
]


const Marketplace = () => {

  const { onlineUsers } = MyContext();
  const [lowHigh, setLowHigh] = useState('');
  const [plantCat, setPlantCat] = useState('');
  const [dateAdd, setDateAdd] = useState('');

  const [marketPlacePlants, setmarketPlacePlants] = useState([]);

  const { data, isLoading } = useQuery(['plants-marketplace'], getPlantsMarketplace, {
    onSuccess: ({ data }) => {
      // console.log("marketplace plants", data?.data);
      setmarketPlacePlants(data?.data);
    },
    onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject);
    }
  })


  return (
    // max-w-[660px]
    <div className='block border border-gray-200 w-full min-h-screen pt-6 overflow-hidden'>
      <div className='w-full flex items-center'>
        <h1 className='font-extrabold text-lg mt-1 px-4'>Marketplace</h1>
        <Link to="/sell-plants" className='ml-auto block'>
          <button className='bg-green-200 text-green-800 rounded-full focus:outline-none focus:ring-4 
        focus:ring-green-300 flex items-center justify-center px-3 py-2 ml-auto mr-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className='text-md block mt-[1px]'>Sell plant</span>
          </button>
        </Link>
      </div>
      <div className='h-full w-full'>

        {/* button start */}
        <div className='transition-all block sticky top-0 w-full h-max px-4 py-4 mt-4 border-y border-gray-200 shadow'>
          <div className='flex items-center'>

            <div className='mr-2'>
              <p className='text-gray-500 text-sm mb-2'>Date Added</p>
              <FilterButton data={dateAdded} setData={setDateAdd}/>
            </div>

            <div className='mr-2'>
              <p className='text-gray-500 text-sm mb-2'>Price</p>
              <FilterButton data={lowestHighest} setData={setLowHigh}/>
            </div>

            <div>
              <p className='text-gray-500 text-sm mb-2'>Category</p>
              <FilterButton data={plantsCategories} setData={setPlantCat}/>
            </div>

            <div className='ml-auto '>
              <p className='text-gray-500 text-sm mb-2'>Search</p>
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                className= 'bg-white px-4 pr-7 py-2 rounded-lg w-full max-w-[280px] h-full outline-none border border-gray-300 focus:ring-2 focus:ring-green-200'
                placeholder='Search item...'
                // onChange={e => setSearchData(e.target.value)} 
              />
            </div>
          </div>
        </div>
        {/* button end*/}

        {/* items start */}
        <main className='px-4 mt-4 grid grid-cols-myGrid'>
          {marketPlacePlants?.map((p, id) => (
            
           
              <div className="mx-auto my-3 relative w-max" key={id}>
              <Link to={`/marketplace/item/${p?.plant_detail_id}`} >
                <div className='group'>
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

                <div className="relative overflow-hidden rounded-lg w-full max-w-[240px] shadow-md self-start">
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


    </div>
  )
}

export default Marketplace