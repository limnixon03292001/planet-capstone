import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { request } from '../utils/axios-utils'
import EditPostModal from '../components/EditPostModal'
import { deleteUserPost } from '../api/userApi'
import { useMutation } from 'react-query'

const PostSettings = ({ posts, setPosts, postId, currentPost }) => {

    const { mutate, isLoading: isLoadingDelete } = useMutation(deleteUserPost,{
        onSuccess: ({ data }) => {
          console.log("deleted post", data);

          const newFilteredPosts = posts.filter((post) => {
            return post.post_id !== postId
          }); 

          setPosts(newFilteredPosts);
          window.location.reload();

        }, 
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    });

    const handleDelete = () => {
      mutate({post_id: postId});
    }

    //function for deleting certain post
    // const handleDelete = async () => {
    //     request({url: `/api/users/post`, method: 'DELETE', data: {post_id: postId}}).then(({data}) => {
    //         console.log({data});

    //         const newFilteredPosts = posts.filter((post) => {
    //             return post.post_id !== postId
    //         }); 
    
    //         console.log(posts);
    //         setPosts(newFilteredPosts);

    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }

    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
      setIsOpen(true)
    };

    const closeModal = () => {
      setIsOpen(false)
    };


  return (
    <Popover className="relative inline-block ml-auto">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? '' : 'text-opacity-90'}
              group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#536471" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </Popover.Button>
          
          <Transition as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md 
            bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white py-2 px-1">
                <>
                  <button className="flex items-center mb-1 w-full hover:bg-gray-100 p-1 rounded-md" 
                  onClick={openModal} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                   <span>Edit</span>
                  </button>
                </>

              <div>
                  <Popover.Button
                    className="flex items-center w-full hover:bg-gray-100 p-1 rounded-md"
                    onClick={handleDelete}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                   <span>Delete</span> 
                  </Popover.Button>
              </div>
            </div>
          </Popover.Panel>



        </Transition>

        {/* modal of edit */}
        {isOpen &&
          <EditPostModal postId={postId} 
          posts={posts}
          setPosts={setPosts}
          picture={currentPost?.picture} 
          description={currentPost?.description}
          closeModal={closeModal}
          isOpen={isOpen}/>
        }
        </>
    )}
  </Popover>

    // <button className='block ml-auto' onClick={handleDelete}>
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#536471" className="w-7 h-7">
    //     <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //     </svg>
    // </button>
  )
}

export default PostSettings