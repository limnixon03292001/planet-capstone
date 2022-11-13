import React, { Fragment, useEffect, useState } from 'react'
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { filterPlantCollections } from '../api/userApi';
import FilterPlantCollection from '../components/FilterPlantCollection';
import PlantDetailCollectionModal from '../components/PlantDetailCollectionModal';
import { MyContext } from '../context/ContextProvider';
import { FilterPlantCategories } from './MyPlantCollections';

const growingPrefInitialState = {sunPref: [], interLight: [], soilPref: [], waterReq: [], nativeHab: []};
const PickPlant = () => {

    const navigate = useNavigate();
    const { authUser, setSelectedPlant: setSelectedPlantContext } = MyContext();
    let [isOpen, setIsOpen] = useState(false);
    const [plantColl, setPlantColl] = useState({});
    const [selectedPlant, setSelectedPlant] = useState({});
    const [gp, setGp] = useState(growingPrefInitialState);
    const [selectedCategory, setSelectedCategory] = useState('');

    const { isLoading: loadingFilter, refetch } = useQuery(['filteredPlant-collections', authUser?.user_id, gp, selectedCategory], filterPlantCollections,
    {
        onSuccess: ({ data }) => {
            console.log("pick", data)
            setPlantColl(data);
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


    // useEffect(() => {
    //  console.log("hey", selectedPlant);   
    // },[selectedPlant])

  return (
    <div className='block border-x border-gray-200 w-full max-w-[860px] min-h-screen pt-6 pb-5'>
        <div className='px-4'>
            <h1 className='font-extrabold text-xl mt-1 text-gray-700'>Pick your plant</h1>
            <p className='text-xs text-gray-500'>You can select a plant into your collections.</p>
        </div>
        <div className='transition-all z-10 block sticky top-0 w-full h-max px-4 py-4 mt-4 border-y border-gray-200 shadow'>
            <div className='flex items-center'>
                <h1 className='text-xl font-bold text-gray-700 mr-auto'>
                    <span className='text-gray-500 text-xs font-light block'>Total plants</span>
                    {plantColl?.total?.count} plants
                </h1>

                <FilterPlantCollection gp={gp} setGp={setGp} resetState={growingPrefInitialState} 
                handleChange={handleChange} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}
                />

                <FilterPlantCategories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}
                />
            </div>
        </div>

        <div className='h-full w-full'>
            <main className='px-4 mt-4 grid grid-cols-myGrid gap-5'>
                {plantColl?.data?.map((p, id) => (
                    <div key={id} className="relative">

                        <button onClick={() => {
                            setSelectedPlantContext(p);
                            navigate('/marketplace/selectedPlant-addMore');
                        }}
                        className="p-1 h-max w-max bg-emerald-400/90 text-white absolute -top-2 -left-2 border-[4px]
                        border-white rounded-full z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                        
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
                    </div>
                ))}
            </main>
        </div>

        {isOpen && 
            <PlantDetailCollectionModal closeModal={closeModal} isOpen={isOpen} p={selectedPlant} />
        }
     
    </div>
  )
}

export default PickPlant