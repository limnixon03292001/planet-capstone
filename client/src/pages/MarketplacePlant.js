import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import { getPlantMarketplace } from '../api/userApi';
import ItemCard from '../components/ItemCard';

const MarketplacePlant = () => {

  const { id } = useParams();
  const [plant, setPlant] = useState({});

  const { data, isLoading } = useQuery(['plant-item', id], getPlantMarketplace,
  {
    onSuccess: ({ data }) => {
      setPlant(data?.data[0]);
    },
    onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject);
    }
  });

  useEffect(() => {
    console.log(plant);
  }, [plant])

  return (
    <div className='block border border-gray-200 w-full min-h-screen pt-6 overflow-hidden'>
      <div>
        <h1 className='font-extrabold text-lg mt-1 px-4'>Marketplace</h1>


        <div className='px-4 mt-8 md:flex items-start'>

          <div className='w-full md:max-w-[420px] md:pr-7'>
            <div className='flex items-center justify-between mb-4'>
              <p className='font-bold'>Seller Information</p>
              <Link className='text-xs underline text-cyan-500'>See sellers profile</Link>
            </div>

            <div className='flex items-center'>
              <img src={plant?.profile} alt="profile" className='w-10 h-10 aspect-square rounded-full object-cover object-center'/>
              <div className='ml-2'>
                <p className='font-bold'>{plant?.firstname} {plant?.lastname}</p>
                <p className='text-xs text-gray-500'>{plant?.email}</p>
              </div>
            </div>

            {/* button */}
            <div className='mt-5 flex'>
              <button type="submit" 
              className="bg-[#3DDAB4] text-white w-full py-2 rounded-lg focus:outline-none focus:ring-4
               focus:ring-green-100 text-sm font-semibold tracking-wide mr-2 flex items-center justify-center " >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                </svg>
                 <span>Send a message</span>
              </button>

              <button type="submit" 
              className="bg-[#3DDAB4] text-white w-full py-2 rounded-lg focus:outline-none focus:ring-4
               focus:ring-green-100 text-sm font-semibold tracking-wide mr-2 flex items-center justify-center " >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                  <path fillRule="evenodd" d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>

                 <span>Request trade</span>
              </button>
            </div>
            {/* button */}

            <div className='mt-5'>
              <h1 className='text-2xl font-semibold mb-2'>{plant?.plant_name}</h1>
              <p className='text-green-400 text-lg font-medium'>{plant?.status}</p>
              <p className='font-bold text-2xl my-2'>{plant?.price} · <span className='text-sm font-normal align-middle'>{plant?.quantity} pieces available</span></p>
              {/* <p className='text-sm flex items-center mb-2 font-semibold'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                className="w-5 h-5 mr-1">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
                <span>{plant?.address}</span>
              </p> */}
              <div>
                <p className='font-semibold'>Description</p>
                <p className='text-[13px] text-gray-500 mt-2 text-justify'>{plant?.description}</p>
              </div>

            </div>
          </div>

          {/* pic */}
          <div className='mt-4 md:mt-0 flex-1 relative'>
            <div className='bg-emerald-500 blur-sm absolute inset-0'/>
              <img src={plant?.plant_img} alt="plant_img" className='object-contain object-center w-full h-96 rounded-lg relative z-20'/>
           
          </div>

        </div>


        {/* main description / specification / location */}
        
        <div className='px-4 mt-6 py-2 border-b border-gray-200  md:flex flex-row-reverse items-start md:text-center'>
          <div className='flex-1'>
            <div className='border-y  border-200 py-4'>
              <h1 className='font-semibold text-lg text-emerald-400'>Growing Preference</h1>
            </div>
            <div className='mt-4 space-y-3 text-sm'>
              <p className='font-semibold'>Sun Preference: <span className='font-normal'>{plant?.sun_pref}</span></p>
              <p className='font-semibold'>Soil Preference: <span className='font-normal'>{plant?.soil_pref}</span></p>
              <p className='font-semibold'>Interior Light: <span className='font-normal'>{plant?.inter_light}</span></p>
              <p className='font-semibold'>Water Requirement: <span className='font-normal'>{plant?.water_req}</span></p>
              <p className='font-semibold'>Native Habitat: <span className='font-normal'>{plant?.native_habitat}</span></p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 flex-1'>
            <div className=' border-y  border-200 py-4'>
              <h1 className='font-semibold text-lg text-emerald-400'>Growing Information</h1>
            </div>
            <div className='mt-4 space-y-3 text-sm'>
              <p className='font-semibold'>Date Planted: <span className='font-normal'>{plant?.date_planted}</span></p>
              <p className='font-semibold'>Average Height: <span className='font-normal'>{plant?.avg_h}</span></p>
              <p className='font-semibold'>Average Width: <span className='font-normal'>{plant?.avg_w}</span></p>
              <p className='font-semibold'>Foliage Color: <span className='font-normal'>{plant?.foliage_color}</span></p>
              <p className='font-semibold'>Foliage Type: <span className='font-normal'>{plant?.foliage_type}</span></p>
              <p className='font-semibold'>Foliage Scent: <span className='font-normal'>{plant?.foliage_scent}</span></p>
              <p className='font-semibold'>Flower Color: <span className='font-normal'>{plant?.flower_color}</span></p>
              <p className='font-semibold'>Fragrant: <span className='font-normal'>{plant?.fragrant}</span></p>
              <p className='font-semibold'>Nocturnal Flowering: <span className='font-normal'>{plant?.nocturnal_flowering}</span></p>
              <p className='font-semibold'>Repeat Blooming: <span className='font-normal'>{plant?.repeat_blooming}</span></p>
              <p className='font-semibold'>Flowering Period: <span className='font-normal'>{plant?.flowering_period}</span></p>
            </div>
          </div>
        </div>
        

        <div className='px-4 mt-6'>
          <h1 className='font-semibold text-lg'>Related Plants</h1>

          <div className='flex flex-wrap space-x-3'>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          <ItemCard/>
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default MarketplacePlant