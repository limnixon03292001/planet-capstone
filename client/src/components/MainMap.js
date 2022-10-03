import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css"
import fire from '../assets/PLANeTlogo.png';
import { Link } from 'react-router-dom';
import { getPlants } from '../api/userApi';
import { useQuery } from 'react-query';
import moment from 'moment';

export const icon = new Icon({
    iconUrl: fire,
    iconSize: [30, 30]
});
  
const MainMap = () => {

    const { data, isLoading } = useQuery('map-data', getPlants,
    {
        onSuccess: ({data}) => {
            console.log("map-data", data?.data);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });

  return (
    <div className='mb-4'>
        <div>
            <div className=' px-4 w-full flex justify-between'>
                <h1 className='font-extrabold text-lg mt-1'>My Map</h1>
                <Link to="/map/add-plant" className='bg-[#3DDAB4] text-white py-2 px-3 rounded-full focus:outline-none focus:ring-4 focus:ring-green-100'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor"
                className="w-6 h-6 inline align-top">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                <span>Add new</span>
                </Link>
            </div>
            <div className='px-4 mt-3 mb-4'>
                {/* <h1 className='font-extrabold text-lg mt-1'>About our map</h1> */}
                <p className='text-gray-500 text-sm'>Here you can find different plants in different places of malabon, with the help of our malabonian plant enthusiasts! </p>
            </div>
        </div>
        <MapContainer center={[14.6576953, 120.9510181]} zoom={12}>
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
            {data?.data?.data.map(tp => (
           
            <Marker key={tp?.mapplant_id} position={[ Number(tp?.lat), Number(tp?.lng) ]} icon={icon}>
                <Popup position={[ Number(tp?.lat), Number(tp?.lng) ]} >
                    <div className='w-[320px] max-w-full h-full'>
                        <div className='flex items-center justify-between mb-2 '> 
                            <h2 className='font-bold text-lg'>{tp?.plant_name}</h2>
                            <span className='text-xs text-gray-500'>{moment(tp.created_at).fromNow()}</span>
                        </div>
                       
                        <img src={tp?.plant_img} className="rounded object-center object-cover w-full h-[202px]"/>
                        <p className='font-bold'>Description</p>
                        <p className='text-gray-500'>{tp?.description}</p>
                        
                        <div className=''>
                            <p className='inline-block font-bold mb-[7px]'>Created By:</p>
                            <div className='flex items-center justify-start'>
                            <img src={tp?.profile} className="rounded-full h-8 w-8 object-center object-cover mr-2"/>
                            <div className='inline'>
                                <Link to={`/profile/${tp?.user_id}`} className='text-gray-900 inline font-bold underline'>{tp?.firstname} {tp?.lastname}</Link>
                                <span className='block text-[12px] text-gray-500'>{tp?.email}</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </Marker>
            ))}
        </MapContainer>
    </div>
  )
}

export default MainMap