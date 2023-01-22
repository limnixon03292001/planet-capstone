import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { addPlantMarketplace } from '../api/userApi';
import logo from '../assets/PLANeTlogo.png';
import FilterButton from "../components/FilterButton"
import GrowingInformation from '../components/GrowingInformation';
import GrowingPreferences from '../components/GrowingPreferences';
import { plantsCategories } from "../data";
import { NumericFormat } from 'react-number-format';
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

//default values
const center = {
    lat: 14.6576953,
    lng: 120.9510181,
};

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const growingPrefInitialState = {sunPref: [], interLight: [], soilPref: [], waterReq: [], nativeHab: []};

const SellPlant = () => {

    const navigate = useNavigate();

    //plant details state data
    const [plantName, setPlantName] = useState('');
    const [desc, setDesc] = useState('');
    const [datePlanted, setDatePlanted] = useState('');
    const [plantCat, setPlantCat] = useState('');
    const [pictureUrl, setPictureUrl] = useState(null);
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [position, setPosition] = useState(center);
    const mapContainerRef = useRef(null);
    const coordinates = useRef(null);
    //plant details state data

    //growing preferences
    const [gp, setGp] = useState(growingPrefInitialState);
 
    //growing information
    //i could have make this into an object
    //h-w
    const [avg, setAvg] = useState({minH: '', maxH: '', minW: '', maxW: ''});
    const [measH, setMeasH] = useState('');
    const [measW, setMeasW] = useState('');
    //foliage
    const [foliageColor, setFoliageColor] = useState('');
    const [foliageType, setFoliageType] = useState('');
    const [foliageScent, setFoliageScent] = useState('');
    //flower
    const [flowerColor, setFlowerColor] = useState('');
    const [fragrant, setFragrant] = useState('');
    const [nocturnalFlow, setNocturnalFlow] = useState('');
    const [repeatBloom, setRepeatBloom] = useState('');
    const [floweringPer, setFloweringPer] = useState({flowPer: []});

    const { mutate, isLoading } = useMutation(addPlantMarketplace,
        {
          onSuccess: ({ data }) => {
            console.log("plant added to marketpalce!",data?.message);
            navigate("/marketplace");
          },
          onError: (err) => {
            const errObject = err.response.data.error;
            console.log(errObject);
          }
    })
    
    const handleSubmit = () => {
        let data = {
            plantDetails: {
            plantName, desc, datePlanted, plantCat, pictureUrl, quantity, price, position, address, status: 'Available'
            },
            growingPref: {
            ...gp,
            },
            growingInfo: {
            avgHeight: `${avg?.minH}-${avg?.maxH} ${measH}`,
            avgWidth: `${avg?.minW}-${avg?.maxW} ${measW}`,
            foliageColor: foliageColor,
            foliageType: foliageType,
            foliageScent: foliageScent,
            flowerColor: flowerColor,
            fragrant: fragrant,
            nocturnalFlow: nocturnalFlow,
            repeatBloom: repeatBloom,
            floweringPer: floweringPer?.flowPer.join(', '),
            },
        }
        console.log("final data", data);
        mutate(data);
    }

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

    // Render map
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
    <div className='block border-x border-gray-200 w-full max-w-[860px] min-h-screen pt-6 pb-5'>
        {/* nav */}
        <div className="py-3 flex items-center">
            <div>
                <p className='text-emerald-500 px-4 text-xs'>Marketplace</p>
                <h1 className='font-extrabold text-xl mt-1 px-4 text-gray-700'>Sell a plant</h1>
            </div>
            <Link to='/marketplace/pick-plantsCollection' className='bg-green-200 text-green-800 rounded-full focus:outline-none focus:ring-4 
            focus:ring-green-300 flex items-center justify-center px-3 py-2 ml-auto mr-2'>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className='text-sm block mt-[1px]'>Pick plant in my collections</span>
            </Link>
        </div>
        {/* nav */}

        {/* Plant Details */}
        <div>
            <h1 className='font-medium text-xl mt-1 px-4 py-4 border-y border-gray-200 text-emerald-600'>Plant Details</h1>

            <div className="px-4 mt-4">
                <div className="flex items-center">
                    <div className="flex-1 mr-5 self-start">
                    <div className="mb-5">
                        <label htmlFor="name" className="block text-[#536471] mb-3 text-sm">Plant's name</label>
                        <input type="text" placeholder="plant's name" id="name" name="name" required
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                        className="rounded-md border border-gray-200 w-full p-4 text-sm"/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="description" className="block text-[#536471] mb-3 text-sm">Description</label>
                        <textarea placeholder="description" name="description" id="description" required
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        className='w-full border border-gray-200 outline-none focus:outline-none min-h-[120px] rounded-xl text-sm'/>
                    </div>
                    </div>

                    <div className="self-start">
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-[#536471] flex-1">Plant's image</label>
                        <label className='text-center bg-green-200 text-gray-900 
                        p-[5px] flex items-center justify-center rounded-full cursor-pointer 
                        focus:outline-none focus:ring-4 focus:ring-green-100' htmlFor='picture'>
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
                
                <div className=" mt-4 flex items-center justify-start">
                    <div className="flex-1">
                        <p className='text-gray-500 mb-2 text-sm'>Category</p>
                        <FilterButton data={plantsCategories} setData={setPlantCat} />
                    </div>

                    <div className="mr-4 flex-1">
                        <label htmlFor="name" className='text-gray-500 mb-2 block text-sm'>Date Planted</label>
                            <input type="date" placeholder="plant's name" id="name" name="name" required
                            value={datePlanted}
                            onChange={(e) => setDatePlanted(e.target.value)}
                            className="rounded-md border border-gray-200 w-full text-sm p-3"/>
                    </div>

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

                <div className='mt-4 mb-4'>
                    <div>
                        <label htmlFor="address" className="text-gray-500 mb-2 block text-sm">Address</label>
                        <input type="text" placeholder="address" id="address" name="address" required
                        className="rounded-md border border-gray-200 w-full p-3 text-sm" value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>

                {/* pin location */}
                <div className='z-10 relative'>
                    <label htmlFor="name" className="block text-[#536471] mb-3 ">Pin Location <span className='text-emerald-500 text-xs'>(You can pin your location where you can be located)</span></label>

                    <div className='mt-2 overflow-hidden rounded-lg relative'>
                        <div ref={mapContainerRef} className="w-full h-[440px]"/>
                        <pre ref={coordinates} className="coordinates
                        absolute z-20 top-0 m-1 text-sm bg-black/60 p-1 rounded-md text-white"/>
                    </div>
                </div>
                {/* pin location */}
            </div>
        </div>
        {/* Plant Details */}
        <GrowingPreferences gp={gp} setGp={setGp}/>
        <GrowingInformation 
            avg={avg} setAvg={setAvg}
            measH={measH} setMeasH={setMeasH}
            measW={measW} setMeasW= {setMeasW}
            foliageColor={foliageColor} setFoliageColor={setFoliageColor}
            setFoliageType={setFoliageType} setFoliageScent={setFoliageScent}
            setFlowerColor={setFlowerColor} flowerColor={flowerColor} setFragrant={setFragrant}
            setNocturnalFlow={setNocturnalFlow} setRepeatBloom={setRepeatBloom}
            setFloweringPer={setFloweringPer} floweringPer={floweringPer}
        />

      <div className="px-4">
        <button type="button" 
        onClick={handleSubmit} className='bg-green-200 text-green-800 rounded-md focus:outline-none focus:ring-4 
      focus:ring-green-300 flex items-center justify-center px-4 py-2 w-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          <span className='text-md block mt-[1px]'>{isLoading ? <span>Loading</span> : <span>Publish Plant</span>}</span>
        </button>
      </div>

    </div>
  )
}

export default SellPlant