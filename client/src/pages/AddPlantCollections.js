import { useCallback, useEffect, useState } from "react"
import FilterButton from "../components/FilterButton"
import GrowingInformation from "../components/GrowingInformation"
import GrowingPreferences from "../components/GrowingPreferences"
import logo from '../assets/PLANeTlogo.png';
import { useMutation } from "react-query";
import { addPlantCollection } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { plantsCategories } from "../data";


const growingPrefInitialState = {sunPref: [], interLight: [], soilPref: [], waterReq: [], nativeHab: []};
const AddPlantCollections = () => {

  const navigate = useNavigate();

  //plant details state data
  const [plantName, setPlantName] = useState('');
  const [desc, setDesc] = useState('');
  const [datePlanted, setDatePlanted] = useState('');
  const [plantCat, setPlantCat] = useState('');
  const [pictureUrl, setPictureUrl] = useState(null);

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


  const { mutate, isLoading } = useMutation(addPlantCollection,
    {
      onSuccess: ({ data }) => {
        console.log(data?.message);
        navigate("/my-plants");
      },
      onError: (err) => {
        const errObject = err.response.data.error;
        console.log(errObject);
      }
  })

  const handleSubmit = () => {
    let data = {
      plantDetails: {
        plantName, desc, datePlanted, plantCat, pictureUrl
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

  return (
    <div className='block border-x border-gray-200 w-full max-w-[860px] min-h-screen pb-5 mb-[60px] sm:mb-0'>
      <div className="py-3">
        <h1 className='font-extrabold text-xl mt-1 px-4 text-gray-700'>Add Plant to your Collections!</h1>
      </div>

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

          <div className="mb-5 flex items-center justify-start">
            <div className="mr-4">
              <p className='text-gray-500 mb-2 text-sm'>Category</p>
              <FilterButton data={plantsCategories} setData={setPlantCat} />
            </div>

            <div>
              <label htmlFor="name" className='text-gray-500 mb-2 block text-sm'>Date Planted</label>
              <input type="date" placeholder="plant's name" id="name" name="name" required
              value={datePlanted}
              onChange={(e) => setDatePlanted(e.target.value)}
              className="rounded-md border border-gray-200 w-full text-sm p-3"/>
            </div>
          </div>

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

          <span className='text-md block mt-[1px]'>{isLoading ? <span>Loading</span> : <span>Add Plant</span>}</span>
        </button>
      </div>
    </div>
  )
}

export default AddPlantCollections