import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import { updateUserPost } from '../api/userApi';
import  { MyContext } from '../context/ContextProvider';

const EditPostModal = ({ postId, picture, description, closeModal, isOpen, posts, setPosts }) => {
    // const { posts, setPosts } = MyContext();
    const [ newDescription, setNewDescription ] = useState(description);
    const [pictureUrlx, setPictureUrlx] = useState(picture)
    
    const { mutate, isLoading: isLoadingUpdate } = useMutation(updateUserPost, {
        onSuccess: ({ data }) => {
            const newPosts = posts.map((post) => {
                // console.log(post?.post_id)
                return post.post_id === data?.updatedPost?.post_id ?
                 data?.updatedPost : post
            }); 
            setPosts(newPosts);
            closeModal();
          }, 
          onError: (err) => {
              const errObject = err.response.data.error;
              console.log(errObject)
          }
    })

    //function for updatiog certain post
    const handleUpdate = () => {
         mutate({post_id: postId, picture: pictureUrlx, description: newDescription});
       
    }

    //handling image onchange
    const handleChangeImage = useCallback((e) => {
        const file = e.target.files[0];
        transformImg(file);
    },[])
    
    //transforming the image file into base64 url 
    const transformImg = useCallback((file) => {
        const reader = new FileReader();

        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPictureUrlx(reader.result);
            };
        } else {
            setPictureUrlx('');
        }
    }, [pictureUrlx]);

    // useEffect(() => {
    //     return () => {
    //         closeModal();
    //     }
    // },[]);

  return (
    <div>
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 
                text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-medium leading-6 border-b border-gray-200 pb-3 mb-5">
                    Edit post
                </Dialog.Title>
                <div>
                    {/* description section */}
                    <textarea placeholder="Flex your plant" name="description"
                    onChange={(e) => setNewDescription(e.target.value)}
                    value={newDescription}
                    className='w-full border border-gray-200 focus:border-none focus:outline-none min-h-[120px] rounded-xl'/>
                    {/* description section */}

                     {/* picture section */}
                    <div>
                        {pictureUrlx && 
                        <div className='mt-2 relative w-full h-full'>
                            <button onClick={() => setPictureUrlx('')} className='p-1 bg-gray-800 bg-opacity-80 rounded-full absolute m-2 focus:outline-none focus:ring-2 focus:ring-gray-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img src={pictureUrlx} className="max-w-full m-auto h-full rounded-xl object-cover object-center"/>
                        </div>}

                        <label className='inline-block mt-4 cursor-pointer' htmlFor='editpicture'>
                            <input hidden accept="image/png, image/jpg, image/jpeg" type="file" name="picture" id="editpicture" onChange={handleChangeImage} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#3DDAB4" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </label>
                    </div>
                     {/* picture section */}
                </div>
                            
                <div className="mt-1">
                    <button type="button" onClick={handleUpdate}
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 
                    px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-green-500 focus-visible:ring-offset-2 ml-auto">
                        {isLoadingUpdate ? 
                        <span>Saving changes...</span> 
                        :    
                        <span>Save changes</span> 
                        }
                    </button>
                </div>
                </Dialog.Panel>
            </Transition.Child>
            </div>
        </div>
        </Dialog>
    </Transition>
    </div>
  )
}

export default EditPostModal