import { createContext, useContext, useState, } from 'react';


const MainContext = createContext();


const ContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState({});
    const [authId, setAuthId] = useState(null)
    const [posts, setPosts] = useState([]); //state for all posts of user.
    const [chats, setChats] = useState([]); // all chats of authenticated user.
    const [onlineUsers, setOnlineUsers] = useState([]); //state for online users.
    const [socket, setSocket] = useState();
    const [messages, setMessages] = useState([]);

    return (
        <MainContext.Provider value={{
            authUser, setAuthUser,
            posts, setPosts,
            authId, setAuthId,
            socket, setSocket,
            onlineUsers, setOnlineUsers,
            chats, setChats,
            messages, setMessages,
        }}>
            {children}
        </MainContext.Provider>
    )
  }
  
  export const MyContext = () => {
      return useContext(MainContext);
  }
  
  export default ContextProvider