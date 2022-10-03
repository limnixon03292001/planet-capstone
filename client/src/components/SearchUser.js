import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { useQuery } from 'react-query';
import { searchUser } from '../api/userApi';


const SearchUser = () => {

    // const ref = useRef();
    const [searchText, setSearchText] = useState('');

    const { data, isFetching } = useQuery(['search-user', searchText], searchUser,
    {
        enabled: Boolean(searchText),
        onSuccess: ({data}) => {
            console.log('search', data?.result);
        }
    });


  return (
    <div className='ml-auto relative '>
        <div className='relative'>
            {/* search icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6 text-gray-400 absolute inset-0 my-auto ml-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            {/* search icon */}

            <DebounceInput
                minLength={2}
                debounceTimeout={300}
                className= 'px-12 pr-7 py-3 rounded-full w-full h-full outline-none border border-none bg-[#eff3f4] focus:ring-2 focus:ring-green-200 focus:bg-white transition-all'
                placeholder='Search user'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />

            {/* close icon */}
            {Boolean(searchText) &&
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" 
            className="w-6 h-6 absolute right-0 top-0 bottom-0 my-auto mr-3 drop-shadow
            bg-green-500/20 text-gray-900 p-1 rounded-full cursor-pointer"
            onClick={() => setSearchText('')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>}
            {/* close icon */}
        </div>
        {Boolean(searchText) && 
        <div className='absolute max-h-[390px] overflow-y-auto 
        overflow-x-hidden w-full z-30 drop-shadow-md rounded-md mt-2 py-4 bg-white backdrop-blur'>
            {
                isFetching ? 
                    <p className='text-gray-500 px-4'>Searching {searchText}</p>
                :   
                
                //if the arrays length is 0, meaning the user doesn't exist in the database
                data?.data?.result?.length === 0 ? 
                    <p className='text-gray-500 px-4'>User {searchText} not found.</p>
                :
                    data?.data?.result.map((d, id,) => (
                        <Link to={`/profile/${d?.user_id}`} key={id}
                        className='px-4 flex items-center transition-all hover:bg-emerald-200/30 py-3'>
                            <img src={d?.profile} alt="profile"
                            className='flex-shrink-0 w-10 h-10 object-cover object-center rounded-full mr-3'/>
                            <div className='leading-tight'>
                                <h1 className='font-medium'>{d?.firstname} {d?.lastname}</h1>
                                <p className='text-gray-500 text-xs'>{d?.email}</p>
                            </div>
                        </Link>
                    ))
            }
        </div>
        }


  </div>
  )
}

export default SearchUser