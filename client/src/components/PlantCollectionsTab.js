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

            {   authUser?.user_id === Number(id) 
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
            <main className='mt-4 flex flex-wrap items-center justify-start gap-4'>
                {data?.data?.data.map((p, id) => (
                    <Fragment key={id}>
                        <div className="overflow-hidden rounded-md w-full mx-auto md:max-w-[220px] max-w-[230px] shadow-md self-start">
                            <img src={p?.plant_img} alt="plant_img" 
                            className='w-full h-[160px] object-cover object-center bg-emerald-300 text-white'/>
                            <div className='mt-2 px-3 h-[70px]'>
                                <h1 className='font-bold text-lg'>{p?.plant_name}</h1>
                                <p className='text-gray-500 font-light text-sm mt-1'>
                                    <EllipsisText text={p?.description} length={60} />
                                </p>
                            </div>
                            <button className='bg-[#3DDAB4] text-white w-full inline-block mt-3 py-1' onClick={() => openModal(p)}><span>Full Details</span></button>
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