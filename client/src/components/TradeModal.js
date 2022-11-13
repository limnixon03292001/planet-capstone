import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';
import PlantDetailCollectionModal from './PlantDetailCollectionModal';
import PickPlantModal from './PickPlantModal';

const TradeModal = ({ isOpen: open, closeModal, plant }) => {

    const [toTrade, setToTrade] = useState(null); //to trade plant state
    let [isOpen, setIsOpen] = useState(false);

    function closeModal1() {
        setIsOpen(false);
    }
    
      function openModal() {
          setIsOpen(true);
    }

  return (
    <div>
    <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-5 
                    text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 border-b border-gray-200 pb-3 mb-5"
                    >   
                        <p>Request trade</p>
                    </Dialog.Title>
                        <div className='sm:flex items-center justify-start'> 
                            <CardTradeItem p={plant}/>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#3DDAB4] my-5 mx-auto sm:mx-4 rotate-90 sm:rotate-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>
                            
                            {toTrade ? 
                                <CardTradeItem p={toTrade}/> 
                            :
                                <div onClick={openModal}
                                className='h-full w-full flex-1 flex flex-col items-center justify-center cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"
                                     className="w-10 h-10 text-emerald-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                    </svg>
                                    <p className='text-gray-500 text-sm'>Pick in my plant collection.</p>
                                </div>
                            }

                    
                        </div>

                        {toTrade && 
                          <button className='bg-green-200 text-green-800 rounded-lg focus:outline-none focus:ring-4 
                          focus:ring-green-300 flex items-center justify-center mt-4 px-3 py-2 ml-auto'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor"
                              className="w-6 h-6 mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                              </svg> 
                              <span>Send Request</span>
                          </button>
                        }
                      
                    </Dialog.Panel>
                </Transition.Child>
                </div>
               
            </div>
        </Dialog>
      
    </Transition>

        {isOpen && <PickPlantModal isOpen={isOpen} closeModal1={closeModal1} setToTrade={setToTrade}/>}

    </div>
  )
}

export default TradeModal


const CardTradeItem = ({ p }) => {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }
    
      function openModal() {
          setIsOpen(true);
    }

 return (
    <Fragment>
        <div className="relative flex flex-row group flex-1
        rounded-xl overflow-hidden w-full h-[160px] shadow-md self-start">
            <div className='w-full max-w-[120px] relative inset-0'>
                <img src={p?.plant_img} alt="plant_img" 
                className='w-full h-full object-cover object-center bg-emerald-300 text-white'/>
            </div>

            <div className='py-2 w-full bg-slate-emerald/40 text-white flex-1 flex bg-cover bg-right-bottom' 
            style={{backgroundImage: `url(${p?.plant_img})` }}/>
        
            <div className='absolute inset-0 w-full h-full flex '>
            <div className='w-full max-w-[100px] p-4 emptySpace'></div>
            <div className='flex-1 rounded-2xl h-full pl-4
            px-2 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/20 flex flex-col justify-evenly items-start'>
                <div>
                <h1 className='font-bold text-lg text-gray-100'>{p?.plant_name}</h1>
                <p className='text-gray-300 font-light text-[11px] mt-1'>
                    <EllipsisText text={p?.description ?? "No description"} length={60} />
                </p>

                {/* sun_pref */}
                    <div className='text-[9px] mt-4'>
                    {p?.sun_pref?.split(",").splice(0,4).map((sp, i) => (
                    <span key={i} className='bg-yellow-400/30 text-white mr-1 p-1 rounded-full'>{sp}</span>
                    ))}
                    </div>
                {/* sun_pref */}

                {/*soil_pref */}
                <div className='text-[9px] mt-4'>
                    {p?.soil_pref?.split(",")[0] !== '' &&
                    p?.soil_pref?.split(",").splice(0,4).map((sp, i) => (
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
        {isOpen && 
            <PlantDetailCollectionModal closeModal={closeModal} isOpen={isOpen} p={p} />
        }
    </Fragment>
 )
}