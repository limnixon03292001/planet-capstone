import React, { useEffect, useState, Fragment, useCallback, useRef } from 'react';
import moment from 'moment';
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { deletePlantMarketplace, getSellingUserPlants, updatePlantMarketplace } from '../api/userApi';
import ButtonLoader from '../components/ButtonLoader';
import ProfileSidebar from '../components/ProfileSidebar'
import { MyContext } from '../context/ContextProvider';
import { checkOnline } from '../utils/checkOnline';
import { Listbox, Transition, Dialog } from '@headlessui/react'
import { status, SunPreferences, InteriorLight, WaterRequirements, NativeHab, SoilPreferences, Measurement,
FoliageYesOrNo, Foliage, FloweringPeriod } from '../data';
import { NumericFormat } from 'react-number-format';
import logo from '../assets/PLANeTlogo.png';
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FilterButton from '../components/FilterButton';
import toast from 'react-hot-toast';
import { openModal, closeModal } from '../utils/reusableFunctions';

//default values

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

//Selling plants to update (parent)
const SellingList = () => {

    const { onlineUsers } = MyContext();
    const [sellingUserPlants, setSellingUserPlants] = useState([]);
    let [isOpen, setIsOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [toUpdate, setToUpdate] = useState({});

    const { isLoading, refetch } = useQuery(['currently-selling'], getSellingUserPlants, {
        onSuccess: ({ data }) => {
          // console.log("marketplace plants", data?.data);
          setSellingUserPlants(data?.data);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });

    const { mutate, isLoadingDelete } = useMutation(deletePlantMarketplace,
        {
          onSuccess: ({ data }) => {
            toast.success('Deleted Successfully!');
            refetch();
            closeModal(setIsOpen);
          },
          onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
          }
    });

    const handleDelete = () => {
        mutate({plant_detail_id: idToDelete});
    }

    function isObjEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

  return (
    <div className='block border-x border-gray-200 w-full max-w-[860px] min-h-screen pt-4 pb-5 mb-[56px] sm:mb-0'>
        <div>
            {isObjEmpty(toUpdate) ? 
                <div>
                    <div className='w-full flex items-center justify-between'>
                    <h1 className='text-lg mt-1 px-4 flex items-center justify-start'>
                        <ProfileSidebar/>
                        <span className='ml-3 sm:ml-0 font-extrabold'>Selling</span> 
                    </h1>
                    </div>
                    
                    {/* items start */}
                    <div>
                    {isLoading ?
                    <div className='flex items-center justify-center w-full msgOuterContainer text-gray-700'> 
                        <ButtonLoader/>
                        <p>Loading...</p>
                    </div>
                    :
                        <>
                        {sellingUserPlants.length === 0 && <div className='p-4'>No Items.</div>}
                        <main className='px-4 mt-6 grid grid-cols-gridMarketPlace gap-5'>
                            {sellingUserPlants?.map((p, id) => (
                
                                <div className="relative w-full animate-fadeIn" key={id}>
                                    <button onClick={() => setToUpdate(p)} className='border-4 cursor-pointer border-white rounded-full p-2 absolute z-10 -top-3 -right-3 w-max h-max text-white bg-green-500/70'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" 
                                        className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </button>
                                    <button onClick={() => {
                                        setIdToDelete(p?.plant_detail_id);
                                        openModal(setIsOpen);
                                    }} className='border-4 cursor-pointer border-white rounded-full p-2 absolute z-10 -top-3 right-10 w-max h-max text-white bg-red-500/70'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" 
                                        className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>

                                    <Link to={`/marketplace/item/${p?.plant_detail_id}`} className="w-full" >
                                        <div className='group w-full'>
                                            <img src={p?.profile} alt="profile_img" 
                                            className='aspect-square absolute -top-3 -left-2 rounded-full w-10 h-10 object-cover object-center
                                            bg-emerald-300 border-[4px] border-white text-white z-10 block cursor-pointer'/>

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

                                        <div className="relative overflow-hidden rounded-lg w-full shadow-md group">
                                            <img src={p?.plant_img} alt="plant_img" 
                                            className='w-full h-[280px] group-hover:scale-110 transition-transform aspect-square object-cover object-center bg-emerald-300 text-white'/>
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
                        </main>
                        </>
                        }
                    </div>
                    {/* items end */}
                </div>
            :
                <UpdatePlant p={toUpdate}/>
            }
        </div>

           {/* this component is at the bottom */}
           <LeaveConversationModal isOpen={isOpen} closeModal={closeModal} setIsOpen={setIsOpen} handleDelete={handleDelete}  />

    </div>
  )
}

export default SellingList;

//update plant components
const UpdatePlant = ({ p }) => {
   
    const [data, setData] = useState({...p, sun_pref:  p?.sun_pref == undefined ? [] : p?.sun_pref?.split(','), 
                                            inter_light: p?.inter_light == undefined ? [] : p?.inter_light?.split(','),
                                            soil_pref: p?.soil_pref == undefined ? [] : p?.soil_pref.split(','),
                                            water_req: p?.water_req == undefined ? [] : p?.water_req?.split(','),
                                            native_habitat: p?.native_habitat == undefined ? [] : p?.native_habitat?.split(','),
                                            flowering_period: p?.flowering_period == undefined ? [] : p?.flowering_period.split(','),
                                    });
    const [pictureUrl, setPictureUrl] = useState(data?.plant_img);
    const mapContainerRef = useRef(null);
    const coordinates = useRef(null);
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(updatePlantMarketplace,
        {
          onSuccess: ({ data }) => {
            toast.success('Updated Successfully!');
            navigate("/marketplace");
          },
          onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
          }
    })

    // useEffect(() => {
    //     console.log("data", data);
    // },[data]);

     // Render map
     useEffect(() => {

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [data?.lng, data?.lat],
          zoom: 17
        });
    
        const marker = new mapboxgl.Marker({
          draggable: true
          })
          .setLngLat([data?.lng, data?.lat])
          .addTo(map);
           
          function onDragEnd() {
            const lngLat = marker.getLngLat();
            coordinates.current.style.display = 'block';
            coordinates.current.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
            setData({...data, lng: lngLat?.lng.toString(), lat: lngLat?.lat.toString()});
          }
           
          marker.on('dragend', onDragEnd);
    
          //Clean up function
          return () => map.remove();
    },[]);

     //handling image onchange
     const handleChangeImage = useCallback((e) => {
        const file = e.target.files[0];
        transformImg(file);
    },[]);
  
    //transforming the image file into base64 url 
    const transformImg = useCallback((file) => {
        const reader = new FileReader();

        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPictureUrl(reader?.result);
                setData({...data, plant_img: reader?.result});
            };
        } else {
            setPictureUrl('');
            setData({...data, plant_img: ''});
        }
    }, [pictureUrl]);
    
    return (
        <div>
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-lg mt-1 px-4 flex items-center justify-start'>
                    <ProfileSidebar/>
                    <span className='ml-3 sm:ml-0 font-extrabold'>Update {p?.plant_name}</span> 
                </h1>
            </div>

            <div className='px-3'>
                <div className='mt-5 flex flex-wrap gap-x-2 gap-y-2'>
                    <div>
                        <p className='text-gray-500 mb-2 text-sm'>Status</p>
                        <Dropdown list={status} currentData={p?.status} setData={setData} data={data} target='status'/>
                    </div>
                    <div className="flex-shrink-0 flex-1 min-w-[150px]">
                        <label htmlFor="quantity" className="text-gray-500 mb-2 block text-sm">Quantity Available</label>
                        <input type="number" placeholder="quantity" id="quantity" name="quantity" required
                        className="rounded-md border border-gray-200 w-full p-3 text-sm" value={data?.quantity} 
                        onChange={(e) => setData({...data, quantity: e.target.value})}/>
                    </div>
                    <div className='flex-1'>
                        <label htmlFor="price" className="text-gray-500 mb-2 block text-sm">Price</label>
                        <NumericFormat value={data?.price} displayType={'input'} thousandSeparator={true} prefix={'₱ '} placeholder="price"
                        className="rounded-md border border-gray-200 w-full p-3 text-sm"
                        onChange={(e) => setData({...data, price: e.target.value})} />
                    </div>
                </div>

                <div className='mt-3 sm:flex gap-x-3'>
                    <div className='flex-1'>
                        <div className="w-full">
                            <label htmlFor="name" className="block text-[#536471] mb-3 text-sm">Plant's name</label>
                            <input type="text" placeholder="plant's name" id="name" name="name" required
                            value={data?.plant_name}
                            onChange={(e) => setData({...data, plant_name: e.target.value})}
                            className="rounded-md border border-gray-200 w-full p-4 text-sm"/>
                        </div>

                        <div className="mt-3  w-full">
                            <label htmlFor="description" className="block text-[#536471] mb-3 text-sm">Description</label>
                            <textarea placeholder="description" name="description" id="description" required
                            onChange={(e) => setData({...data, description: e.target.value})}
                            value={data?.description}
                            className='w-full border border-gray-200 outline-none focus:outline-none min-h-[120px] rounded-xl text-sm'/>
                        </div>

                        <div className='mt-3'>
                            <div>
                                <label htmlFor="address" className="text-gray-500 mb-2 block text-sm">Address</label>
                                <input type="text" placeholder="address" id="address" name="address" required
                                className="rounded-md border border-gray-200 w-full p-3 text-sm" value={data?.address}
                                onChange={(e) => setData({...data, address: e.target.value})} />
                            </div>
                        </div>
                    </div>  
                    {/* image picture */}
                    <div className='mt-2 sm:mt-0'> 
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-[#536471] flex-1">Plant's image</label>
                            <label className='text-center bg-green-200 text-gray-900 
                            p-[5px] flex items-center justify-center rounded-full cursor-pointer 
                            focus:outline-none focus:ring-4 focus:ring-green-100' htmlFor='picture' > 
                                <input hidden accept="image/png, image/jpg, image/jpeg" type="file" name="picture" id="picture" onChange={handleChangeImage} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                className="w-5 h-5 inline align-middle">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </label>
                        </div>
                        <div className='mt-2 relative w-full h-full'>
                            {pictureUrl && 
                            <button onClick={() => {
                                setPictureUrl(null);
                                setData({...data, plant_img: ''})
                            }} className='p-1 bg-gray-800 bg-opacity-80 rounded-full absolute m-2 focus:outline-none focus:ring-2 focus:ring-gray-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            }
                            <img src={pictureUrl ?? logo} alt="plant img" className='w-[237px] h-full object-center object-cover rounded-xl border border-gray-200'/>
                        </div>
                    </div>
                    {/* image picture */}
                </div>

                {/* pin location */}
                <div className='mt-3'>
                    <label htmlFor="name" className="block text-[#536471] mb-3 ">Pin Location</label>

                    <div className='mt-2 overflow-hidden rounded-lg relative'>
                        <div ref={mapContainerRef} className="w-full h-[440px]"/>
                        <pre ref={coordinates} className="coordinates
                        absolute z-20 top-0 m-1 text-sm bg-black/60 p-1 rounded-md text-white"/>
                    </div>
                </div>
                {/* pin location */}
                
                <GrowingPreferences setData={setData} data={data} />
                <GrowingInformation setData={setData} data={data}/>
                <div className="px-4">
                    <button type="button" 
                    className='bg-green-200 text-green-800 rounded-md focus:outline-none focus:ring-4 
                focus:ring-green-300  px-4 py-2 w-full'>

                    <span className='text-md block mt-[1px]'>{isLoading ? <ButtonLoader style="block mx-auto" loadingText='Updating...'/> : 
                        <button className='w-full flex items-center justify-center'  onClick={() => mutate(data)}>  
                            <div className='flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            Update Plant
                            </div>
                        </button>}
                    </span>

                    </button>
                </div>
                {/* <p className='h-[230px]'></p> */}
            </div>
        </div>
    )
}

const LeaveConversationModal = ({isOpen , closeModal, setIsOpen, handleDelete}) => {
  
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => closeModal(setIsOpen)}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 
                    text-left align-middle shadow-xl transition-all">
                        <div>
                            <h1 className='font-bold text-xl text-gray-800'>Delete this item?</h1>
                            <p className='mt-2 text-red-500 text-sm'>Warning! This action cannot be undone.</p>
                            <div className='w-max ml-auto mt-4'>
                                <button onClick={handleDelete}
                                className='text-gray-100 bg-emerald-500 px-2 py-1 rounded-md mr-2'>
                                    Yes
                                </button>
                                <button onClick={() => closeModal(setIsOpen)}
                                className='text-gray-100 bg-red-500 px-2 py-1 rounded-md'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition>
    )
}

// other components
const GrowingPreferences = ({data, setData }) => {

    //dynamic function in handling checkbox changes
    const handleChange = (e, namex) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
 
        //checking if the checkbox is checked. If true then add the value to the respective object key
        if(isChecked === true){
            setData({...data, [namex]: [e.target.value, ...data?.[namex]]})
        } else {
            //logic for removing value from a certain object key
            const g = data?.[namex].filter((x) => {
                return x.trimStart() !== value 
            });
            //set the return new array value
            setData({...data, [namex]: g })
        }
    }
 
    return (
        <div>
            <h1 className='font-medium text-xl mb-4 px-4 py-4 border-y border-gray-200 text-emerald-600'>Growing Preferences</h1>

            {/* Sun Preferences */}
            <div className="px-4 mb-2">
                <label htmlFor="name" className='text-gray-500 mb-4 block'>Sun Preferences</label>

                <div className="grid grid-cols-2">
                    <div>            
                        {SunPreferences?.slice(0,2).map((d, i) => (
                        <div className="flex items-center mb-4" key={i} >
                            <input id="default-checkbox" type="checkbox" 
                            name="sun_pref" value={d?.value} onChange={(e) => handleChange(e, 'sun_pref')} 
                            checked={data?.sun_pref?.some((sp) => {
                                return sp.trimStart() === d?.value
                            })} 
                            className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                focus:ring-emerald-500 "/>
                            <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div> 
                        ))}
                    </div>
                    <div>
                        {SunPreferences?.slice(2,5).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name='sun_pref'
                                 checked={data?.sun_pref?.some((sp) => {
                                    return sp.trimStart() === d?.value
                                })}  
                                value={d?.value} onChange={(e) => handleChange(e, 'sun_pref')} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Sun Preferences */}

            {/* Interior Light */}
            <div className="px-4 mb-2">
                <label htmlFor="name" className='text-gray-500 mb-4 block'>Interior Light</label>

                <div className="grid grid-cols-2">
                    <div>
                        {InteriorLight?.slice(0,2).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e, 'inter_light')} 
                                checked={data?.inter_light?.some((sp) => {
                                    return sp.trimStart() === d?.value
                                })} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                    <div>
                        {InteriorLight?.slice(2,5).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e, 'inter_light')} 
                                checked={data?.inter_light?.some((sp) => {
                                    return sp.trimStart() === d?.value
                                })} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Interior Light */}

            {/* Soil Preferences */}
            <div className="px-4 mb-2">
                <label htmlFor="name" className='text-gray-500 mb-4 block'>Soil Preferences</label>

                <div className="grid grid-cols-2">
                    <div>
                        {SoilPreferences?.slice(0,3).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e, 'soil_pref')} 
                                checked={data?.soil_pref?.some((sp) => {
                                    return sp.trimStart() === d?.value
                                })} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300 focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                    <div>
                        {SoilPreferences?.slice(3,6).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e, 'soil_pref')} 
                                checked={data?.soil_pref?.some((sp) => {
                                    return sp.trimStart() === d?.value
                                })} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Soil Preferences */}

            {/* Water Requirements */}
            <div className="px-4 mb-2">
                <label htmlFor="name" className='text-gray-500 mb-4 block'>Water Requirements</label>

                <div className="grid grid-cols-2">
                    <div>
                        {WaterRequirements?.slice(0,2).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e, 'water_req')} 
                                checked={data?.water_req?.some((sp) => {
                                    return sp.trimStart() === d?.value
                                })} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                    <div>
                        {WaterRequirements?.slice(2,3).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e, 'water_req')} 
                                checked={data?.water_req?.some((sp) => {
                                    return sp.trimStart() === d?.value
                                })} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                </div>                
            </div>
            {/* Water Requirements */}

            {/* Native Habitat */}
            <div className="px-4 mb-2">
                <label htmlFor="name" className='text-gray-500 mb-4 block'>Native Habitat</label>

                <div className="grid grid-cols-2">
                    <div>
                        {NativeHab?.slice(0,4).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e, 'native_habitat')} 
                                checked={data?.native_habitat?.some((sp) => {
                                    return sp.trimStart() === d?.value
                                })} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                    <div>
                        {NativeHab?.slice(4,8).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e, 'native_habitat')} 
                                checked={data?.native_habitat?.some((sp) => {
                                    return sp.trimStart() === d?.value
                                })} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                </div>                
            </div>
            {/* Native Habitat */}

        </div>
    )
}

const GrowingInformation = ({data, setData}) => {

    const [avg, setAvg] = useState({minH: data?.avg_h?.split(' ')[0]?.split('-')[0], 
                                    maxH: data?.avg_h?.split(' ')[0]?.split('-')[1], 
                                    minW: data?.avg_w?.split(' ')[0]?.split('-')[0], 
                                    maxW: data?.avg_w?.split(' ')[0]?.split('-')[1]});
                                    
    const [measH, setMeasH] = useState(data?.avg_h?.split(' ')[1]);
    const [measW, setMeasW] = useState(data?.avg_w?.split(' ')[1]);

    useEffect(() => {
        setData({...data, avg_h: `${avg?.minH}-${avg?.maxH} ${measH}`, avg_w: `${avg?.minW}-${avg?.maxW} ${measW}` });
    },[avg, measH, measW]);

    const handleChange = (e, namex) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
 
        //checking if the checkbox is checked. If true then add the value to the respective object key
        if(isChecked === true){
            setData({...data, [namex]: [e.target.value, ...data?.[namex]]})
        } else {
            //logic for removing value from a certain object key
            const g = data?.[namex].filter((x) => {
                return x.trimStart() !== value 
            });
            //set the return new array value
            setData({...data, [namex]: g })
        }
    }
 
    return (
        <div className='mt-8 text-sm'>
            <h1 className='font-medium text-xl mb-4 px-4 py-4 border-y border-gray-200 text-emerald-600'>Growing Information</h1>

            <div className="mb-5 px-4">
                <label htmlFor="name" className="block text-[#536471] mb-3">Average Height</label>
                <div className=' flex items-center '>
                    <input type="number" placeholder="min-height" id="name" name="name" required
                    value={avg?.minH}
                    onChange={(e) => setAvg({...avg, minH: e.target.value})}
                    className="rounded-md border border-gray-200 w-full p-3 text-sm"/>
                    <span className='mx-3'>-</span>
                    <input type="number" placeholder="max-height" id="name" name="name" required
                    value={avg?.maxH}
                    onChange={(e) => setAvg({...avg, maxH: e.target.value})}
                    className="rounded-md border border-gray-200 w-full p-3 text-sm mr-3"/>
                    <FilterButton data={Measurement} setData={setMeasH} defaultValue={measH}/>
                </div>
            </div>
            <div className="mb-5 px-4">
                <label htmlFor="name" className="block text-[#536471] mb-3">Average Width</label>
                <div className=' flex items-center'>
                    <input type="number" placeholder="min-width" id="name" name="name" required
                    value={avg?.minW}
                    onChange={(e) => setAvg({...avg, minW: e.target.value})}
                    className="rounded-md border border-gray-200 w-full p-3 text-sm"/>
                    <span className='mx-3'>-</span>
                    <input type="number" placeholder="max-width" id="name" name="name" required
                    value={avg?.maxW}
                    onChange={(e) => setAvg({...avg, maxW: e.target.value})}
                    className="rounded-md border border-gray-200 w-full p-3 text-sm mr-3"/>
                    <FilterButton data={Measurement} setData={setMeasW} defaultValue={measW}/>
                </div>
            </div>

            <div className='mb-5 px-4'>
                <div className='sm:flex sm:items-center mb-5 gap-x-3'>
                    <div className='w-full flex-1 mt-3'>
                        <label htmlFor="name" className="block text-[#536471] mb-3">Foliage Color</label>
                        <input type="text" placeholder="foliage color" id="name" name="name" required
                        value={data?.foliage_color}
                        onChange={(e) => setData({...data, foliage_color: e.target.value})}
                        className="rounded-md border border-gray-200 w-full p-3 text-sm"/>
                    </div>

                    <div className='flex gap-x-3 mt-3'>
                        <div>
                            <label htmlFor="name" className="block text-[#536471] mb-3">Foliage Type</label>
                            <Dropdown list={Foliage} currentData={data?.foliage_type} setData={setData} data={data} target='foliage_type'/>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-[#536471] mb-3">Foliage Scent</label>
                            <Dropdown list={FoliageYesOrNo} currentData={data?.foliage_scent} setData={setData} data={data} target='foliage_scent'/>
                        </div>
                    </div>
                </div>

                <div className='flex flex-wrap gap-x-3'>
                    <div className='flex-1 flex-shrink-0 min-w-[130px]'>
                        <label htmlFor="name" className="block text-[#536471] mb-3">Flower Color</label>
                        <input type="text" placeholder="flower color" id="name" name="name" required
                        value={data?.flower_color}
                        onChange={(e) => setData({...data, flower_color: e.target.value})}
                        className="rounded-md border border-gray-200 w-full p-3 text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-[#536471] mb-3">Fragrant</label>
                        <Dropdown list={FoliageYesOrNo} currentData={data?.fragrant} setData={setData} data={data} target='fragrant'/>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-[#536471] mb-3">Nocturnal Flowering</label>
                        <Dropdown list={FoliageYesOrNo} currentData={data?.nocturnal_flowering} setData={setData} data={data} target='nocturnal_flowering'/>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-[#536471] mb-3">Repeat Blooming</label>
                        <Dropdown list={FoliageYesOrNo} currentData={data?.repeat_blooming} setData={setData} data={data} target='nocturnal_flowering'/>
                    </div>
                </div>

                <div className='mt-5'>
                    <label htmlFor="name" className="block text-[#536471] mb-3">Flowering Period</label>
                    <div className="grid grid-cols-2">
                        <div>
                            {FloweringPeriod?.slice(0,6).map((d, i) => (
                                <div className="flex items-center mb-4" key={i}>
                                    <input id="default-checkbox" type="checkbox"
                                    name="flowering_period" value={d?.value} onChange={(e) => handleChange(e, 'flowering_period')} 
                                    checked={data?.flowering_period?.some((sp) => {
                                        return sp.trimStart() === d?.value
                                    })}  
                                    className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                        focus:ring-emerald-500 "/>
                                    <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                </div>
                            ))}
                        </div>
                        <div>
                            {FloweringPeriod?.slice(6,12).map((d, i) => (
                                <div className="flex items-center mb-4" key={i}>
                                    <input id="default-checkbox" type="checkbox" name="flowering_period" value={d?.value} onChange={(e) => handleChange(e, 'flowering_period')} 
                                    checked={data?.flowering_period?.some((sp) => {
                                        return sp.trimStart() === d?.value
                                    })}
                                    className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                        focus:ring-emerald-500 "/>
                                    <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

const Dropdown = ({ list, currentData, setData, data, target }) => {
    const [selected, setSelected] = useState({name: currentData});
    
    useEffect(() => {
        setData({...data, [target]: selected?.name});
    },[selected])

    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative  w-[150px]">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-left 
                border border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300
                focus-visible:ring-opacity-75 text-sm">
                <span className="block truncate">{selected?.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>

                </span>
            </Listbox.Button>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Listbox.Options className="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {list.map((d, dataIdx) => (
                    <Listbox.Option
                    key={dataIdx}
                    className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                        }`
                    }
                    value={d}
                    >
                    {({ selected }) => (
                        <>
                        <span
                            className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                            {d.name}
                        </span>
                        {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </span>
                        ) : null}
                        </>
                    )}
                    </Listbox.Option>
                ))}
                </Listbox.Options>
            </Transition>
            </div>
        </Listbox>
    )
}

