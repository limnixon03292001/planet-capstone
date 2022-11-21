import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQuery } from 'react-query';
import moment from 'moment';
import { approveTrade, getIncomingRequest, rejectTrade } from '../api/userApi';
import { Link } from 'react-router-dom';
import { openModal, closeModal, checkStatusPill } from '../utils/reusableFunctions';

const TradeTab = () => {

    let [isOpen, setIsOpen] = useState(false);  
    const [typeId, setTypeId] = useState({type: "", tradeId: null});

    const { data, isLoading } = useQuery('incoming-requests', getIncomingRequest,
    {
        onSuccess: ({ data }) => {
        console.log("incoming requests", data?.tradeRequests);
        },
        onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject);
        }
    });


  return (
    <div className='px-4 grid grid-cols-gridMarketPlace gap-3'>
        {data?.data?.tradeRequests.map((t, id) => (
            // This component below
            <Card t={t} key={id} openModal={openModal} isOpen={isOpen} setIsOpen={setIsOpen} typeId={typeId} setTypeId={setTypeId}/>
        ))}
        {/* This component below */}
        
    </div>
  )
}
export default TradeTab;

const Card = ({ t, openModal ,setIsOpen, setTypeId, isOpen, typeId }) => {

    return (
        <div className='shadow-lg w-full  rounded-lg p-2'>
            <div className='flex items-center h-48 relative'>
                {/* status */}
                {checkStatusPill(t?.trade_status, ` text-[9px] py-[3px] px-[5px] rounded-full 
                absolute top-0 right-0`)}
                <div className='flex-1 self-start ml-3 mt-2 '>
                    <div className='relative w-max mx-auto'>
                        <img src={t?.s_plant_img} alt="plant_img"
                        className='w-24 h-24 rounded-full object-cover object-center block mx-auto'/>
                        <img src={t?.s_p} alt="plant_img"
                        className='w-9 h-9 rounded-full object-cover object-center block border-[3px] border-white absolute top-0 left-0'/>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="51" fill="none" viewBox="0 0 26 30"
                    className='ml-auto rotate-[190deg]'>
                        <g clipPath="url(#clip0_649_5)">
                        <path
                            stroke="#3DDAB4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M11.199 20.383L5 16.21m0 0l3.14-6.782M5 16.209s8.247-2.49 9.338-2.607c1.091-.118 2.472-.335 4.162.398 1.69.733 2.018 1.436 3 3 .982 1.564 1.487 5.54 1.5 7 .013 1.46.006 3.85-1.233 4.196h-3.685"
                        ></path>
                        </g>
                        <defs>
                        <clipPath id="clip0_649_5">
                            <path
                            fill="#fff"
                            d="M0 0H20.323V23.892H0z"
                            transform="rotate(-15.601 23.558 3.227)"
                            ></path>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className='flex-1 self-end mr-3 mb-2 0'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="51" fill="none" viewBox="0 0 26 30">
                        <g clipPath="url(#clip0_649_5)">
                        <path
                            stroke="#3DDAB4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M11.199 20.383L5 16.21m0 0l3.14-6.782M5 16.209s8.247-2.49 9.338-2.607c1.091-.118 2.472-.335 4.162.398 1.69.733 2.018 1.436 3 3 .982 1.564 1.487 5.54 1.5 7 .013 1.46.006 3.85-1.233 4.196h-3.685"
                        ></path>
                        </g>
                        <defs>
                        <clipPath id="clip0_649_5">
                            <path
                            fill="#fff"
                            d="M0 0H20.323V23.892H0z"
                            transform="rotate(-15.601 23.558 3.227)"
                            ></path>
                        </clipPath>
                        </defs>
                    </svg>
                    <div className='relative w-max mx-auto'>
                        <img src={t?.r_plant_img} alt="plant_img"
                        className='w-24 h-24 rounded-full object-cover object-center block mx-auto'/>
                        <img src={t?.r_p} alt="plant_img"
                        className='w-9 h-9 rounded-full object-cover object-center block border-[3px] border-white absolute bottom-0 right-0'/>
                    </div>
                </div>
            </div>

            <div className='mt-2'>
                <p className='text-gray-500 text-[10px]'>Sent to you {moment(t?.created_at).fromNow()}.</p>
                <p className='text-sm  text-gray-600 mt-2'> <span className='font-medium'>{t?.r_fn} {t?.r_ln}</span> sent you a trade request for your 
                <span> {t?.s_plant_name}</span>.</p>
            </div>

            <div className='mt-3 flex items-center gap-3 text-sm'>
                <Link to={`/trade/details/${t?.trade_id}`}>
                    <button className='w-max text-green-700 bg-green-500/30 py-1 px-2 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" 
                        className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </Link>
                <button onClick={() => {
                    setTypeId({type: "accept", tradeId: t?.trade_id});
                    openModal(setIsOpen);
                }}
                className='w-full text-green-700 bg-green-500/30 py-1 rounded-md '>
                    Accept
                </button>
                <button onClick={() => {
                    setTypeId({type: "reject", tradeId: t?.trade_id});
                    openModal(setIsOpen);
                }}
                className='w-full text-red-700 bg-red-500/30 py-1 rounded-md'>
                    Reject
                </button>
            </div>

            <AcceptRejectModal isOpen={isOpen} closeModal={closeModal} setIsOpen={setIsOpen} typeId={typeId} />
        </div>
    );
}

const AcceptRejectModal = ({ isOpen, closeModal, setIsOpen, typeId,}) => {

    const [data, setData] = useState({});

    const { mutate: mutateApprove, isLoading: isLoadingApprove } = useMutation(approveTrade,
    {
        onSuccess: ({ data }) => {
            console.log("approved successfully");
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });

    const { mutate: mutateReject, isLoading: isLoadingReject } = useMutation(rejectTrade,
        {
            onSuccess: ({ data }) => {
                console.log("rejected successfully");
            },
            onError: (err) => {
                const errObject = err.response.data.error;
                console.log(errObject);
            }
        });

    useEffect(() => {
        if(typeId?.type === "accept") {
            setData({
                header: "Accepting Request",
                description: "Are you sure you want to accept the trade request? You can direct message the requester for further discussion about the trade.",
                el:  <button type="button" onClick={() => mutateApprove({tradeId: typeId?.tradeId})}
                className='text-gray-100 bg-emerald-500 px-2 py-1 rounded-md mr-2'> Accept </button>,
            })
        } else {
            setData({
                header: "Rejecting Request",
                description: "Are you sure you want to reject the trade request?.",
                el:  <button type="button" onClick={() => {mutateReject({tradeId: typeId?.tradeId})}}
                className='text-gray-100 bg-emerald-500 px-2 py-1 rounded-md mr-2'>Reject</button>,
            })
        }
        return () => setData({});
    }, [typeId]);
    
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => closeModal(setIsOpen)}>
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
                    <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 
                    text-left align-middle shadow-xl transition-all">
                        {/* <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 border-b border-gray-200 pb-3 mb-5"
                        >
                        {comments.length > 1 ? <p>{comments.length} Comments</p> : <p>{comments.length} Comment</p> } 
                        </Dialog.Title>
                         */}
                        <div>
                            <h1 className='font-bold text-xl text-gray-800'>{data?.header}</h1>
                            <p className='text-gray-600 text-sm mt-2 text-left'>{data?.description}</p>
                            <div className='w-max ml-auto mt-4'>
                                {data?.el}
                                <button onClick={() => closeModal(setIsOpen)}
                                className='text-gray-100 bg-red-500 px-2 py-1 rounded-md'>
                                    Cancel
                                </button>
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