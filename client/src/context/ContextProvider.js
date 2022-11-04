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
    const [x, setX] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedPlant, setSelectedPlant] = useState({}); //state for selected plant from collection and will use it to add to marketplace
    
    return (
        <MainContext.Provider value={{
            authUser, setAuthUser,
            posts, setPosts,
            authId, setAuthId,
            socket, setSocket,
            onlineUsers, setOnlineUsers,
            chats, setChats,
            messages, setMessages,
            pageNumber, setPageNumber,
            x, setX,
            selectedPlant, setSelectedPlant,
        }}>
            {children}
        </MainContext.Provider>
    )
  }
  
  export const MyContext = () => {
      return useContext(MainContext);
  }
  
  export default ContextProvider