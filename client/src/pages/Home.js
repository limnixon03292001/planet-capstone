import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Marketplace from './Marketplace';
import Messages from './Messages';
import NotFound from './NotFound';
import PostFeeds from './PostFeeds';
import Profile from './Profile';
import MyMap from './MyMap';
import { useEffect } from 'react';
import { MyContext } from '../context/ContextProvider';
import toast from 'react-hot-toast';
import AddPlantCollections from '../pages/AddPlantCollections';
import MyPlantCollections from './MyPlantCollections';
import SellPlant from './SellPlant';
import MarketplacePlant from './MarketplacePlant';
import PickPlant from './PickPlant';
import AddMoreDetail from '../components/AddMoreDetail';
import Bottombar from '../components/Bottombar';


const Home = () => {

  const { socket } = MyContext();
  
  useEffect(() => {
    socket?.on("notifReceived", (newNotif) => {
      console.log("all notif", newNotif)
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full object-cover object-center"
                    src={newNotif?.user?.profile}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="mt-1 text-sm">
                     <span className='font-medium'>{newNotif?.user?.firstname} {newNotif?.user?.lastname} </span> followed you.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        ))
      });
  },[socket]); 

  return (
    <div className='block w-full max-w-[1500px] m-auto min-h-full h-full'>
        <div className='flex w-full h-full'>
         
            <Sidebar/>

            
              <Bottombar/>
        
              {/* main-content */}
              <div className='w-full h-full'>
                    <div className='min-h-screen w-full h-full'>
                      <Routes>
                        <Route path= "/" element={<PostFeeds/>}/>
                        <Route path="/profile/:id" element={<Profile/>}/>
                        <Route path="/messages/*" element={<Messages/>}/>
                        <Route path="/marketplace" element={<Marketplace/>}/>
                        <Route path="/marketplace/sell-plants" element={<SellPlant/>}/>
                        <Route path="/marketplace/item/:id" element={<MarketplacePlant/>}/>
                        <Route path="/marketplace/pick-plantsCollection" element={<PickPlant/>}/>
                        <Route path="/marketplace/selectedPlant-addMore" element={<AddMoreDetail/>}/>
                        <Route path="/map/*" element={<MyMap/>}/>
                        <Route path="/add-plantCollections" element={<AddPlantCollections/>}/>
                        <Route path="/my-plants" element={<MyPlantCollections/>}/>

                        {/* 404 PAGE  */}

                        <Route path="*" element={<NotFound/>}/>

                        {/* 404 PAGE  */}
                      </Routes>
                    </div>
                </div>
              {/* main-content */}
         
        </div>
    </div>
  )
}

export default Home
