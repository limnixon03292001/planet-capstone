import React, { useEffect, useState } from 'react'
import { request } from '../utils/axios-utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useParams } from 'react-router-dom';
import ScrollTop from './ScrollTop';
import PostUser from './PostUser';

const FetchUserPost = () => {

  const location = useLocation();
  const [ posts, setPosts ] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  const { id } = useParams(); //get the id from link

  useEffect(() => {
    setPageNumber(1);
    setPosts([])
    return(() =>{
        setPosts([])
        console.log("fetch user post umounts")
    })
  },[location]);

  useEffect(() => {
    request({url: `/api/users/post-user?page=${pageNumber}&user_id=${id}`, method: 'GET'}).then(({data}) => {
      setHasMore(data.posts.length > 0);
      setIsLoadingPost(false)
      setPosts([...posts, ...data?.posts]);
    }).catch((err) => {
      console.log(err?.message);
    });
  },[pageNumber]);

  // useEffect(() => {
  //   setPosts([])
  // },[])

  const fetchMoreData = () => {
    setPageNumber(pageNumber+1);
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
          initialScrollY={5000}
          endMessage={
            <p className='text-center mt-4 cursor-pointer'>
             🤪 No more posts to show...
            </p>
          }
        >
          {posts?.map((post, id) => (
            <PostUser postData={post} like={Number(post?.likecount)} setPosts={setPosts} posts={posts} key={id}/>
          ))}
        </InfiniteScroll>
        : 
        <p className='text-3xl'>LOADING POST</p>
          }
    </div>
  )
}

export default FetchUserPost