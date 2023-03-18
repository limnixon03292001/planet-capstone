import { Dialog, Listbox, Transition } from '@headlessui/react';
import React, { useState, Fragment, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query';
import { getMarketplaceData, removeItemMp, updateItemMp } from '../api/userApi';
import Table from '../components/Table'
import { status } from '../data';
import { closeModal, openModal } from '../utils/reusableFunctions';

let r;
const AdminMarketplace = () => {

  const [mpData, setMpData] = useState([]);

   //setting refetch function to r var so that it can access by other components easily!
  useEffect(() => {
    r = refetch;
  }, []);


  //get our data
  const { isLoading, refetch } = useQuery(['marketplace-data'], getMarketplaceData,
  {
      onSuccess: ({ data }) => {
        setMpData(data?.data);
        console.log("mp", data?.data)
      },
      onError: (err) => {
          const errObject = err.response.data.error;
          console.log(errObject);
      }
  });

  //Columns of the table
  const columns = React.useMemo(() => [
      {
          Header: "Img",
          accessor: 'plant_img',
          imgAccessor: 'plant_img',
          Cell: ImageCell,
      },
      {
        Header: "Plant name",
        accessor: 'plant_name'
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Seller",
        accessor: ('firstname' || 'lastname'),
        firstnameAccessor: 'firstname',
        lastnameAccessor: 'lastname',
        Cell: AvatarCell,
      },
      {
          Header: "Type",
          accessor: 'category',
      },
      {
          Header: "Price",
          accessor: 'price',
      },
      {
          Header: "Actions",
          accessor: 'acc_id',
          Cell: Actions,
      },
  ], []);

  return (
    <div className='w-full max-w-[1352px] mx-auto flex items-center px-4 mb-4'>
        <Table columns={columns} data={mpData} titleTable='Marketplace'/>
    </div>
  )
}

export function Actions( value ) {
  let [isOpenView, setIsOpenView] = useState(false);
  let [isOpenEdit, setIsOpenEdit] = useState(false);
  let [isOpenBlock, setIsOpenBlock] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const setModal = (openModal, data, setter) => {
      openModal(setter);
      setSelectedData(data);
  }

  return (
      <div className='flex items-center justify-start gap-x-3 text-sm'>
          <button onClick={() => setModal(openModal, value?.row?.original, setIsOpenView)} className='bg-green-200 text-green-800 p-2 px-3 rounded-lg focus:ring-2 ring-green-400'>
              <span>View</span>
          </button>

          <button onClick={() => setModal(openModal, value?.row?.original, setIsOpenEdit)} className='bg-blue-200 text-blue-800 p-2 px-3 rounded-lg focus:ring-2 ring-blue-400'>
              <span>Edit</span>
          </button>

          <button onClick={() => setModal(openModal, value?.row?.original, setIsOpenBlock)} className='bg-red-200 text-red-800 p-2 px-3 rounded-lg focus:ring-2 ring-red-400'>
              <span>
                  Delete
              </span>
          </button>

          {isOpenView && <ViewModal closeModal={() => closeModal(setIsOpenView)} isOpen={isOpenView} data={selectedData}/>}
          {isOpenEdit && <EditModal closeModal={() => closeModal(setIsOpenEdit)} isOpen={isOpenEdit} data={selectedData}/> }
          {isOpenBlock && <DeleteModal closeModal={() => closeModal(setIsOpenBlock)} isOpen={isOpenBlock} data={selectedData}/>}
      
      </div>
  );
};

export function ImageCell({ value, column, row }) {
 
  return (
      <div className="w-max h-max">
         <img className="rounded-full w-12 h-12 object-cover" src={row.original[column.imgAccessor]}/>
      </div>
  )
}

export function AvatarCell({ value, column, row }) {
  return (
      <div className="flex items-center">
          <div className="text-sm">{row.original[column.firstnameAccessor]} {row.original[column.lastnameAccessor]}</div>
      </div>
  )
}

const ViewModal = ({ isOpen, closeModal, data }) => {

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
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl 
                  text-left align-middle shadow-xl transition-all h-full max-h-[558px] overflow-y-auto bg-white">
                  <div className='h-full w-full xbg1 pb-3'>
                      <img src={data?.plant_img ?? logo } className={`${data?.plant_img ? 'object-cover' : 'object-contain'} border-gray-200 border-b h-44 rounded-lg object-center w-full block`}/>
                      
                      <div className='px-4 mt-2'>
                          <h3 className='text-xl font-medium'>{data?.plant_name}</h3>
                          <p className={`${data?.status === `Available` ? `text-green-600` : `text-red-600` }`}>{data?.status}</p>
                          <h3 className='text-xl font-medium'>{data?.price}</h3>
                          <p className='text-blue-400 text-sm my-2'>Seller:</p>
                          <div className='flex'>
                            <img src={data?.profile} className="h-8 w-8 rounded-full object-cover"/>
                            <div className='ml-2 text-xs text-gray-600'>
                              <p className='font-medium'>{data?.firstname} {data?.lastname}</p>
                              <p>{data?.email}</p>
                            </div>
                          </div>
                      </div>

                      <div>
                        <div className='border-b  border-200 py-4 px-3'>
                          <h1 className='font-semibold text-lg text-emerald-400'>Growing Preference</h1>
                        </div>
                        <div className='mt-4 space-y-3 text-sm px-3'>
                          <p className='font-semibold'>Sun Preference: <span className='font-normal'>{data?.sun_pref}</span></p>
                          <p className='font-semibold'>Soil Preference: <span className='font-normal'>{data?.soil_pref}</span></p>
                          <p className='font-semibold'>Interior Light: <span className='font-normal'>{data?.inter_light}</span></p>
                          <p className='font-semibold'>Water Requirement: <span className='font-normal'>{data?.water_req}</span></p>
                          <p className='font-semibold'>Native Habitat: <span className='font-normal'>{data?.native_habitat}</span></p>
                        </div>
                      </div>
                      <div className='mt-5 md:mt-4 '>
                        <div className=' border-b  border-200 py-4 px-3'>
                          <h1 className='font-semibold text-lg text-emerald-400'>Growing Information</h1>
                        </div>
                        <div className='mt-4 space-y-3 text-sm px-3'>
                          <p className='font-semibold'>Date Planted: <span className='font-normal'>{data?.date_planted}</span></p>
                          <p className='font-semibold'>Average Height: <span className='font-normal'>{data?.avg_h}</span></p>
                          <p className='font-semibold'>Average Width: <span className='font-normal'>{data?.avg_w}</span></p>
                          <p className='font-semibold'>Foliage Color: <span className='font-normal'>{data?.foliage_color}</span></p>
                          <p className='font-semibold'>Foliage Type: <span className='font-normal'>{data?.foliage_type}</span></p>
                          <p className='font-semibold'>Foliage Scent: <span className='font-normal'>{data?.foliage_scent}</span></p>
                          <p className='font-semibold'>Flower Color: <span className='font-normal'>{data?.flower_color}</span></p>
                          <p className='font-semibold'>Fragrant: <span className='font-normal'>{data?.fragrant}</span></p>
                          <p className='font-semibold'>Nocturnal Flowering: <span className='font-normal'>{data?.nocturnal_flowering}</span></p>
                          <p className='font-semibold'>Repeat Blooming: <span className='font-normal'>{data?.repeat_blooming}</span></p>
                          <p className='font-semibold'>Flowering Period: <span className='font-normal'>{data?.flowering_period}</span></p>
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

const DeleteModal = ({ isOpen, closeModal, data }) => {

  const { mutate: mutateDelete, isLoading: blockLoading } = useMutation(removeItemMp, 
  {
      onSuccess: ({ data }) => {
          console.log("delete successfully!", data);
          r();
          closeModal();
      },
      onError: (err) => {
          const errObject = err.response.data.error;
          console.log(errObject);
      }
  });
  
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl 
                  text-left align-middle shadow-xl transition-all h-full max-h-[558px] overflow-y-auto bg-white">
                          <div className='h-full w-full xbg1 pt-3 text-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} 
                              stroke="red" className="w-12 h-12 mx-auto">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                              </svg>

                              <div className='px-3'>
                                  <p className='font-bold text-xl'>Delete Item</p>
                                  <p className='text-gray-800 mt-2'>Are you sure you want delete this item?</p>
                              </div>

                              <div className='flex items-center font-medium justify-center mt-4'>
                                  <button onClick={closeModal} className='text-white bg-red-500 w-full block py-2'>Cancel.</button>
                                  <button onClick={() => mutateDelete({ plant_detail_id: data?.plant_detail_id })} 
                                  className='text-white bg-green-500 w-full block py-2'>Delete.</button>
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

const EditModal = ({ isOpen, closeModal, data }) => {

  console.log("data", data);
  const [statusData, setStatusData] = useState(null);
    console.log("statusData", statusData)

  const { mutate: mutateUpdate, isLoading } = useMutation(updateItemMp, 
  {
      onSuccess: ({ data }) => {
          console.log("blocked successfully!", data);
          r();
          closeModal();
      },
      onError: (err) => {
          const errObject = err.response.data.error;
          console.log(errObject);
      }
  });

  const handleUpdate = (id) => {
      mutateUpdate({ status: statusData, plantId: id});
  };

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
                  <Dialog.Panel className="w-full max-w-xl transform rounded-2xl 
                  text-left align-middle shadow-xl transition-all h-full max-h-[558px] bg-white">
                  <div className='h-full w-full xbg1 pb-3'>
                    <img src={data?.plant_img} className="object-cover rounded-full w-20 h-20 -mt-8 block mx-auto border-4 border-white"/>
                    <p className='font-medium text-lg text-center'>{data?.plant_name}</p>
                      <div className='px-4 mt-2 flex gap-x-2'>
                        <div className='mx-auto text-center'>
                            <p className='text-gray-500 mb-2 text-sm'>Edit item availability</p>
                            <Dropdown list={status} currentData={data?.status} setData={setStatusData} data={statusData} target='status'/>
                        </div>
                      </div>
                      <button className='bg-green-400 p-2 px-3 mx-auto block mt-3 -mb-7 
                      border-[4px] border-white text-white rounded-full' onClick={() => handleUpdate(data?.plant_detail_id)}>Update</button>
                  </div>
                  </Dialog.Panel>
              </Transition.Child>
              </div>
          </div>
          </Dialog>
      </Transition>
  )
}

export default AdminMarketplace


const Dropdown = ({ list, currentData, setData, data, target }) => {
    const [selected, setSelected] = useState({name: currentData});
    
    useEffect(() => {
        setData({...data, [target]: selected?.name});
    },[selected])

    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative  w-[150px]">
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
                {list.map((d, dataIdx) => (
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
    )
}
