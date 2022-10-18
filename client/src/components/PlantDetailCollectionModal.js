import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';

const PlantDetailCollectionModal = ({ isOpen, closeModal, p }) => {
    console.log("pla", p)
  return (
    <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-5 
                text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 border-b border-gray-200 pb-3 mb-5"
                >   
                    <p>{p?.plant_name}</p>
                </Dialog.Title>
                    <div> 
                        <div className='flex items-start justify-start'>
                            <img src={p?.plant_img} alt="plant_img"  
                            className='w-32 h-32 object-center object-cover rounded-full mb-3 text-white bg-emerald-300 mr-4 inline-block flex-shrink-0'/>
                            <div>
                                <div className='flex items-center'>
                                    <p className='text-lg font-bold inline-block'>{p?.plant_name}</p>
                                    <span className='text-emerald-500 font-medium text-xs ml-2'>({p?.category})
                                    </span>
                                </div>
                                <div className='overflow-auto h-28 mt-1'>
                                    <p className='text-gray-500 text-sm'>{p?.description}the world, its centre of diversity is in Tropical Asia. Ixora also grows commonly in subtropical climates in the United States, such as Florida where it is commonly known as West Indian jasmine.</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap items-start justify-start mt-4 text-left py-2 border-y border-gray-200'>   
                            <div className='flex-1 text-sm'>
                                <div className='px-4'>
                                    <p className='text-lg font-bold mb-2 text-center'>Growing Preference</p>
                                    <p className='text-gray-500 mb-1'>Sun Preference: <span className='text-gray-900'>{p?.sun_pref}</span> </p>
                                    <p className='text-gray-500 mb-1'>Soil Preference: <span className='text-gray-900'>{p?.soil_pref}</span> </p>
                                    <p className='text-gray-500 mb-1'>Interior Light: <span className='text-gray-900'>{p?.inter_light}</span> </p>
                                    <p className='text-gray-500 mb-1'>Water Requirement: <span className='text-gray-900'>{p?.water_req}</span> </p>
                                    <p className='text-gray-500 mb-1'>Native Habitat: <span className='text-gray-900'>{p?.native_habitat}</span> </p>
                                </div>
                            </div>
                            <div className='flex-1 text-sm border-l border-gray-200 '>
                                <p className='text-lg font-bold mb-2 text-center'>Growing Information</p>
                                <div className='px-4'>
                                    {/* <p className='text-gray-500 mb-1'>Category: <span className='text-gray-900'>{p?.category}</span> </p> */}
                                    <p className='text-gray-500 mb-1'>Average Height: <span className='text-gray-900'>{p?.avg_h}</span> </p>
                                    <p className='text-gray-500 mb-1'>Average Width: <span className='text-gray-900'>{p?.avg_w}</span> </p>
                                    <p className='text-gray-500 mb-1'>Foliage Color: <span className='text-gray-900'>{p?.foliage_color}</span></p>
                                    <p className='text-gray-500 mb-1'>Foliage Type: <span className='text-gray-900'>{p?.foliage_type}</span></p>
                                    <p className='text-gray-500 mb-1'>Foliage Scent: <span className='text-gray-900'>{p?.foliage_scent}</span></p>
                                    <p className='text-gray-500 mb-1'>Flower Color: <span className='text-gray-900'>{p?.flower_color}</span></p>
                                    <p className='text-gray-500 mb-1'>Fragrant: <span className='text-gray-900'>{p?.fragrant}</span></p>
                                    <p className='text-gray-500 mb-1'>Nocturnal Flowering: <span className='text-gray-900'>{p?.nocturnal_flowering}</span></p>
                                    <p className='text-gray-500 mb-1'>Repeat Blooming: <span className='text-gray-900'>{p?.repeat_blooming}</span></p>
                                    <p className='text-gray-500 mb-1'>Flowering Period: <span className='text-gray-900'>{p?.flowering_period}</span></p>
                                </div>
                            </div>
                        </div>

                        <p className='text-gray-500 text-xs font-light mb-2 mt-2'>Owner:</p>
                        <div className='flex items-center'>
                            <img src={p?.profile} alt="owner_img" className='h-10 w-10 object-cover object-center rounded-full'/>
                            <div className='ml-2'>
                                <p className='font-medium text-sm'>{p?.firstname} {p?.lastname}</p>
                                <p className='text-xs text-gray-500 '>{p?.email}</p>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Transition.Child>
            </div>
        </div>
        </Dialog>
    </Transition>
  )
}

export default PlantDetailCollectionModal