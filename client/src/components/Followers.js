import moment from 'moment';
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import { getFollower } from '../api/userApi'

const Followers = () => {

    const { data , isLoading } = useQuery('user-followers', getFollower,
    {
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });


  return (
    <div>
        <h1 className='font-extrabold text-xl'>Your followers</h1>

        <div className='h-full max-h-[350px] overflow-auto'>
            {data?.data?.followers.length === 0 ? 
                <h1 className='text-gray-500 mt-5'>No followers found.</h1>
            :
                data?.data?.followers.map((f, id) => (
                    <Link to={`/profile/${f?.followers_user_id}`} key={id} className="relative mt-8 block">
                        <div className="flex justify-start items-center relative">
                            <img src={f?.profile} className="w-[40px] self-start flex-shrink-0 h-[42px] rounded-full object-cover object-center mr-2"/>
                            <div className='self-start'>
                                <h1 className='font-medium block text-md'>{f?.firstname} {f?.lastname}</h1>
                                <span className='text-[10px] text-gray-500 font-extralight block underline'>{f?.email}</span>
                                <span className='text-[10px] text-gray-500 font-extralight block'> 
                                    followed you {moment(f?.created_at).fromNow()}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))
            }
           
        </div>
        
    </div>
  )
}

export default Followers