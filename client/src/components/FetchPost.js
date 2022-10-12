import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import { MyContext } from '../context/ContextProvider';
import { request } from '../utils/axios-utils';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation,  } from 'react-router-dom';
import ScrollTop from './ScrollTop';

const FetchPost = () => {
  const location = useLocation();
  const { posts, setPosts,x , setX, pageNumber, setPageNumber } = MyContext();
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  useEffect(() => {
    return () => {
      setPageNumber(1);
      setPosts([])
    }
  },[]);
  
  useEffect(() => {
      request({url: `/api/users/post?page=${pageNumber}`, method: 'GET'}).then(({data}) => {
        setHasMore(data.posts.length > 0);
        setPosts(posts => [...posts, ...data?.posts]);
        setIsLoadingPost(false);
      }).catch((err) => {
        console.log(err?.message);
      });
  },[pageNumber, location, x]);

  const fetchMoreData = () => {
      setPageNumber(pageNumber+1);
  }

  const refresh = () =>{
    console.log("pulled")
    setPosts([]);
    setPageNumber(1);
    setX(x + 1);

    // request({url: `/api/users/post?page=${1}`, method: 'GET'}).then(({data}) => {
    //   setHasMore(data.posts.length > 0);
    //   setPosts([...data?.posts, ...posts]);
    //   console.log(data?.posts)
    //   setIsLoadingPost(false);
    // }).catch((err) => {
    //   console.log(err?.message);
    // });
  }

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
        refreshFunction={refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {posts?.map((post, id) => (
          <Post postData={post} key={id} index={id}/>
        ))}
      </InfiniteScroll>
    :
        <p className='text-3xl'>LOADING POST</p>
    }
      
    </div>
  )
}

export default FetchPost