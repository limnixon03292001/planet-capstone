import { createContext, useContext, useEffect, useState, } from 'react';


const MainContext = createContext();


const ContextProvider = ({ children }) => {

    const [authId, setAuthId] = useState(null)
    const [posts, setPosts] = useState([]); //state for all posts of user
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState();
    
    
    return (
        <MainContext.Provider value={{
            posts, setPosts,
            authId, setAuthId,
            socket, setSocket,
            onlineUsers, setOnlineUsers,
            chats, setChats

        }}>
            {children}
        </MainContext.Provider>
    )
  }
  
  export const MyContext = () => {
      return useContext(MainContext);
  }
  
  export default ContextProvider