import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import { MyContext } from '../context/ContextProvider';
import { request } from '../utils/axios-utils';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation,  } from 'react-router-dom';
import ScrollTop from './ScrollTop';

const FetchPost = () => {
  const location = useLocation();
  const { posts, setPosts, socket } = MyContext();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  // useEffect(() => {
  //   setPosts([])
  //   setPageNumber(1);

  //   // return(() =>{
  //   //     setPosts([])
  //   //     console.log("allposts")
  //   // })
  // },[location])

  useEffect(() => {
    request({url: `/api/users/post?page=${pageNumber}`, method: 'GET'}).then(({data}) => {
      setHasMore(data.posts.length > 0);
      setPosts([...posts, ...data?.posts]);
      setIsLoadingPost(false);
    }).catch((err) => {
      console.log(err?.message);
    });
  },[pageNumber, location]);

  const fetchMoreData = () => {
      setPageNumber(pageNumber+1);
      // console.log("ha", pageNumber);
  }
  // console.log("out", posts);
  return (
    <div>
    <ScrollTop/>
      {!isLoadingPost ? 
        <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className='text-center mt-4'>
          🤪 No more posts to show..
          </p>
        }
      >
        {posts?.map((post, id) => (
          <Post postData={post} like={post?.likecount} key={id}/>
        ))}
      </InfiniteScroll>
    :
        <p className='text-3xl'>LOADING POST</p>
    }
      
    </div>
  )
}

export default FetchPost