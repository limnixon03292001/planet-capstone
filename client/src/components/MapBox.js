import React, {useEffect, useRef, useState } from 'react'
import { ReactDOM } from 'react';
import { Link } from 'react-router-dom'
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { useQuery } from 'react-query';
import { getPlants } from '../api/userApi';
import { MyContext } from '../context/ContextProvider'
import moment from 'moment';

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

let map;

const MapBox = () => {
    const mapContainerRef = useRef(null);
    const menu = useRef(null);
    const { socket } = MyContext();
    const [ marks, setMarks] = useState([]);
    

    const { isLoading } = useQuery('map-data', getPlants,
    {
        onSuccess: ({data}) => {
            console.log("map-data", data?.data);
            setMarks(data?.data)
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });

    // mapbox://styles/mapbox/satellite-streets-v12 -- satellite-street view
    // mapbox://styles/djam/ckgojfjv329qq19mif613hvpa -- 3d map
    // mapbox://styles/mapbox/streets-v12 -- streets

    useEffect(() => {
        socket?.on("addedDataMap", ({ data }) => {
            setMarks([data, ...marks])  
            console.log("data socket x", marks);
        });
    },[socket])
        
    useEffect(() => {
        map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [120.9658, 14.6681],
            zoom: 13,
          
          });
            //Map controls
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(new mapboxgl.GeolocateControl(), "top-right");
        map.addControl(new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            interactive: false,
            controls: {
                instructions: true,
            }
 
        }), 'top-left');

        //Switch Layers Logic
        const inputs = menu?.current?.childNodes;
        for (const input of inputs) {
            
            input.onclick = (layer) => {
                console.log("x",layer);
                const layerId = layer.target.id;
                map.setStyle(layerId);
            };
            }
    
        //Clean up function
        return () => map.remove();
    }, [])

    useEffect(() => {
      
        //List of tagged plants
        marks.forEach((location) => {
            new mapboxgl.Marker({ color: 'green'})
            .setLngLat([Number(location?.lng), Number(location?.lat)])
            .setPopup(new mapboxgl.Popup({ offset: 30 })
            .setHTML(
              `
                <div class="card-map">
                    <div>
                        <div class='contributor-wrapper'>
                            <img src=${location?.profile} class="profile-img"/>
                            <div className='inline'>
                               <a href=/profile/${location?.user_id} class='name'>${location?.firstname} ${location?.lastname}</a>
                                <span class='email'>${moment(location?.created_at).fromNow()}</span>
                            </div>
                            
                        </div> 
                    </div>
                    <div>
                        <img src=${location?.plant_img ?? null} alt="plant_img" class="pop-img"/>
                        <h4 class="pop-title">${location?.plant_name ?? null}</h4>
                        <p class="pop-descs">${location?.description ?? null}</p>
                    </div>
                </div>
              `
            ))
            .addTo(map);
        });

    },[marks]);

  return (
    <div>
    
        <div className="mapWrapper relative" ref={mapContainerRef}>
            {/* Add Button */}
            <Link to="/map/add-plant" className='bg-[#3DDAB4] text-white p-1 rounded-full
                focus:outline-none focus:ring-4 focus:ring-green-100 flex items-center absolute right-2 top-36 z-20'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-6 h-6 inline align-top">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                {/* <span className='text-baseline'>Add new</span> */}
            </Link>

            {/* Switch Layers */}
            <div ref={menu} className='flex items-center justify-center gap-3 p-2 w-fit bg-white absolute z-20 bottom-0 
            right-0 rounded-md text-md'>
                
                <div>
                <input type="radio" name="rtoggle" id="mapbox://styles/mapbox/streets-v12" readOnly={true} value="Streets" checked="checked"/>
                <label htmlFor="mapbox://styles/mapbox/streets-v12" className='ml-1'>Streets</label>
                </div>

                <div>
                <input type="radio" name="rtoggle" id="mapbox://styles/mapbox/satellite-streets-v12"readOnly={true} value="Satellite"/>
                <label htmlFor="mapbox://styles/mapbox/satellite-streets-v12" className='ml-1'>Satellite</label>
                </div>

                <div>
                <input type="radio" name="rtoggle" id="mapbox://styles/djam/ckgojfjv329qq19mif613hvpa" readOnly={true} value="3D map"/>
                <label htmlFor="mapbox://styles/djam/ckgojfjv329qq19mif613hvpa" className='ml-1'>3D map</label>
                </div>

            </div>  
        </div> 
            
    </div>
  )
}

export default MapBox