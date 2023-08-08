import React, {useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { useQuery } from 'react-query';
import { getPlants } from '../api/userApi';
import { MyContext } from '../context/ContextProvider'
import moment from 'moment';
import ButtonLoader from './ButtonLoader';



let map;

const g = {
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    },
    "features": [
    
            {
                "mapplant_id": 1,
                "user_id": 5,
                "plant_name": "Test1",
                "description": "test test",
                "plant_img": "https://res.cloudinary.com/future-secure/image/upload/v1664510257/q82dpiqww5nyvmycfcxj.jpg",
                "lat": "14.65785468326629",
                "lng": "120.95046339859584",
                "geometry": {
                    "coordinates": [120.95046339859584, 14.65785468326629]
                },
                "created_at": "2022-09-30T03:57:54.771Z",
                "firstname": "Maki",
                "lastname": "Zenin",
                "profile": "https://res.cloudinary.com/securing-future/image/upload/v1634816724/sysyxterhsd0vchbfxee.jpg",
                "email": "maki@gmail.com"
            },
            {
                "mapplant_id": 2,
                "user_id": 5,
                "plant_name": "Cherry flower",
                "description": "cherry flower found in malabon",
                "plant_img": "https://res.cloudinary.com/future-secure/image/upload/v1664510341/vt0moo2hxutv2gtcx99q.jpg",
                "lat": "14.658332146966064",
                "lng": "120.95159232479988",
                "geometry": {
                    "coordinates": [120.95159232479988, 14.658332146966064]
                },
                "created_at": "2022-09-30T03:59:18.408Z",
                "firstname": "Maki",
                "lastname": "Zenin",
                "profile": "https://res.cloudinary.com/securing-future/image/upload/v1634816724/sysyxterhsd0vchbfxee.jpg",
                "email": "maki@gmail.com"
            },
            {
                "mapplant_id": 3,
                "user_id": 1,
                "plant_name": "Sunflower",
                "description": "Our sunflower come visit us here!!",
                "plant_img": "https://res.cloudinary.com/future-secure/image/upload/v1664512306/xdvkerlbl9yljo4nt3n6.jpg",
                "lat": "14.672751579192331",
                "lng": "120.95207764115742",
                "geometry": {
                    "coordinates": [120.95207764115742, 14.672751579192331]
                },
                "created_at": "2022-09-30T04:32:03.136Z",
                "firstname": "Nixon",
                "lastname": "Lim",
                "profile": "https://res.cloudinary.com/future-secure/image/upload/v1663556166/jj5qcqop7gabpdcblsev.jpg",
                "email": "limnixon@gmail.com"
            },
            {
                "mapplant_id": 5,
                "user_id": 1,
                "plant_name": "Lilies",
                "description": "Lilium is a genus of herbaceous flowering plants growing from bulbs, all with large prominent flowers. They are the true lilies. Lilies are a group of flowering plants which are important in culture and literature in much of the world.",
                "plant_img": "https://res.cloudinary.com/future-secure/image/upload/v1665136194/lo1nvpibhzk4fonf3nfp.jpg",
                "lat": "14.670743243009074",
                "lng": "120.95595359802248",
                "geometry": {
                    "coordinates": [120.95595359802248, 14.670743243009074]
                },
                "created_at": "2022-10-07T09:50:13.596Z",
                "firstname": "Nixon",
                "lastname": "Lim",
                "profile": "https://res.cloudinary.com/future-secure/image/upload/v1663556166/jj5qcqop7gabpdcblsev.jpg",
                "email": "limnixon@gmail.com"
            },
            {
                "mapplant_id": 8,
                "user_id": 6,
                "plant_name": "Sampaguita test",
                "description": "Could not load image because of Cannot read properties of undefined (reading 'send'). Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported",
                "plant_img": "https://res.cloudinary.com/future-secure/image/upload/v1670748678/gdirgkzcd8hvxwgutlef.jpg",
                "lat": "14.659346753872462",
                "lng": "120.94771288855064",
                "price": "129",
                "geometry": {
                    "coordinates": [120.94771288855064, 14.659346753872462]
                },
                "created_at": "2022-12-11T08:51:18.430Z",
                "firstname": "Nobara ",
                "lastname": "Kugisaki",
                "profile": "https://res.cloudinary.com/securing-future/image/upload/v1634784867/lrbkmns3lttmmtdn22y4.jpg",
                "email": "nobara@gmail.com"
            },
            {
                "mapplant_id": 10,
                "user_id": 6,
                "plant_name": "Plantito plantita",
                "description": "f true , force a compact attribution that shows the full attribution on mouse hover. If false , force the full attribution control. The default is a responsive attribution that collapses when the map is less than 640 pixels wide. Attribution should not be collapsed if it can comfortably fit on the map. compact should only be used to modify default attribution when map size makes it impossible to fit default attribution and when the automatic compact resizing for default settings are not sufficient .",
                "plant_img": "https://res.cloudinary.com/future-secure/image/upload/v1675422347/p3gzt2ro5zocmgumlmpg.jpg",
                "lat": "14.6669888988974",
                "lng": "120.95492391225838",
                "geometry": {
                    "coordinates": [120.95492391225838, 14.6669888988974]
                },
                "created_at": "2023-02-03T11:05:49.682Z",
                "firstname": "Nobara ",
                "lastname": "Kugisaki",
                "profile": "https://res.cloudinary.com/securing-future/image/upload/v1634784867/lrbkmns3lttmmtdn22y4.jpg",
                "email": "nobara@gmail.com"
            },
           
    ]
}

const MapBox = () => {
    const mapContainerRef = useRef(null);
    const marker = useRef(null);
    const menu = useRef(null);
    const { socket } = MyContext();
    const [ marks, setMarks] = useState([]);
    

    const { isLoading } = useQuery('map-data', getPlants,
    {
        onSuccess: ({data}) => 
        {
            // setMarks({ crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } }, features: data?.data});
            setMarks(data?.data);
            console.log(marks)
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

        mapboxgl.accessToken =
  "pk.eyJ1IjoiZG9uYWxkdWNrMTIiLCJhIjoiY2w5MmRvY3NrMDZjNjN1bmYwaHBpYjducSJ9.xxQ3KDrlknCKa9pgj9k88A";
        map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v11',
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
            new mapboxgl.Marker( location?.price ? { color: 'yellow' } : { color: 'green' })
            .setLngLat([Number(location?.lng), Number(location?.lat)])
            .setPopup(new mapboxgl.Popup({ offset: 30 })
            .setHTML(
              `
                <div class="card-map">
                    <div>
                        <div class='contributor-wrapper'>
                            <img src=${location?.profile ?? null} class="profile-img"/>
                            <div>
                               <a href=/profile/${location?.user_id} class='name'>${location?.firstname ?? null} ${location?.lastname ?? null}</a>
                                <span class='email'>added ${moment(location?.created_at).fromNow()}</span>
                            </div>
                        </div> 
                    </div>
                    <div>
                        <img src=${location?.plant_img ?? null} alt="plant_img" class="pop-img"/>
                       ${location?.price ? `<h4 class="pop-title">${location?.price}</h4>` : ''}
                        <h4 class="pop-title">${location?.plant_name ?? null}</h4>
                        <p class="pop-descs">${location?.description ?? null}</p>
                    </div>
                </div>
              `
            )).addTo(map);
        });

        // map.on('load', () => {
        //     console.log("x", JSON.stringify(g));
        //     // Add a new source from our GeoJSON data and
        //     // set the 'cluster' option to true. GL-JS will
        //     // add the point_count property to your source data.
        //     map.addSource('earth', {
        //         type: 'geojson',
        //         // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        //         // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        //         data: g,
        //         cluster: true,
        //         clusterMaxZoom: 14, // Max zoom to cluster points on
        //         clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        //     });
    
        //     map.addLayer({
        //         id: 'clusters',
        //         type: 'circle',
        //         source: 'earth',
        //         filter: ['has', 'point_count'],
        //         paint: {
        //             // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        //             // with three steps to implement three types of circles:
        //             //   * Blue, 20px circles when point count is less than 100
        //             //   * Yellow, 30px circles when point count is between 100 and 750
        //             //   * Pink, 40px circles when point count is greater than or equal to 750
        //             'circle-color': [
        //                 'step',
        //                 ['get', 'point_count'],
        //                 '#51bbd6',
        //                 100,
        //                 '#f1f075',
        //                 750,
        //                 '#f28cb1'
        //             ],
        //             'circle-radius': [
        //                 'step',
        //                 ['get', 'point_count'],
        //                 20,
        //                 100,
        //                 30,
        //                 750,
        //                 40
        //             ]
        //         }
        //     });
            
        
        //     map.addLayer({
        //         id: 'cluster-count',
        //         type: 'symbol',
        //         source: 'earth',
        //         filter: ['has', 'point_count'],
        //         layout: {
        //             'text-field': ['get', 'point_count_abbreviated'],
        //             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        //             'text-size': 12
        //         }
        //     });
    
        //     map.addLayer({
        //         id: 'unclustered-point',
        //         type: 'circle',
        //         source: 'earth',
        //         filter: ['!', ['has', 'point_count']],
        //         paint: {
        //             'circle-color':   [
        //                 'match',
        //                 ['get', 'firstname'],
        //                 'Maki',
        //                 'green',
        //                 /* default */ 'yellow'
        //               ],
        //             'circle-radius': 10,
        //             'circle-stroke-width': 2,
        //             'circle-stroke-color': '#fff'
        //         }
        //     });

        
    
        //     // inspect a cluster on click
        //     map.on('click', 'clusters', (e) => {
        //         const features = map.queryRenderedFeatures(e.point, {
        //             layers: ['clusters']
        //         });
        //         const clusterId = features[0].properties.cluster_id;
        //         map.getSource('earth').getClusterExpansionZoom(
        //             clusterId,
        //             (err, zoom) => {
        //                 if (err) return;
    
        //                 map.easeTo({
        //                     center: features[0].geometry.coordinates,
        //                     zoom: zoom
        //                 });
        //             }
        //         );
        //     });
    
        //     // When a click event occurs on a feature in
        //     // the unclustered-point layer, open a popup at
        //     // the location of the feature, with
        //     // description HTML from its properties.
        //     map.on('click', 'unclustered-point', (e) => {
        //         const coordinates = e.features[0].geometry.coordinates.slice();
        //         const mag = e.features[0].properties.mag;
        //         const tsunami =
        //             e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
    
        //         // Ensure that if the map is zoomed out such that
        //         // multiple copies of the feature are visible, the
        //         // popup appears over the copy being pointed to.
        //         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //         }
    
        //         new mapboxgl.Popup()
        //             .setLngLat(coordinates)
        //             .setHTML(
        //                 `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
        //             )
        //             .addTo(map);
        //     });
    
        //     map.on('mouseenter', 'clusters', () => {
        //         map.getCanvas().style.cursor = 'pointer';
        //     });
        //     map.on('mouseleave', 'clusters', () => {
        //         map.getCanvas().style.cursor = '';
        //     });
        // });
    },[marks]);

  return (
    <div className='relative w-full h-full'>
        {/* Loader */}
        {isLoading && 
        <div className='absolute inset-0 w-full h-full bg-black opacity-75 z-30 flex flex-col
        items-center justify-center text-white'>
            <ButtonLoader/>
            <p className='mt-1'>Fetching map data...</p>
        </div>
        }
        {/* Loader */}
        
        {/* Map */}
        <div className="mapWrapper relative" ref={mapContainerRef}>

            {/* Add Button */}
            <Link to="/add-plant" className='bg-[#3DDAB4] text-white p-1 rounded-full
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
        {/* Map */}
    </div>
  )
}

export default MapBox