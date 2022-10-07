import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { addUserPost, getCommentPost } from '../api/userApi';
import user from '../assets/nixon.jpg';
import ButtonLoader from '../components/ButtonLoader';
import { MyContext } from '../context/ContextProvider';
import { request } from '../utils/axios-utils';

const MakePost = () => {

    const { posts, setPosts, authUser } = MyContext();
    const [pictureUrl, setPictureUrl] = useState('');
    const [description, setDescription] = useState('');

    const { mutate, isLoading } = useMutation(addUserPost, {
        onSuccess: ({ data }) => {
            // console.log("new post", data?.data);
            setPictureUrl('');
            setDescription('');
            window.location.reload();
            setPosts([data?.data, ...posts]);
           
            
        }, 
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
    });

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
            };
        } else {
            setPictureUrl('');
        }
    }, [pictureUrl]);
        
  return (
    <div className='py-4 w-full h-full border-b border-gray-200'>
        <div className='px-4 w-full h-full flex'>
            <img src={authUser?.profile} className="w-[48px] flex-shrink-0 h-[50px] rounded-full object-cover object-center mr-2"/>
            <div className='w-full h-full flex-1'>
                <textarea placeholder="Flex your plant" name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className='w-full border border-gray-200 outline-none focus:outline-none min-h-[120px] rounded-xl'/>
                {/* picture section */}
                {pictureUrl && 
                    <div className='mt-2 relative w-full h-full'>
                        <button onClick={() => setPictureUrl('')} className='p-1 bg-gray-800 bg-opacity-80 rounded-full absolute m-2 focus:outline-none focus:ring-2 focus:ring-gray-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img src={pictureUrl} className="max-w-full m-auto h-full rounded-xl object-cover object-center"/>
                    </div>}
                {/* picture section */}
            </div>
        </div>

      

        <div className='flex items-center justify-end mt-4 px-4'>
            <label className='inline-block mr-4 cursor-pointer' htmlFor='picture'>
                <input hidden accept="image/png, image/jpg, image/jpeg" type="file" name="picture" id="picture" onChange={handleChangeImage} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#3DDAB4" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </label>

            {isLoading ?
                <ButtonLoader 
                    loadingText="Posting..."
                    style="bg-[#3DDAB4] text-white px-4 py-2 flex items-center justify-center w-max rounded-full
                    focus:outline-none focus:ring-4 focus:ring-green-100 block"
                />
            :
                <button type="submit" className="bg-[#3DDAB4] text-white px-5 py-2 inline-block w-max rounded-full
                focus:outline-none focus:ring-4 focus:ring-green-100 text-md font-bold tracking-wide" 
                onClick={() => mutate({pictureUrl, description})} >Flex</button>
            }
        </div>
    </div>
  )
}

export default MakePost