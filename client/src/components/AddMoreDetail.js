import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import DraggableMarker from "../components/DraggableMarker";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { MyContext } from '../context/ContextProvider';

const center = {
    lat: 14.6576953,
    lng: 120.9510181,
}

const AddMoreDetail = () => {

    const { selectedPlant } = MyContext();
    const [position, setPosition] = useState(center);
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        console.log("selected", selectedPlant);
    },[ selectedPlant]);

    const handleSubmit = () => {
        
    }

  return (
    <div className='block border-x border-gray-200 w-full max-w-[860px] min-h-screen pt-6 pb-5'>
        <p className='px-4 font-medium mb-2 text-gray-700 tracking-tight'>Selected Plant:</p>
        <div className='px-4 flex items-center mb-8'>
            <img src={selectedPlant?.plant_img} alt="plant_img" className='h-10 w-10 rounded-lg object-center object-cover mr-2'/>
            <div>
                <h1 className='font-extrabold text-xl text-gray-700'>{selectedPlant?.plant_name}</h1>
                <p className='text-xs text-emerald-500'>{selectedPlant?.category}</p>
            </div>
        </div>

        <div className="px-4 mt-4 flex items-center justify-start">
            <div className="mr-4 flex-1">
                <label htmlFor="quantity" className="text-gray-500 mb-2 block text-sm">Quantity Available</label>
                <input type="number" placeholder="quantity" id="quantity" name="quantity" required
                className="rounded-md border border-gray-200 w-full p-3 text-sm" value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}/>
            </div>

            <div className='flex-1'>
                <label htmlFor="price" className="text-gray-500 mb-2 block text-sm">Price</label>
                <NumericFormat value={price} displayType={'input'} thousandSeparator={true} prefix={'₱ '} placeholder="price"
                className="rounded-md border border-gray-200 w-full p-3 text-sm"
                onChange={(e) => setPrice(e.target.value)} />
            </div>
        </div>

        <div className='px-4 mt-4 mb-4'>
            <div>
                <label htmlFor="address" className="text-gray-500 mb-2 block text-sm">Address</label>
                <input type="text" placeholder="address" id="address" name="address" required
                className="rounded-md border border-gray-200 w-full p-3 text-sm" value={address}
                onChange={(e) => setAddress(e.target.value)} />
            </div>
        </div>

        {/* pin location */}
        <div className='px-4 z-10 relative'>
            <label htmlFor="name" className="block text-[#536471] mb-3 ">Pin Location <span className='text-emerald-500 text-xs'>(You can pin your location where you can be located)</span></label>

            <div className='mt-2 overflow-hidden rounded-lg'>
                <MapContainer center={position} zoom={13} style={{height:'370px'}}>
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
                    <DraggableMarker position={position} setPosition={setPosition}/>
                </MapContainer>
            </div>
        </div>
        {/* pin location */}

        <div className="px-4 mt-4">
            <button type="button" 
            onClick={handleSubmit} className='bg-green-200 text-green-800 rounded-md focus:outline-none focus:ring-4 
            focus:ring-green-300 flex items-center justify-center px-4 py-2 w-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            {/* <span className='text-md block mt-[1px]'>{isLoading ? <span>Loading</span> : <span>Publish Plant</span>}</span> */}
            <span className='text-md block mt-[1px]'>Publish Plant</span>
            </button>
        </div>
   
    </div>
  )
}

export default AddMoreDetail