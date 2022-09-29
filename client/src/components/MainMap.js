import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css"
import fire from '../assets/PLANeTlogo.png';
import fake from '../fake.json';
import { Link } from 'react-router-dom';

export const icon = new Icon({
    iconUrl: fire,
    iconSize: [30, 30]
});
  
const MainMap = () => {
  return (
    <div>
        <div className='mb-4 px-4 w-full flex justify-between'>
            <h1 className='font-extrabold text-lg mt-1'>My Map</h1>
            <Link to="/map/add-plant" className='bg-[#3DDAB4] text-white py-2 px-3 rounded-full focus:outline-none focus:ring-4 focus:ring-green-100'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor"
            className="w-6 h-6 inline align-top">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            <span>Add new</span>
            </Link>
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
            {fake.taggedPlants.map(tp => (
            <Marker key={tp.taggedId}  position={[ tp.longitude, tp.latitude ]} icon={icon}>
                <Popup position={[tp.longitude, tp.latitude]} >
                    <div className='w-[320px] max-w-full h-full'>
                        <h2 className='font-bold text-lg mb-2'>{tp.plantName}</h2>
                        <img src={tp.plantImg} className="rounded"/>
                        <p className='font-bold'>Description</p>
                        <p className='text-gray-500'>{tp.description}</p>
                        
                        <div className=''>
                            <b>Created By:</b>
                            <div className='flex items-center justify-start'>
                            <img src={tp.creatorPic} className="rounded-full h-6 w-6 object-center object-cover mr-2"/>
                            <p className='inline'>{tp.createdBy}</p>
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