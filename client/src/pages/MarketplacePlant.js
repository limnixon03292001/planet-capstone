import moment from 'moment';
import React, { useEffect, useState } from 'react'
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';
import { useMutation, useQuery } from 'react-query';
import { Link, useLocation, useParams , useNavigate} from 'react-router-dom'
import { createRoom, getPlantMarketplace, getRelatedPlants } from '../api/userApi';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { Icon } from "leaflet";
import fire from '../assets/PLANeTlogo.png';
import { MyContext } from '../context/ContextProvider';
import { checkOnline } from '../utils/checkOnline';
import TradeModal from '../components/TradeModal';

const MarketplacePlant = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { onlineUsers, authUser } = MyContext();
  let [isOpen, setIsOpen] = useState(false);
  const [plant, setPlant] = useState({});
  const [relatedPlant, setRelatedPlant] = useState([]);

  const { data, isLoading } = useQuery(['plant-item', id], getPlantMarketplace,
  {
    onSuccess: ({ data }) => {
      setPlant(data?.data[0]);
    },
    onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject);
    }
  });

  const { isLoading: relatedPlantLoading } = useQuery(['related-plant', plant?.category, id], getRelatedPlants,
  {
    onSuccess: ({ data }) => {
      setRelatedPlant(data?.data);
    },
    onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject);
    }
  });

  const { mutate, isLoading: gettingRoomLoading } = useMutation(createRoom,
  {
        onSuccess: ({ data }) => {
            const chatroom = data?.chatroom;
            const newRoom = data?.newRoom;
            console.log(chatroom, newRoom);

            if(chatroom){
               return navigate(`/messages/chatroom/${chatroom?.chatroom_id}`);
            } else if (newRoom){
               return navigate(`/messages`);
            }
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject)
        }
  });

  function closeModal() {
    setIsOpen(false);
}

  function openModal(p) {
      setIsOpen(true);
  }

  useEffect(() => {
    setPlant(data?.data[0])
  }, [location]);

  return (
    <div className='block border-x border-gray-200 w-full min-h-screen pt-6 overflow-hidden'>
      <div>
        <div className='sticky top-0'>
          <h1 className='font-extrabold text-lg px-4 h-8 z-10 bg-white/60 backdrop-blur '>Marketplace</h1>
        </div>

        <div className='px-4 mt-8 md:grid grid-cols-2 h-full w-full'>

          <div className='w-full md:max-w-[520px] lg:pr-5 xl:pr-0'>
            <div className='flex items-center justify-between mb-4'>
              <p className='font-bold'>Seller Information</p>         
              <Link to={`/profile/${plant?.user_id}`} className='text-xs underline text-cyan-500'>See sellers profile</Link>
            </div>

            <div className='flex items-center'>
              <div className='relative'>
                <img src={plant?.profile} alt="profile" className='w-10 h-10 aspect-square rounded-full object-cover object-center'/>
                  {checkOnline(onlineUsers, plant?.user_id) ? 
                  <div className='bg-green-500 p-[5px] h-3 w-3 absolute -bottom-1 -right-2 border-[3px] border-white rounded-full z-10 inline-block mr-2'/>
                  :
                  <div className='bg-gray-500 p-[5px] h-3 w-3 absolute -bottom-1 -right-2 border-[3px] border-white rounded-full z-10 inline-block mr-2'/>
                  }
                </div>
                <div className='flex-1 flex items-start justify-between'>
                  <div className='ml-2'>
                    <p className='font-bold'>{plant?.firstname} {plant?.lastname}</p>
                    <p className='text-xs text-gray-500'>{plant?.email}</p>
                  </div>
                  <p className='self-end text-emerald-500 text-[10px]'>Added {moment(plant?.created_at).fromNow()}</p>
                </div>
            </div>

            {/* button */}
              {authUser?.user_id !== plant?.user_id &&
                <div className='mt-5 flex'>
                  <button type="button" onClick={() => mutate({userId: plant?.user_id})} 
                  className="bg-[#3DDAB4] shadow-lg shadow-[#3DDAB4]/50 text-white w-full py-2 rounded-lg focus:outline-none focus:ring-4
                    focus:ring-green-100 text-sm font-semibold tracking-wide mr-2 flex items-center justify-center " >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                      <span>Send a message</span>
                  </button>
    
                  <button type="button" onClick={openModal}
                  className="bg-[#3DDAB4] shadow-lg shadow-[#3DDAB4]/50 text-white w-full py-2 rounded-lg focus:outline-none focus:ring-4
                    focus:ring-green-100 text-sm font-semibold tracking-wide mr-2 flex items-center justify-center " >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                      <path fillRule="evenodd" d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                      <span>Request trade</span>
                  </button>
                </div>
              }
            {/* button */}

            <div className='mt-5'>
              <h1 className='text-2xl font-semibold mb-2'>{plant?.plant_name}</h1>
              <p className='text-green-400 text-lg font-medium'>{plant?.status}</p>
              <p className='font-bold text-2xl my-2'>{plant?.price} · <span className='text-sm font-normal align-middle'>{plant?.quantity} pieces available</span></p>
              <div>
                <p className='font-semibold'>Description</p>
                <p className='text-[13px] text-gray-500 mt-2 text-justify'>{plant?.description}</p>
              </div>
            </div>

              
            {/* main description / specification / location */}
            
            <div className='py-2 w-full'>
              <div className=''>
                <div className='border-b  border-200 py-4'>
                  <h1 className='font-semibold text-lg text-emerald-400'>Growing Preference</h1>
                </div>
                <div className='mt-4 space-y-3 text-sm'>
                  <p className='font-semibold'>Sun Preference: <span className='font-normal'>{plant?.sun_pref}</span></p>
                  <p className='font-semibold'>Soil Preference: <span className='font-normal'>{plant?.soil_pref}</span></p>
                  <p className='font-semibold'>Interior Light: <span className='font-normal'>{plant?.inter_light}</span></p>
                  <p className='font-semibold'>Water Requirement: <span className='font-normal'>{plant?.water_req}</span></p>
                  <p className='font-semibold'>Native Habitat: <span className='font-normal'>{plant?.native_habitat}</span></p>
                </div>
              </div>
              <div className='mt-5 md:mt-4 '>
                <div className=' border-b  border-200 py-4'>
                  <h1 className='font-semibold text-lg text-emerald-400'>Growing Information</h1>
                </div>
                <div className='mt-4 space-y-3 text-sm'>
                  <p className='font-semibold'>Date Planted: <span className='font-normal'>{plant?.date_planted}</span></p>
                  <p className='font-semibold'>Average Height: <span className='font-normal'>{plant?.avg_h}</span></p>
                  <p className='font-semibold'>Average Width: <span className='font-normal'>{plant?.avg_w}</span></p>
                  <p className='font-semibold'>Foliage Color: <span className='font-normal'>{plant?.foliage_color}</span></p>
                  <p className='font-semibold'>Foliage Type: <span className='font-normal'>{plant?.foliage_type}</span></p>
                  <p className='font-semibold'>Foliage Scent: <span className='font-normal'>{plant?.foliage_scent}</span></p>
                  <p className='font-semibold'>Flower Color: <span className='font-normal'>{plant?.flower_color}</span></p>
                  <p className='font-semibold'>Fragrant: <span className='font-normal'>{plant?.fragrant}</span></p>
                  <p className='font-semibold'>Nocturnal Flowering: <span className='font-normal'>{plant?.nocturnal_flowering}</span></p>
                  <p className='font-semibold'>Repeat Blooming: <span className='font-normal'>{plant?.repeat_blooming}</span></p>
                  <p className='font-semibold'>Flowering Period: <span className='font-normal'>{plant?.flowering_period}</span></p>
                </div>
              </div>
            </div>

          </div>

          {/* pic */}
         
          <div className='w-full h-full mt-4 md:mt-0 transition-all block'>
            <div className=''>
              {/* <div className=' blur-sm absolute inset-0 h-full w-max rounded-lg overflow-hidden'/> */}
                <img src={plant?.plant_img} alt="plant_img" className='object-cover object-center w-full h-96 rounded-lg relative'/>
            </div>
              
            <div className='h-full w-full mt-5'>
              <p className='text-sm text-gray-700 flex items-center justify-end mt-2 mb-2 font-semibold'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                className="w-[17px] h-[17px] mr-1">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
                <span>{plant?.address}</span>
              </p>
              {plant?.lng && plant?.lat && <MiniMap lng={plant?.lng} lat={plant?.lat}/> }
           
            </div>

          </div>
           
        </div>

        {/* related plant */}
        <div className='px-4 mt-6 mb-10'>
          <h1 className='font-semibold text-lg'>Related Plants</h1>

          <div className='mt-4 grid grid-cols-myGrid'>
              {relatedPlant?.length === 0 && !relatedPlantLoading && <p className='text-gray-500'>No related plants found...</p> }
              {relatedPlant?.map((p, id) => (
                <div className="my-3 relative w-max" key={id}>
                  <Link to={`/marketplace/item/${p?.plant_detail_id}`} >
                    <div className='group'>
                      <img src={p?.profile} alt="profile_img" 
                      className='aspect-square absolute -top-3 -left-2 rounded-full w-10 h-10 object-cover object-center
                      bg-emerald-300 border-[4px] border-white text-white z-20 block cursor-pointer'/>

                      
                      <div className='group-hover:opacity-100 opacity-0 group-hover:visible invisible absolute z-10 bg-white 
                      translate-x-5 translate-y-4 rounded-lg overflow-hidden transition-opacity w-full max-w-[280px] shadow-xl'>
                        <Link to={`/profile/${p?.user_id}`}>
                        <div className='relative'>
                          <img src={p?.cover} alt="cover" className='absolute inset-0 w-full h-full object-cover object-center'/>
                          <div className='absolute inset-0 w-full h-full bg-gradient-to-tr from-black to-black/20 '/>
                          <div className='relative z-20 text-white p-3'>
                            <div className='flex items-center'>
                              <img src={p?.profile} alt="profile_img" 
                              className='aspect-square rounded-lg w-10 h-10 object-cover object-center
                              bg-emerald-300 block z-10 mr-2'/>

                              <div>
                                <p className='mx-1 font-bold'>{p?.firstname} {p?.lastname}</p>
                                <p className='text-gray-200 text-[9px] mx-1'>{p?.email}</p>
                              </div>
                            </div>

                            {checkOnline(onlineUsers, p?.user_id) ? 
                            <div className='flex items-center mt-4'>
                              <div className='bg-green-500 p-[5px] h-3 w-3 rounded-full z-10 inline-block mr-2'/>
                              <p className='text-sm'>Online</p>
                            </div>
                            :
                            <div className='flex items-center mt-4'>
                              <div className='bg-gray-500 p-[5px] h-3 w-3 rounded-full z-10 inline-block mr-2'/>
                              <p className='text-sm'>Offline</p>
                            </div>
                            }

                            <div className='mx-1 mt-4 flex items-center'>
                              <p className='text-xs mr-2 font-bold'>{p?.followerscount} <span className='font-normal'>followers</span></p>
                              <p className='text-xs font-bold'>{p?.followingcount} <span className='font-normal'>following</span></p>
                            </div>
                          </div>
                        </div>
                        </Link>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg w-full max-w-[240px] shadow-md self-start">
                        <img src={p?.plant_img} alt="plant_img" 
                        className='w-full h-[280px] aspect-square object-cover object-center bg-emerald-300 text-white'/>
                        <div className='px-3 py-2 w-full h-full bg-gradient-to-t from-black 
                      text-white absolute left-0 right-0 bottom-0 flex flex-col justify-end'>
                            <div className='h-32'>
                            <h1 className='font-md text-xs text-green-400'>{p?.status}</h1>
                                <h1 className='font-bold text-lg'>
                                  <EllipsisText text={p?.plant_name} length={19} />
                                </h1>
                                {p?.address &&   
                                  <p className='text-[9px] flex items-end mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                                    className="w-3 h-3 mr-1">
                                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                    </svg>

                                    <span>{p?.address}</span>
                                  </p> }
                              
                                <p className='text-gray-300 font-light text-[11px] mt-1'>
                                  <EllipsisText text={p?.description} length={60} />
                                </p>
                            </div>
                          
                        </div>
                        <p className='absolute bottom-0 right-0 text-gray-200 m-2 text-[9px]'>{moment(p?.created_at).fromNow()}</p>
                      </div>
                      <div className='rounded-full bg-emerald-500 border-[4px] border-white
                      text-white w-28 py-2 px-4 self-end text-center -mt-6 mx-3 relative'>
                        {p?.price}
                      </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        {/* related plant */}


        {/* Modal of trade request */}
        {isOpen && <TradeModal isOpen={isOpen} closeModal={closeModal} plant={plant}/>}
        {/* End Modal of trade request */}

      </div>
    </div>
  )
}

export default MarketplacePlant


export const icon = new Icon({
  iconUrl: fire,
  iconSize: [30, 30]
});

const MiniMap = ({lng, lat}) => { 
  const [position, setPosition] = useState({lat, lng});

  // useEffect(() => {
  //   setPosition({lat, lng});
  // },[position, location])

  return (
    <div className='mt-2 overflow-hidden rounded-lg z-10 map'>
      <MapContainer center={position} zoom={17} style={{width: '100%'}}>
        <LayersControl>
            <LayersControl.Overlay name="Street view">
                <TileLayer
                    url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
                    maxZoom= {20}
                    subdomains={['mt0','mt1','mt2','mt3']}
                />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Satellite view">
                <TileLayer
                url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
                maxZoom= {20}
                subdomains={['mt0','mt1','mt2','mt3']}
                />
            </LayersControl.Overlay>
          </LayersControl>
          <Marker position={position} icon={icon}/>
      </MapContainer>
    </div>
  )
}