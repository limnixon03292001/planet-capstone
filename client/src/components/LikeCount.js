import React, { useEffect } from 'react'
import { MyContext } from '../context/ContextProvider';

const LikeCount = ({ like, setLike, postData, animationLikes, setAnimationLikes }) => {
    const { socket } = MyContext();

    //this useEffect is responsible for catching realtime likes and dislikes [LISTENER]
    useEffect(() => {
        console.log("fire")
        socket?.on("likeReceived", ({ likedPost }) => {
                if(postData?.post_id === likedPost?.post_id) {
                   // 1. Old number goes up
                   setTimeout(() => setAnimationLikes('goUp'), 0);
                   // 2. Incrementing the counter  
                   setTimeout(() => {
                        setLike(Number(likedPost?.likecount))
                   }, 100);
                   // 3. New number waits down  
                   setTimeout(() => setAnimationLikes('waitDown'), 100);
                   // 4. New number stays in the middle
                   setTimeout(() => setAnimationLikes('initial'), 200);
                }
        });
    },[socket]);
    
  return (
    <span className={`text-sm ${animationLikes}`}>{like ?? 0}</span>
  )
}

export default LikeCount