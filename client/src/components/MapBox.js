import React, {useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { useQuery } from 'react-query';
import { getPlants } from '../api/userApi';
import fire from '../assets/PLANeTlogo.png';

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const MapBox = () => {
    const mapContainerRef = useRef(null);
   

    const { data, isLoading } = useQuery('map-data', getPlants,
    {
        onSuccess: ({data}) => {
            // console.log("map-data", data?.data);
        },
        onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
        }
    });
    // mapbox://styles/mapbox/satellite-streets-v12

    useEffect(() => {

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [120.9658, 14.6681],
          zoom: 13,

    });
    
    
        data?.data?.data.forEach((location) => {
            new mapboxgl.Marker({ color: 'green'})
            .setLngLat([Number(location?.lng), Number(location?.lat)])
            .setPopup(new mapboxgl.Popup({ offset: 30 })
            .setHTML(
              `
              <div class="card-map">
                <h4 class="pop-title">${location?.plant_name ?? null}</h4>
                <img src=${location?.plant_img ?? null} alt="plant_img" class="pop-img"/>
                <h4 class="pop-desc">Description</h4>
                <p class="pop-descs">${location?.description ?? null}</p>
                <div className=''>
                    <p class='contributor'>Contributor:</p>
                    <div class='contributor-wrapper'>
                        <img src=${location?.profile} class="profile-img"/>
                        <div className='inline'>
                            <div class='name'>${location?.firstname} ${location?.lastname}</div>
                            <span class='email'>${location?.email}</span>
                        </div>
                    </div>
                 </div>
              </div>
              `
            ))
            .addTo(map);
        });
    
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(new mapboxgl.GeolocateControl(), "top-right");
        map.addControl(new MapboxDirections({
            accessToken: mapboxgl.accessToken,
        }), 'top-left');
    
    
        return () => map.remove();
    },[data?.data?.data]);

  return (
    <div>

        <div className="mapWrapper relative" ref={mapContainerRef} >
            <Link to="/map/add-plant" className='bg-[#3DDAB4] text-white p-1 rounded-full
             focus:outline-none focus:ring-4 focus:ring-green-100 flex items-center absolute right-2 top-36 z-20'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-6 h-6 inline align-top">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                {/* <span className='text-baseline'>Add new</span> */}
            </Link>
        </div>
    </div>
  )
}

export default MapBox