import React, { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import FilterButton from '../components/FilterButton'
import ItemCard from '../components/ItemCard'


const lowestHighest = [
  { name: 'Default' },
  { name: 'Lowest Price' },
  { name: 'Highest Price' },
]

const plantsCategories = [
  { name: 'All' },
  { name: 'Homeplant' },
  { name: 'Fruit' },
  { name: 'Vegetable' },
  { name: 'Flowers'},
  { name: 'Seed' },
  { name: 'Herbs' },
  { name: 'Waterplant' },
  { name: 'Others' },
]

const dateAdded = [
  { name: 'Default' },
  { name: 'Newest' },
  { name: 'Oldest' },
]


const Marketplace = () => {
  const [lowHigh, setLowHigh] = useState('');
  const [plantCat, setPlantCat] = useState('');
  const [dateAdd, setDateAdd] = useState('');

  // useEffect(() => {
  //   console.log(lowHigh, plantCat,dateAdd)
  // },[lowHigh, plantCat, dateAdd])

  return (
    // max-w-[660px]
    <div className='block border border-gray-200 w-full min-h-screen pt-6 overflow-hidden'>
      <div className='w-full flex items-center'>
        <h1 className='font-extrabold text-lg mt-1 px-4'>Marketplace</h1>
      
        <button className='bg-green-200 text-green-800 rounded-full focus:outline-none focus:ring-4 
      focus:ring-green-300 flex items-center justify-center px-3 py-2 ml-auto mr-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className='text-md block mt-[1px]'>Sell plant</span>
        </button>
      </div>
      <div className='h-full w-full'>

        {/* button start */}
        <div className='transition-all block sticky top-0 w-full h-max px-4 py-4 mt-4 border-y border-gray-200 shadow'>
        <div className='flex items-center'>

          <div className='mr-2'>
            <p className='text-gray-500 text-sm mb-2'>Date Added</p>
            <FilterButton data={dateAdded} setData={setDateAdd}/>
          </div>

          <div className='mr-2'>
            <p className='text-gray-500 text-sm mb-2'>Price</p>
            <FilterButton data={lowestHighest} setData={setLowHigh}/>
          </div>

          <div>
            <p className='text-gray-500 text-sm mb-2'>Category</p>
            <FilterButton data={plantsCategories} setData={setPlantCat}/>
          </div>

          <div className='ml-auto '>
            <p className='text-gray-500 text-sm mb-2'>Search</p>
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              className= 'bg-white px-4 pr-7 py-2 rounded-lg w-full max-w-[280px] h-full outline-none border border-gray-300 focus:ring-2 focus:ring-green-200'
              placeholder='Search item...'
              // onChange={e => setSearchData(e.target.value)} 
            />
          </div>
        </div>
        </div>
        {/* button end*/}


        {/* items start */}
        <main className='px-4 mt-4 grid grid-cols-4'>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        <ItemCard/>
        </main>
        {/* items end */}





      </div>


    </div>
  )
}

export default Marketplace