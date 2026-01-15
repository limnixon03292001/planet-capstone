import React, { Fragment, useState, useEffect } from 'react'
import { MyContext } from '../context/ContextProvider';
import { request } from '../utils/axios-utils';
import moment from 'moment';
import CommentButton from './CommentButton';
import decode from 'jwt-decode'
import PostSettings from './PostSettings';
import { Link } from 'react-router-dom';

const PostUser = ({ postData, like ,setPosts, posts}) => {
    // console.log("like", like)
    const { id } = decode(localStorage?.token);
    const authId = id;
    const [liked, setLiked] = useState(false);
    // const [likeCount, setLikeCount] = useState(like);

    const fetchLiked = async () => {
        const { data } = await request({url:`/api/users/post-liked?post_id=${postData?.post_id}`, method: 'GET', });
        setLiked(data.liked);
    }

    useEffect(() => {
        // setLiked(false);
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
            <img src={postData?.profile} className="w-[43px] h-[44px] flex-shrink-0 rounded-full object-cover object-center mr-2"/>
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

export default PostUser
