import React, { useCallback, useState } from 'react'

const SendMessage = ({setMsgContent, mutate, msgContent, chatroomId, pictureUrl, setPictureUrl, sendMessageLoading, open, setOpen}) => {


    const handleSendMsg = (e) => {
        e.preventDefault();
        mutate({chatroom_id: chatroomId, msg_content: msgContent, pictureUrl});
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
                setPictureUrl(reader.result);
                setOpen(true);
            };
        } else {
            setPictureUrl('');
            setOpen(false);
        }
    }, [pictureUrl]);

  return (
    <>
    <form className='relative block z-10 my-1' onSubmit={(e) => handleSendMsg(e)}>
      <div className='flex items-center justify-start'>
          <label className='inline-block cursor-pointer flex-shrink-0' htmlFor='picture'>
            <input hidden accept="image/png, image/jpg, image/jpeg" type="file" name="picture" id="picture" onChange={handleChangeImage} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#3DDAB4" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" 
            className="w-7 h-7 mx-3 block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </label>
          <div className='relative flex-1 mr-2'>
            <input type="text" required aria-required
            value={msgContent} 
            onChange={(e) => setMsgContent(e.target.value)} name="message" placeholder='Send a message.' 
            className='p-3 rounded-full border border-gray-200 block w-full inset-0 focus:border-none 
            focus:outline-none focus:ring-1 focus:ring-green-300'/>
            <button type="submit" className='text-green-900 bg-green-200 px-3 rounded-full absolute top-0 bottom-0 right-0'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </button>
          </div>
      </div>
    </form>

    {open &&
        <div className='z-30 absolute inset-0 backdrop-blur bg-gray-800/70 w-full h-screen flex items-center justify-center'>
          <div className='mx-3 w-full md:m-0 md:w-1/3 bg-white rounded-md relative z-40'>
            <div className='px-4 py-3 border-b border-gray-200'>
              <h1 className='text-xl'>Selected Image</h1>
              <p className='text-[10px] text-gray-500'>You can only select one image at a time.</p>
            </div>
            <div className='px-4 py-2'>
             <img src={pictureUrl} alt="selectedImage" className="max-w-full m-auto h-60 rounded-md object-center"/>
            </div>
            <div className='px-4 py-2 border-t border-gray-200'>
              <button type="submit" className='text-green-900 bg-green-200 px-2 py-1 rounded-md mr-2'
              onClick={(e) => handleSendMsg(e)} disabled={sendMessageLoading}>{sendMessageLoading ? 'Sending please wait...' : 'Send'}</button>
              <button className='text-rose-900 bg-rose-200 px-2 py-1 rounded-md' onClick={() => {
                setPictureUrl('');
                setOpen(false);
              }}>Close</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default SendMessage