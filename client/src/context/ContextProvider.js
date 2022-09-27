import { createContext, useContext, useEffect, useState, } from 'react';


const MainContext = createContext();


const ContextProvider = ({ children }) => {

    const [authId, setAuthId] = useState(null)
    const [posts, setPosts] = useState([]); //state for all posts of user.
    const [chats, setChats] = useState([]); // all chats of authenticated user.
    const [onlineUsers, setOnlineUsers] = useState([]); //state for online users.
    const [ntf, setNtf] = useState(0); // state for incoming notification.
    const [socket, setSocket] = useState();

    return (
        <MainContext.Provider value={{
            posts, setPosts,
            authId, setAuthId,
            socket, setSocket,
            onlineUsers, setOnlineUsers,
            chats, setChats,
            ntf, setNtf,
        }}>
            {children}
        </MainContext.Provider>
    )
  }
  
  export const MyContext = () => {
      return useContext(MainContext);
  }
  
  export default ContextProvider