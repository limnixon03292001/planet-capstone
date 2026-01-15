import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useMutation } from 'react-query';
import { addCommentPost, deleteCommentPost } from '../api/userApi';
import moment from 'moment';
import decode from 'jwt-decode'

const CommentModal = ({ closeModal, isOpen, post_id, comments, setComments }) => {
    const { id } = decode(localStorage?.token);
    const authId = id;

    const [newComment, setNewComment] = useState('');

    // useEffect(() => {
    //     mutate({post_id: post_id});
    // },[]);

    const { mutate: mutateDelete, isLoading: isLoadingDeleteComment } = useMutation(deleteCommentPost, 
      {
          onSuccess: ({ data }) => {
              console.log(data);
              
             
          }, 
          onError: (err) => {
              const errObject = err.response.data.error;
              console.log(errObject)
          }
      });

    const handleDeleteComment = (commId) => {
        mutateDelete({comment_id: commId});
        const newComments = comments.filter((comm) => {
          return comm.postcomment_id !== commId
        });
        // setCount(prev => prev--);
        setComments(newComments);
    }

    const { mutate: mutateAddComment, isLoading: isLoadingAddComment } = useMutation(addCommentPost,
      {
        onSuccess: ({ data }) => {
          console.log("added", data?.newComment);
          // setCount(prev => prev++);
          setComments([data?.newComment, ...comments]);
        }, 
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    });

    const handleAddComment = () => {
      if(newComment === ''){
        return alert("Making a comment without content is not allowed!");
      }
      mutateAddComment({post_id: post_id, comment_text: newComment});
    }

  return (
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
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 border-b border-gray-200 pb-3 mb-5"
                  >
                   {comments.length > 1 ? <p>{comments.length} Comments</p> : <p>{comments.length} Comment</p> } 
                  </Dialog.Title>
                  
                  {false ?
                    <div className='flex items-center '>
                        <svg className="inline mr-2 w-5 h-5 text-gray-200 animate-spin fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <p>Fetching comments...</p>
                    </div> 
                  :

                    <>
                    {
                        comments.length === 0 ? 
                        <p>No comments found.</p>
                        :
                        <div className='max-h-[454px] h-full overflow-auto'>
                          {comments?.map((comm,id) => (
                              <React.Fragment key={id}>
                                  <div className='my-6 flex items-center'>
                                      <img src={comm?.profile} className="h-8 w-8  rounded-full mr-2 object-cover object-center self-start"/>
                                      <div className='rounded-md'>
                                        <div>
                                          <h1 className='text-sm font-bold text-gray-900 inline-block mr-2'>{comm?.firstname} {comm?.lastname}</h1>
                                          <span className='text-xs text-gray-500 mr-1'>- {moment(comm.comment_created).fromNow()}</span>
                                          { authId === comm.user_id &&

                                          <div className='inline-block'>
                                            <svg onClick={() => handleDeleteComment(comm?.postcomment_id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="inline-block w-4 h-4 text-gray-900 mr-1">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="inline-block w-4 h-4 text-gray-900">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>

                                          </div>
                                          }
                                        </div>
                                          
                                        <p className='my-0 text-sm break-words break-all'>{comm?.comment_text}</p>
                                      </div>
                                  </div>
                              </React.Fragment>
                          ))}
                        </div>
                    }
                    <div className='mt-7'>
                      <div className='relative'>
                        <input type="text" value={newComment} required onChange={(e) => setNewComment(e.target.value)} name="comment" placeholder='Write a comment.' className='rounded border border-gray-200 block w-full inset-0 focus:border-none focus:outline-none focus:ring-2 focus:ring-green-300'/>
                        <button type="button" onClick={handleAddComment} className='text-green-900 bg-green-200 px-2 rounded absolute top-0 bottom-0 right-0'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                    
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
    </Transition>
  )
}

export default CommentModal