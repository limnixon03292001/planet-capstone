import { Routes, Route } from 'react-router-dom'
import MapBox from '../components/MapBox'
import AddPlantMap from './AddPlantMap'

const MyMap = () => {
   

  return (

    <div className='block border-x border-gray-200 w-full max-w-full min-h-screen overflow-hidden'>

      <Routes>
        {/* <Route path="/" element={<MainMap/>} /> */}
        <Route path="/" element={<MapBox/>} />
        <Route path="/add-plant" element={<AddPlantMap/>} />
      </Routes>

    
    </div>
  )
}

export default MyMap