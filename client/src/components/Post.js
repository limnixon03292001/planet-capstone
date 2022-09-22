import React, { Fragment, useState, useEffect } from 'react'
import { MyContext } from '../context/ContextProvider';
import { request } from '../utils/axios-utils';
import moment from 'moment';
import CommentButton from './CommentButton';
import decode from 'jwt-decode'
import PostSettings from './PostSettings';
import { Link } from 'react-router-dom';
import { checkOnline } from '../utils/checkOnline';

const Post = ({ postData, like}) => {
    // console.log("like", like)
    const { id } = decode(localStorage?.token);
    const authId = id;
    const { posts, setPosts, onlineUsers } = MyContext();
    const [liked, setLiked] = useState(false);
    // const [likeCount, setLikeCount] = useState(like);

    const fetchLiked = async () => {
        const { data } = await request({url:`/api/users/post-liked?post_id=${postData?.post_id}`, method: 'GET', });
        setLiked(data.liked);
    }

    useEffect(() => {
        fetchLiked();
    },[like])
    // console.log(postData)

    const likeAndDislikePost = async (id) => {
        if (liked) {
          if (like > 0) {
            await request({url:"/api/users/post-dislike", method: 'POST', data: {post_id: postData?.post_id} }).then(({data}) => {
                console.log("dislike succes", data);
                like--;
                setLiked(false);

                const newSet = posts.map((post) => {
                    return post.post_id == data.dislikePost.post_id ?
                    {...post, likecount: data.dislikePost.likecount === null ? 0 : data.dislikePost.likecount.toString()} : post
                 })
 
                 setPosts(newSet)
                
            }).catch((err) => {
                console.log("err disliking post", err);
            });
          }
        } else {
            await request({url:"/api/users/post-like", method: 'POST', data: { post_id: id } }).then(({data}) => {
                console.log("like success", data.likePost)
                like++;
                setLiked(true);

                const newSet = posts.map((post) => {
                   return post.post_id == data.likePost.post_id ?
                   {...post, likecount: data.likePost.likecount.toString()} : post
                })

                setPosts(newSet)

            }).catch((err) => {
                console.log("err liking post", err);
            });
        }
    };

  return (
    <div className='my-5 border-b border-gray-200'>
        <div className="flex justify-start items-center px-4">

            <div className='flex-shrink-0 w-[43px] h-[44px] relative mr-2'>
                <img src={postData?.profile} className="w-full h-full rounded-full object-cover object-center "/>
                {checkOnline(onlineUsers,postData?.user_id) ?
                    <div className='bg-green-500 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1 absolute -bottom-1 -right-1 border-[3px]
                    border-white'/>
                :
                    <div className='bg-gray-400 p-[5px] h-2 w-2 rounded-full z-10 inline-block mr-1 absolute -bottom-1 -right-1 border-[3px]
                    border-white'/>
                }
             </div>

            <div className="block">
                <Link to={`/profile/${postData?.user_id}`} className='font-extrabold block'>{postData?.firstname} {postData?.lastname}</Link>
                <p className='font-extralight text-xs break-words text-[#536471]'>{moment(postData.created_at).fromNow()}</p>
            </div>
            
            {
                authId === postData.user_id 
            &&
               <PostSettings 
                    posts={posts} 
                    setPosts={setPosts} 
                    postId={postData.post_id} 
                    currentPost={postData}
                />
            }
        
        </div>

        {/* description section */}
        <div className='px-4 mt-8 text-sm text-justify'>
            <p>{postData?.description}</p>
        </div>
        {/* description section */}

        {/* image section */}
        {postData?.picture &&
            <div className='mt-4'>
                <img src={postData?.picture} className="w-full h-[230px] md:h-[330px] lg:h-[420px] object-cover lg:object-cover object-center lg:mr-2"/>
            </div>
        }
        
        {/* image section */}

        {/* react and comment section */}
        <div className='mt-6 py-3 border-t border-gray-200'>
            <div className='flex justify-evenly items-center'>
                <button className='flex justify-center items-center' onClick={() => likeAndDislikePost(postData.post_id)}>
                    { liked ? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg> 
                    :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    }

                    <span className='text-sm'>{like ?? 0}</span>
                </button>
                 

                {/* comment button */}
                <CommentButton commentcount={Number(postData?.commentcount)} post_id={postData.post_id}/>
        
            </div>
        </div>
        {/* react and comment section */}

    </div>
  )
}

export default Post


      {/* <button className='flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                    <span className='text-sm'>1,209</span>
                </button> */}