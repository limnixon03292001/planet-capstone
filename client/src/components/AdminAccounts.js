import React, {useState, Fragment} from 'react'
import { useQuery } from 'react-query';
import { getAdminAccountList } from '../api/userApi';
import { MyContext } from '../context/ContextProvider';
import Table from './Table';
import { Listbox, Transition } from '@headlessui/react'
import { classNames } from '../utils/reusableFunctions';
import { Link } from 'react-router-dom';

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

  const { isLoading } = useQuery(['admin-accounts'], getAdminAccountList,
  {
      onSuccess: ({ data }) => {
          setAdminAccounts(data.data);
      },
      onError: (err) => {
          const errObject = err.response.data.error;
          console.log(errObject);
      }
  });

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

export function Actions({ value } ) {
  return (
      <div className='flex items-center justify-start gap-x-3 text-sm'>
          <button className='bg-green-200 text-green-800 p-2 px-3 rounded-lg focus:ring-2 ring-green-400'>
              <span>View</span>
          </button>

          <button className='bg-blue-200 text-blue-800 p-2 px-3 rounded-lg focus:ring-2 ring-blue-400'>
              <span>Edit</span>
          </button>

          <button className='bg-red-200 text-red-800 p-2 px-3 rounded-lg focus:ring-2 ring-red-400'>
              <span>Block</span>
          </button>
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