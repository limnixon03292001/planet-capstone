import React, { Fragment, useState } from 'react'
import FilterButton from '../components/FilterButton'
import { Link } from 'react-router-dom'
import { MyContext } from '../context/ContextProvider'
import { useQuery } from 'react-query'
import { getPlantCollection } from '../api/userApi'
import EllipsisText from "react-ellipsis-text";
import { DebounceInput } from 'react-debounce-input'
import PlantDetailCollectionModal from '../components/PlantDetailCollectionModal'


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
  

const MyPlantCollections = () => {

    const { authUser } = MyContext();
    let [isOpen, setIsOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState({});
    const [lowHigh, setLowHigh] = useState('');
    const [plantCat, setPlantCat] = useState('');
    const [dateAdd, setDateAdd] = useState('');

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(p) {
        setIsOpen(true);
        setSelectedPlant(p);
    }
    
    const { data, isLoading } = useQuery(['plant-collections', authUser?.user_id], getPlantCollection,
    {
        onSuccess: ({ data }) => {
            console.log(data);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    })

  return (
    <div className='block border border-gray-200 w-full min-h-screen pt-6 overflow-hidden'>
        <div className='w-full flex items-center px-4'>
            <h1 className='font-extrabold text-lg mt-1'>My Plant Collections</h1>
            
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
        </div>

        {/* button start */}
        <div className='transition-all z-10 block sticky top-0 w-full h-max px-4 py-4 mt-4 border-y border-gray-200 shadow'>
        <div className='flex items-center'>

          <div className='mr-2'>
            <p className='text-gray-500 text-sm mb-2'>Sun Preferences</p>
            <FilterButton data={dateAdded} setData={setDateAdd}/>
          </div>

          <div className='mr-2'>
            <p className='text-gray-500 text-sm mb-2'>Water Requirement</p>
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
              placeholder='Search plant...'
              // onChange={e => setSearchData(e.target.value)} 
            />
          </div>
        </div>
        </div>
        {/* button end*/}



        <div className='h-full w-full'>
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
            <main className='px-4 mt-4 flex flex-wrap items-center justify-start'>
                {data?.data?.data.map((p, id) => (
                    <Fragment key={id}>
                        <div className="relative overflow-hidden rounded-md mx-3 my-4 w-full max-w-[250px] shadow-md self-start">
                            <img src={p?.plant_img} alt="plant_img" 
                            className='w-full h-[280px] object-cover object-center bg-emerald-300 text-white'/>

                            <div className='px-3 py-2 w-full h-[140px] bg-slate-800/40 
                            backdrop-blur-sm text-white absolute left-0 right-0 bottom-0 flex flex-col'>
                                <div className='flex-1'>
                                    <h1 className='font-bold text-lg'>{p?.plant_name}</h1>
                                    <p className='text-gray-300 font-light text-[13px] mt-1'>
                                        <EllipsisText text={p?.description} length={60} />
                                    </p>
                                </div>
                                <button className='rounded-md bg-emerald-500 text-white w-full inline-block mt-auto py-1 self-end' onClick={() => openModal(p)}><span>Full Details</span></button>
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

export default MyPlantCollections