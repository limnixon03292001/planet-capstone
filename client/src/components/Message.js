
//not being used 
const Message = ({m, authId}) => {
    if(m?.sent_by === authId) {
        return <div className="flex flex-row-reverse items-center justify-start my-3">
            <img src={m?.profile} alt='profile' 
            className='rounded-full h-10 w-10 object-center object-cover'/>

            <div className='mr-2'>
                <p>{m?.msg_content}</p>
            </div>
        </div>
    } else {
       return <div className="flex items-center justify-start my-3">
            <img src={m?.profile} alt='profile' 
            className='rounded-full h-10 w-10 object-center object-cover'/>

            <div className='ml-2'>
                <p>{m?.msg_content}</p>
            </div>
        </div>
     }
}

export default Message