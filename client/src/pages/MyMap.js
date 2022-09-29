import {Routes, Route} from 'react-router-dom'
import MainMap from '../components/MainMap'
import AddPlantMap from './AddPlantMap'

const MyMap = () => {
   

  return (

    <div className='block border border-gray-200 w-full max-w-[860px] min-h-screen pt-6 overflow-hidden'>

      <Routes>
        <Route path="/" element={<MainMap/>} />
        <Route path="/add-plant" element={<AddPlantMap/>} />
      </Routes>

        
    </div>
  )
}

export default MyMap