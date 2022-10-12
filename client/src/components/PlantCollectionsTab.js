import React from 'react'
import { Link } from 'react-router-dom'

const PlantCollectionsTab = () => {
  return (
    <div className='px-7 py-4 border-b border-gray-200'>
        <nav className='flex items-center'>
        <h1 className='text-xl font-bold text-gray-700'>
            <span className='text-gray-500 text-xs font-light block'>Total plants</span>
            0 plants
        </h1>

      
        {/* <AddPlantCollections/> */}
        
        <Link to="/add-plantCollections" className='inline-block ml-auto'>
          <button 
              type='button'
              className='bg-green-200 text-green-800 rounded-full focus:outline-none focus:ring-4 
            focus:ring-green-300 flex items-center justify-center p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  self-center">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
          </button>
        </Link>

        </nav>
    </div>
  )
}

export default PlantCollectionsTab