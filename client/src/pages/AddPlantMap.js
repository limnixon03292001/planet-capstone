
import logo from '../assets/PLANeTlogo.png';
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from 'react-query';
import { addPlant } from "../api/userApi";
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MyContext } from '../context/ContextProvider'

const center = {
  lat: 14.6576953,
  lng: 120.9510181,
}

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const AddPlantMap = () => {

  const [position, setPosition] = useState(center);
  const [plantName, setPlantName] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState(null);
  const mapContainerRef = useRef(null);
  const coordinates = useRef(null);
  const { socket } = MyContext();

  const { mutate, isLoading } = useMutation(addPlant,
  {
    onSuccess: ({ data }) => {
      // console.log("added plant successfully", data);
      setPlantName('');
      setDescription('');
      setPictureUrl(null);
      socket?.emit("addDataMap", {data: data?.data});
    },
    onError: (err) => {
      const errObject = err.response.data.error;
      console.log(errObject)
    }
  });

  const handleSubmit = () => {
    mutate({
      plantName: plantName,
      description: description,
      pictureUrl: pictureUrl,
      position: position
    });
  };

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
              setPictureUrl(reader.result);
          };
      } else {
          setPictureUrl('');
      }
  }, [pictureUrl]);

  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [position?.lng, position?.lat],
      zoom: 17
    });

    const marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([position?.lng, position?.lat])
      .addTo(map);
       
      function onDragEnd() {
        const lngLat = marker.getLngLat();
        coordinates.current.style.display = 'block';
        coordinates.current.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
        setPosition({lng: lngLat?.lng, lat: lngLat?.lat});
      }
       
      marker.on('dragend', onDragEnd);
      console.log("fires")

      //Clean up function
      return () => map.remove();
  },[]);
  
  return (
    <div className='px-4 pt-4 b-4 w-full h-full'>

      <div className='mb-7 flex items-center justify-between'>
        <h1 className='font-bold text-xl inline'>Add New Plant</h1>
        <button onClick={handleSubmit} className=' bg-[#3DDAB4] text-white py-2  rounded-full focus:outline-none focus:ring-4 
      focus:ring-green-100 inline-block px-4'>
        < span>Submit</span>
        </button>
      </div>

      <form className='flex'>
        <div className='flex-1'>
            <div className="mb-5">
              <label htmlFor="name" className="block text-[#536471] mb-3">Plant's name</label>
              <input type="text" placeholder="plant's name" id="name" name="name" required
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              className="rounded-md border border-gray-200 w-full p-4"/>
            </div>
            <div>
              <label htmlFor="description" className="block text-[#536471] mb-3">Description</label>
              <textarea placeholder="description" name="description" id="description" required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className='w-full border border-gray-200 outline-none focus:outline-none min-h-[120px] rounded-xl'/>
            </div>
            <div>
              <div className='mt-2 flex items-center justify-between'>
                <h1 className="block text-[#536471]">Pin Location</h1>
                {/* <button onClick={getLocation} type="button" className=' bg-green-200 text-gray-900 py-2 px-3 rounded-lg  focus:outline-none focus:ring-4 focus:ring-green-100'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="w-6 h-6 inline align-top">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </button> */}
              </div>
            </div>
        </div>

        <div className='ml-5'>
          <div>
            <div className="flex items-end justify-between mb-3">
              <label className="block text-[#536471] flex-1">Plant's image</label>

              <label className='mt-3 text-center bg-green-200 text-gray-900 
              p-[5px] flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-100' htmlFor='picture'>
                <input hidden accept="image/png, image/jpg, image/jpeg" type="file" name="picture" id="picture" onChange={handleChangeImage} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-5 h-5 inline align-middle">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </label>

            </div>
              
            <div className='mt-2 relative w-full h-full'>
              {pictureUrl && 
                <button onClick={() => setPictureUrl(null)} className='p-1 bg-gray-800 bg-opacity-80 rounded-full absolute m-2 focus:outline-none focus:ring-2 focus:ring-gray-300'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              }
              <img src={pictureUrl ?? logo} alt="plant img" className='w-[237px] h-full object-center object-cover rounded-xl border border-gray-200'/>
            </div>
          </div>
          
          

        </div>
      </form>

      <div className='mt-2 overflow-hidden rounded-lg mb-3 relative'>
        <div ref={mapContainerRef} className="w-full h-[440px]"/>
        <pre ref={coordinates} className="coordinates
        absolute z-20 top-0 m-1 text-sm bg-black/60 p-1 rounded-md text-white"/>
      </div>
     
    </div>
  )
}

export default AddPlantMap;

