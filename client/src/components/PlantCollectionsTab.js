import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import { getPlantCollection } from '../api/userApi';
import PlantDetailCollectionModal from './PlantDetailCollectionModal';
import EllipsisText from "react-ellipsis-text";
import { MyContext } from '../context/ContextProvider';

const PlantCollectionsTab = () => {

    const { authUser } = MyContext();
    const { id } = useParams();
    let [isOpen, setIsOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState({});
    const { data, isLoading } = useQuery(['plant-collections', id], getPlantCollection,
    {
        onSuccess: ({ data }) => {
            console.log(data);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    })

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(p) {
        setIsOpen(true);
        setSelectedPlant(p);
    }

  return (
    <div className='border-b border-gray-200'>
        <nav className='px-7 py-2 flex items-center border-b border-gray-200'>
          <h1 className='text-xl font-bold text-gray-700'>
              <span className='text-gray-500 text-xs font-light block'>Total plants</span>
              {data?.data?.data?.length} plants
          </h1>

            { authUser?.user_id === Number(id) 
            &&
                <Link to="/add-plantCollections" className='inline-block ml-auto'>
                    <button 
                        type='button'
                        className='bg-green-200 text-green-800 rounded-full focus:outline-none focus:ring-4 
                    focus:ring-green-300 flex items-center justify-center p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  self-center">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </Link>
            }
        </nav>

        <div className='h-full w-full px-7'>
            {/* <div className='transition-all block sticky top-0 w-full h-max px-4 py-4 mt-4 border-y border-gray-200 shadow'>
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
            </div> */}
            <main className='mt-4 grid grid-cols-myGrid gap-4'>
                {data?.data?.data.map((p, id) => (
                    <Fragment key={id}>
                      <div className="relative flex flex-row group
                      rounded-xl overflow-hidden w-full h-[160px] shadow-md self-start">
                        <div className='w-full max-w-[120px] relative inset-0'>
                          <img src={p?.plant_img} alt="plant_img" 
                          className='w-full h-full object-cover object-center bg-emerald-300 text-white'/>
                        </div>

                          <div className='py-2 w-full bg-slate-emerald/40 text-white flex-1 flex bg-cover bg-right-bottom' style={{backgroundImage: `url(${p?.plant_img})` }}>
                          
                             
                          </div>

                          <div className='absolute inset-0 w-full h-full flex '>
                            <div className='w-full max-w-[100px] p-4 emptySpace'></div>
                            <div className='flex-1 rounded-2xl h-full pl-4
                            px-2 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/20 flex flex-col justify-evenly items-start'>
                              <div>
                                <h1 className='font-bold text-lg text-gray-100'>{p?.plant_name}</h1>
                                <p className='text-gray-300 font-light text-[11px] mt-1'>
                                    <EllipsisText text={p?.description} length={60} />
                                </p>

                                {/* sun_pref */}
                                  <div className='text-[9px] mt-4'>
                                  {p?.sun_pref.split(",").splice(0,4).map((sp, i) => (
                                    <span key={i} className='bg-yellow-400/30 text-white mr-1 p-1 rounded-full'>{sp}</span>
                                  ))}
                                  </div>
                                {/* sun_pref */}

                                 {/*soil_pref */}
                                 <div className='text-[9px] mt-4'>
                                  {p?.soil_pref.split(",")[0] !== '' &&
                                    p?.soil_pref.split(",").splice(0,4).map((sp, i) => (
                                      <span key={i} className='bg-emerald-400/30 text-white mr-1 p-1 rounded-full'>{sp}</span>
                                    ))
                                  }
                                  </div>
                                {/* soil_pref */}
                              
                              </div> 
                              
                            </div>

                            <div className='bg-emerald-500/80 h-full w-[10px] group-hover:w-[32px] transition-all flex items-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                              stroke="white" className="w-5 h-5 mx-auto group-hover:opacity-100 opacity-0 cursor-pointer" onClick={() => openModal(p)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                          </div>
                         
                      </div>
                    </Fragment>
                ))}
            </main>
        </div>

        {isOpen && 
            <PlantDetailCollectionModal closeModal={closeModal} isOpen={isOpen} p={selectedPlant} />
        }
        
    </div>
  )
}

export default PlantCollectionsTab