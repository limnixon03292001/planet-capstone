import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { followUser, getIsFollowingUser, unfollowUser } from '../api/userApi';
import { MyContext } from '../context/ContextProvider';

const ButtonFollow = ({ id, userFollowers , setUserFollowers}) => {
    const { socket, authUser } = MyContext();
    const [isFollowing, setIsFollowing] = useState(false);

    //checking if a user following a user
    const { isLoading } = useQuery(['check-isFollowing', id], getIsFollowingUser,
    {
        onSuccess: ({data}) => {
            setIsFollowing(data?.following);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    })

    //unfollow a user
    const { mutate: mutateUnfollow, isFollowing: isLoadingUnfollowing } = useMutation(unfollowUser, 
    {
        onSuccess: ({data}) => {
            console.log("unfollowed", data);
            setUserFollowers(userFollowers - 1);
            setIsFollowing(false);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    });

    //follow a user
    const { mutate: mutateFollow, isFollowing: isLoadingFollowing } = useMutation(followUser, 
    {
        onSuccess: ({data}) => {
            console.log("followed", data);
            setUserFollowers(userFollowers + 1);
            setIsFollowing(true);
            socket.emit("sendNotifUser", {userId: id, message: "Test user followed you", 
            user: authUser});
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    });

  return (
    <>
        {isFollowing ?
            <button onClick={() => mutateUnfollow(id)}  className='bg-green-200 text-green-900 py-2 px-4 rounded-full text-sm font-bold'>
                Following
            </button>
        : 
            <button onClick={() => mutateFollow(id)} className='bg-green-200 text-green-900 py-2 px-4 rounded-full text-sm font-bold'>
                Follow
            </button>
        }
    </>
  )
}

export default ButtonFollow