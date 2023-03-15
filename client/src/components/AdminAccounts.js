import React, {useState, Fragment, useEffect} from 'react'
import { useMutation, useQuery } from 'react-query';
import { blockAccount, getAdminAccountList, unblockAccount, updateAccount } from '../api/userApi';
import { MyContext } from '../context/ContextProvider';
import Table from './Table';
import { Listbox, Transition, Dialog } from '@headlessui/react'
import { classNames, openModal, closeModal } from '../utils/reusableFunctions';
import { Link } from 'react-router-dom';


let r;
const AdminAccounts = () => {

    const { adminAccounts, setAdminAccounts } = MyContext();

    const columns = React.useMemo(() => [
        {
            Header: "Name",
            accessor: ('firstname' || 'lastname'),
            firstnameAccessor: 'firstname',
            lastnameAccessor: 'lastname',
            Cell: AvatarCell,
            imgAccessor: "profile",
            emailAccessor: "email",
        },
        // {
        //     Header: "Position",
        //     accessor: 'position',
        //     Filter: SelectColumnFilter,  // new
        // },
        {
            Header: 'Verified',
            accessor: 'verified',
            Cell: VerifiedStatus,
        },
        {
            Header: "Status",
            accessor: 'user_id', 
            Cell: StatusPill,
        },
        {
            Header: "Actions",
            accessor: 'acc_id',
            Cell: Actions,
        },
    ], []);

    const { isLoading, refetch } = useQuery(['admin-accounts'], getAdminAccountList,
    {
        onSuccess: ({ data }) => {
            setAdminAccounts(data.data);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });
  
    //setting refetch function to r var so that it can access by other components easily!
    useEffect(() => {
        r = refetch;
    }, []);

  return (
    <div>
        <div className='w-full max-w-[1352px] mx-auto flex items-center px-4 mb-4'>
          <FilterLinks/>
          <Link to='/admin/add-admin' className='bg-emerald-400 p-2 rounded-lg ml-2 text-white focus:ring-2 focus:ring-green-500'>  Add admin</Link>
        </div>
        <Table columns={columns} data={adminAccounts}  titleTable='Admin Accounts'/>
    </div>
  )
}

export default AdminAccounts

export function Actions( data  ) {
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
          <button onClick={() => setModal(openModal, data?.cell?.row?.original , setIsOpenView)} className='bg-green-200 text-green-800 p-2 px-3 rounded-lg focus:ring-2 ring-green-400'>
              <span>View</span>
          </button>

          <button onClick={() => setModal(openModal, data?.cell?.row?.original, setIsOpenEdit)} className='bg-blue-200 text-blue-800 p-2 px-3 rounded-lg focus:ring-2 ring-blue-400'>
              <span>Edit</span>
          </button>

          <button onClick={() => setModal(openModal, data?.cell?.row?.original, setIsOpenBlock)} className='bg-red-200 text-red-800 p-2 px-3 rounded-lg focus:ring-2 ring-red-400'>
                <span>
                    {data?.cell?.row?.original?.block != false ? 'Unblock' : 'Block'}
                </span>
            </button>

          {isOpenView && <ViewModal closeModal={() => closeModal(setIsOpenView)} isOpen={isOpenView} data={selectedData}/>}
          {isOpenEdit && <EditModal closeModal={() => closeModal(setIsOpenEdit)} isOpen={isOpenEdit} data={selectedData}/> }
          {isOpenBlock && <BlockModal closeModal={() => closeModal(setIsOpenBlock)} isOpen={isOpenBlock} data={selectedData}/>}
      </div>
  );
};

export function VerifiedStatus({ value } ) {
 
      return (
          <>
          {value ? 
              <div className='flex items-center justify-start text-gray-500 text-sm'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#16A34A" viewBox="0 0 24 24" strokeWidth={2}  
                  className="w-8 h-8" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  <span className='ml-1'>Verified</span>
              </div>
          :
              <div className='flex items-center justify-start text-gray-500 text-sm'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#EAB308" viewBox="0 0 24 24" strokeWidth={2} stroke="white" 
                  className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>

                  <span className='ml-1'>Not Verified</span>
              </div>
          }
          </>
  );
};

export function StatusPill({ value } ) {

  const { onlineUsers } = MyContext();
  const status = onlineUsers.some(({userId}) => userId === value);
 
      return (
          <span
          className={
              classNames(
              "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
              status === true ? "bg-green-100 text-green-800" : null,
              // status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
              status === false ? "bg-red-100 text-red-800" : null
              )
          }
          >
            {status ? 'Online' : 'Offline'}
          </span>
  );
};

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id, render },}) {
// Calculate the options for filtering
// using the preFilteredRows
const options = React.useMemo(() => {
  const options = new Set()
  preFilteredRows.forEach(row => {
  options.add(row.values[id])
})
return [...options.values()]
}, [id, preFilteredRows])

// Render a multi-select box
return (
<label className="flex gap-x-2 items-baseline">
<span className="text-gray-700">{render("Header")}: </span>
<select
  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  name={id}
  id={id}
  value={filterValue}
  onChange={e => {
  setFilter(e.target.value || undefined)
  }}
>
  <option value="">All</option>
  {options.map((option, i) => (
  <option key={i} value={option}>
      {option}
  </option>
  ))}
</select>
</label>
)
}

export function AvatarCell({ value, column, row }) {
  return (
      <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
          <img className="h-10 w-10 rounded-full object-cover object-center" src={row.original[column.imgAccessor]} alt="" />
      </div>
      <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{row.original[column.firstnameAccessor]} {row.original[column.lastnameAccessor]}</div>
          <div className="text-sm text-gray-500">{row.original[column.emailAccessor]}</div>
      </div>
      </div>
  )
}

const people = [
  { id: 1, name: 'Users' },
  { id: 2, name: 'Admin' }
];

const FilterLinks = () => {
  const [selected, setSelected] = useState(people[0])

  return (
      <div className="ml-auto w-40 h-full">
          <Listbox value={selected} onChange={setSelected}>
              <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-200
               bg-white py-3 pl-3 pr-10 text-left focus:outline-none
                focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="w-6 h-6" aria-hidden={true}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                  </svg>

                  </span>
              </Listbox.Button>
              <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
              >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person, personIdx) => (
                      <Link to={`${person?.name === 'Users' ? '/admin/' : '/admin/admin-accounts'}`} key={personIdx}>
                          <Listbox.Option
 
                          className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                              }`
                          }
                          value={person}
                          >
                          {({ selected }) => (
                              <>
                              <span
                                  className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                  }`}
                              >
                                  {person.name}
                              </span>
                              {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                                  stroke="currentColor" className="w-5 h-5" aria-hidden={true}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>

                                  </span>
                              ) : null}
                              </>
                          )}
                          </Listbox.Option>
                      </Link>
                  ))}
                  </Listbox.Options>
              </Transition>
              </div>
          </Listbox>
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
                    <Dialog.Panel className="w-full max-w-xl transform rounded-2xl 
                    text-left align-middle shadow-xl transition-all h-full max-h-[558px] bg-white">
                    <div className='h-full w-full xbg1 pb-3 '>
                        
                        <img src={data?.profile} className='h-20 w-20 rounded-full -mt-10 ml-4 object-cover object-center
                         inline-block border-[5px] border-white'/>
                        <div className='px-4 mt-2'>
                            <h3 className='text-xl font-medium'>{data?.firstname} {data?.lastname}</h3>
                            <p className='text-gray-700'>{data?.email}</p>
                        </div>

                        <div className='px-4 mt-2 grid grid-cols-2 gap-x-3 gap-y-3'>
                            <div className='p-2 inline-block rounded-lg uppercase text-md border-gray-200 border'>
                                <h1 className='font-medium'>Birthday</h1>
                                <p>{data?.birthday}</p>
                            </div>
                            <div className='p-2 inline-block rounded-lg uppercase text-md border-gray-200 border'>
                                <h1 className='font-medium'>Phone number</h1>
                                <p>{data?.phonenumber}</p>
                            </div>
                            <div className='p-2 inline-block rounded-lg uppercase text-md border-gray-200 border'>
                                <h1 className='font-medium'>Baranggay</h1>
                                <p>{data?.baranggay}</p>
                            </div>
                            <div className='p-2 inline-block rounded-lg uppercase text-md border-gray-200 border'>
                                <h1 className='font-medium'>City</h1>
                                <p>{data?.city}</p>
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

const BlockModal = ({ isOpen, closeModal, data }) => {

    const { mutate: mutateBlock, isLoading: blockLoading } = useMutation(blockAccount, 
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

    const { mutate: mutateUnblock, isLoading: unblockLoading } = useMutation(unblockAccount, 
        {
            onSuccess: ({ data }) => {
                console.log("unblocked successfully!", data);
                r();
                closeModal();
            },
            onError: (err) => {
                const errObject = err.response.data.error;
                console.log(errObject);
            }
        });
    
        console.log(data);
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
                        {!data?.block ? 
                            <div className='h-full w-full xbg1 pt-3 text-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} 
                                stroke="red" className="w-12 h-12 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>

                                <div className='px-3'>
                                    <p className='font-bold text-xl'>Block Account!</p>
                                    <p className='text-gray-800 mt-2'>Once you block {data?.firstname} {data?.lastname}, He/She will no longer be able to access or log in his/her
                                    account.</p>
                                </div>

                                <div className='flex items-center font-medium justify-center mt-4'>
                                    <button onClick={closeModal} className='text-white bg-red-500 w-full block py-2'>Cancel.</button>
                                    <button onClick={() => mutateBlock({ userId: data?.user_id})} className='text-white bg-green-500 w-full block py-2'>Block account.</button>
                                </div>
                            </div>
                        :
                            <div className='h-full w-full xbg1 pt-3 text-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} 
                                stroke="currentColor" className="w-12 h-12 mx-auto text-yellow-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                                <div className='px-3'>
                                    <p className='font-bold text-xl'>Unblock Account!</p>
                                    <p className='text-gray-800 mt-2'>Once you unblock {data?.firstname} {data?.lastname}, He/She will be able to access or log in his/her
                                    account.</p>
                                </div>
                                <div className='flex items-center font-medium justify-center mt-4'>
                                    <button onClick={closeModal} className='text-white bg-red-500 w-full block py-2'>Cancel.</button>
                                    <button onClick={() => mutateUnblock({userId: data?.user_id})} className='text-white bg-green-500 w-full block py-2'>Unblock account.</button>
                                </div>
                            </div>
                        }
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    )
}

const EditModal = ({ isOpen, closeModal, data }) => {

    const [updateData, setUpdateData] = useState({
        userId: data?.user_id,
        firstname: data?.firstname,
        lastname: data?.lastname,
        birthday: data?.birthday,
        phonenumber: data?.phonenumber,
        baranggay: data?.baranggay,
        city: data?.city,
    });

    const { mutate: mutateUpdate, isLoading } = useMutation(updateAccount, 
    {
        onSuccess: ({ data }) => {
            r();
            closeModal();
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });

    const changeData = (e) => {
        setUpdateData({...updateData, [e.target.name]: e.target.value});
        console.log(updateData)
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
                        <img src={data?.profile} className='h-20 w-20 rounded-full -mt-10 
                        ml-4 object-cover object-center inline-block border-[5px] border-white'/>
                        <div className='px-4 mt-3 flex gap-x-2'>
                            <input type="text" onChange={(e) => changeData(e)} placeholder="Firstname" id="firstname" name="firstname"
                            value={updateData?.firstname}
                            className="rounded-md border border-[#536471] w-full py-1"/>
                            <input type="text" onChange={(e) => changeData(e)} placeholder="Lastname" id="lastname" name="lastname"
                            value={updateData?.lastname}
                            className="rounded-md border border-[#536471] w-full py-1"/>
                        </div>

                        <div className='px-4 mt-2 grid grid-cols-2 gap-x-3 gap-y-3'>
                            <div className='p-2 inline-block rounded-lg uppercase text-md border-gray-200 border'>
                                <h1 className='font-medium'>Birthday</h1>
                                <input type="text" onChange={(e) => changeData(e)} placeholder="Birthday" id="birthday" name="birthday"
                                value={updateData?.birthday}
                                className="rounded-md border border-[#536471] w-full py-1"/>
                            </div>
                            <div className='p-2 inline-block rounded-lg uppercase text-md border-gray-200 border'>
                                <h1 className='font-medium'>Phone number</h1>
                                <input type="text" onChange={(e) => changeData(e)} placeholder="Phone Number" id="phonenumber" name="phonenumber"
                                value={updateData?.phonenumber}
                                className="rounded-md border border-[#536471] w-full py-1"/>
                            </div>
                            <div className='p-2 inline-block rounded-lg uppercase text-md border-gray-200 border'>
                                <h1 className='font-medium'>Baranggay</h1>
                                <input type="text" onChange={(e) => changeData(e)} placeholder="Baranggay" id="baranggay" name="baranggay"
                                value={updateData?.baranggay}
                                className="rounded-md border border-[#536471] w-full py-1"/>
                            </div>
                            <div className='p-2 inline-block rounded-lg uppercase text-md border-gray-200 border'>
                                <h1 className='font-medium'>City</h1>
                                <input type="text" onChange={(e) => changeData(e)} placeholder="City" id="city" name="city"
                                value={updateData?.city}
                                className="rounded-md border border-[#536471] w-full py-1"/>
                            </div>
                        </div>
                        <div className='px-4 mt-2 w-full'>
                            <button onClick={() => mutateUpdate({data: updateData})}
                            className='bg-emerald-400 text-white px-4 py-1 rounded-lg inline-block w-max ml-auto'>Update</button>
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


