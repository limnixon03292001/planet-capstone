import React, { Fragment, useEffect, useState } from 'react'
import { Transition, Listbox, } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { MyContext } from '../context/ContextProvider'
import { useQuery } from 'react-query'
import { filterPlantCollections, getPlantCollection } from '../api/userApi'
import EllipsisText from "react-ellipsis-text";
import { DebounceInput } from 'react-debounce-input'
import PlantDetailCollectionModal from '../components/PlantDetailCollectionModal'
import FilterPlantCollection from '../components/FilterPlantCollection'

export const plantsCategories = [
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

const growingPrefInitialState = {sunPref: [], interLight: [], soilPref: [], waterReq: [], nativeHab: []};
const MyPlantCollections = () => {

    const { authUser } = MyContext();
    const [plantColl, setPlantColl] = useState([]);
    let [isOpen, setIsOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState({});

    //growing preferences
    const [gp, setGp] = useState(growingPrefInitialState);
    const [selectedCategory, setSelectedCategory] = useState('');

    // const { data, isLoading } = useQuery(['plant-collections', authUser?.user_id], getPlantCollection,
    // {
    //     onSuccess: ({ data }) => {
    //         setPlantColl(data?.data);
    //         console.log(data?.data)
    //     },
    //     onError: (err) => {
    //         const errObject = err.response.data.error;
    //         console.log(errObject);
    //     }
    // });

    const { isLoading: loadingFilter, refetch } = useQuery(['filteredPlant-collections', authUser?.user_id, gp, selectedCategory], filterPlantCollections,
    {
        onSuccess: ({ data }) => {
            setPlantColl(data?.data);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });

    //dynamic function in handling checkbox changes
    const handleChange = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        const name = e.target.name;
        
        //checking if the checkbox is checked. If true then add the value to the respective object key
        if(isChecked === true){
            setGp({...gp, [e.target.name]: [e.target.value, ...gp?.[e.target.name]]});
        } else {
            //logic for removing value from a certain object key
            const g = gp?.[name].filter((x) => {
              return x !== value 
            });
            //set the return new array value
            setGp({...gp, [e.target.name]: g});
        }
       
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(p) {
        setIsOpen(true);
        setSelectedPlant(p);
    }

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

                <FilterPlantCollection gp={gp} setGp={setGp} resetState={growingPrefInitialState} 
                handleChange={handleChange} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}
                />

                <FilterPlantCategories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}
                />

                <div className='ml-auto '>
                    {/* <p className='text-gray-500 text-sm mb-2'>Search</p> */}
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
            <main className='px-4 mt-4 flex flex-wrap items-center justify-start'>
                {plantColl?.map((p, id) => (
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

const FilterPlantCategories = ({ setSelectedCategory, selectedCategory }) => {
    const [selected, setSelected] = useState( selectedCategory === '' && plantsCategories[0] );

    useEffect(() => {
        setSelectedCategory(selected?.name);
        
    }, [selected])

    return (
        <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-[180px]">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-left 
            border border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300
             focus-visible:ring-opacity-75 text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>

            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {plantsCategories.map((d, dataIdx) => (
                <Listbox.Option
                  key={dataIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                    }`
                  }
                  value={d}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {d.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    );
}