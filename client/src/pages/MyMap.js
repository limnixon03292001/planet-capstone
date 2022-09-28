import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css"
import fake from '../fake.json';
import fire from '../assets/PLANeTlogo.png'

export const icon = new Icon({
    iconUrl: fire,
    iconSize: [30, 30]
  });

const MyMap = () => {
   

  return (

    <div className='block border border-gray-200 w-full max-w-[860px] min-h-screen pt-6 overflow-hidden'>
        <h1 className='font-extrabold text-lg mt-1 mb-4 px-4'>My Map</h1>

        {/* map start */}
        {/* style={{border: '2px solid green', height: '760px', overflow: 'hidden'}} */}
        <MapContainer center={[14.6576953, 120.9510181]} zoom={12}>
        <TileLayer
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {fake.taggedPlants.map(tp => (
        <Marker key={tp.taggedId}  position={[ tp.longitude, tp.latitude ]} icon={icon}>
            <Popup position={[tp.longitude, tp.latitude]} >
                <div className='w-[320px] max-w-full h-full'>
                    <h2 className='font-bold text-lg mb-2'>{tp.plantName}</h2>
                    <img src={tp.plantImg} className="rounded"/>
                    <p className='font-bold mb-[1px]'>Description</p>
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


         {/* map start */}
    </div>
  )
}

export default MyMap