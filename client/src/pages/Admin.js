import React, { useEffect, useState, Fragment } from 'react'
import nixon from '../assets/nixon.jpg'
import { MyContext } from '../context/ContextProvider';
import io from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import AdminUserAccounts from './AdminUserAccounts';
import decode from 'jwt-decode'
import AdminAccounts from '../components/AdminAccounts';
import { Listbox, Transition } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import { getCounts } from '../api/userApi';
import AdminMarketplace from './AdminMarketplace';
import AddAdmin from './AddAdmin';

// https://planet-capstone.onrender.com/
// http://localhost:5000/
const ENDPOINT = "https://planet-capstone.onrender.com/";
var socket;

const Admin = () => {

  const { onlineUsers, setOnlineUsers , setSocket } = MyContext();
  const { id: authUserId } = decode(localStorage?.token);
  const [counts, setCounts] = useState({});
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  //for getting current online users
  useEffect(() =>{
    socket = io(ENDPOINT);

    socket.emit("addUser", authUserId, '0329');
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });

    setSocket(socket);
 
    // return () => {
    //   socket.disconnect();
    // }
  },[]);

  const { isLoading } = useQuery(['admin-counts-data'], getCounts, {
    onSuccess: ({ data }) => {
      setCounts(data);
    },
    onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject);
    }
  });

  const Logout = () => {
    localStorage.clear("token");
    socket.disconnect();
    navigate("/login",{replace: true});
}

  return (
    <div className='bg-gray-100/40 w-full overflow-x-hidden'>
      <nav className='flex items-center justify-between px-4 h-[80px] bg-gradient-to-b from-[#20BF55] to-[#01BAEF] text-white'>
        <span className='font-bold text-xl'>ADMIN</span>

        <div className='flex gap-x-3 items-center'>

          <Link to='/admin/'>Accounts</Link>
          <Link to='/admin/marketplace/'>Marketplace</Link>

          <div className='relative'>
            <img src={nixon} alt='admin_picture' onClick={() => setMenu(prev => !prev)}
            className='w-9 h-9 cursor-pointer rounded-full object-cover object-center' />

            {menu &&   
              <div className='absolute right-0 block py-2 h-max w-[140px] rounded-md shadow-md bg-white mt-2'>
                <button className='px-3 py-2 w-full text-gray-700 flex items-center justify-start
                hover:bg-gray-100 transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <span className='ml-1' onClick={Logout} >Logout</span>
                </button>
              </div> 
            }
          

          </div>
        </div>
      </nav>
    
    <div className='xbg'>
      <div className='w-full max-w-[1352px] mx-auto flex items-center mt-10 mb-6 px-4'>

            <div className='flex items-center w-max'>
            {onlineUsers?.filter(({userId}) => userId !== authUserId ).length === 0 ? <span className='inline-block bg-gray-400 w-6 h-6 rounded-full'/> : <span className='inline-block bg-green-400 w-6 h-6 rounded-full'/>}
            <p className='ml-2 font-bold text-gray-800 text-2xl'>{onlineUsers?.filter(({userId}) => userId !== authUserId ).length} Online users.</p>
            </div>

            
            <div className='flex gap-x-4 max-w-max w-max ml-auto'>
              <div className='shadow-md border-l-4 border-green-400 w-[170px] p-2 flex-shrink px-4 rounded'>
                  <p className='font-bold text-3xl'>{counts?.userCounts}</p>
                  <p className='font-bold'>User account</p>
              </div>

              <div className='shadow-md border-l-4 border-green-400 w-[200px] p-2 flex-shrink px-4 rounded'>
                  <p className='font-bold text-3xl'>{counts?.adminCounts}</p>
                  <p className='font-bold'>Admin account</p>
              </div>

              <div className='shadow-md border-l-4 border-green-400 w-[200px] p-2 flex-shrink px-4 rounded relative overflow-hidden'>
                  <p className='font-bold text-3xl'>{counts?.mpCounts}</p>
                  <p className='font-bold'>Marketplace</p>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} 
                  stroke="currentColor" className="w-20 h-20 absolute top-0 bottom-0 right-0 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                  </svg> */}

              </div>
            </div>

      </div>

      <Routes>
        <Route path="/" element={<AdminUserAccounts onlineUsers={onlineUsers} authUserId={authUserId}/>}/>
        <Route path="/admin-accounts" element={<AdminAccounts />}/>
        <Route path="/marketplace/" element={<AdminMarketplace/>}/>

        <Route path="/add-admin" element={<AddAdmin />}/>
      </Routes>
    </div>
 
    </div>
  )
}

export default Admin

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