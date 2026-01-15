import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useMutation } from 'react-query';
import { approveTrade, rejectTrade } from '../api/userApi';

const AcceptRejectModal = ({ isOpen, closeModal, setIsOpen, typeId, refetch }) => {
    const [data, setData] = useState({});

    const { mutate: mutateApprove, isLoading: isLoadingApprove } = useMutation(approveTrade,
    {
        onSuccess: ({ data }) => {
            console.log("approved successfully");
            refetch();
            closeModal(setIsOpen);
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
                refetch();
                closeModal(setIsOpen)
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

export default AcceptRejectModal