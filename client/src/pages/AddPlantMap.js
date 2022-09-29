import React from 'react'
import logo from '../assets/PLANeTlogo.png';


const AddPlantMap = () => {
  return (
    <div className='px-4 w-full h-full'>

      <div className='mb-7 flex items-center justify-between'>
        <h1 className='font-bold text-xl inline'>Add New Plant</h1>
        <button className=' bg-[#3DDAB4] text-white py-2  rounded-full focus:outline-none focus:ring-4 
      focus:ring-green-100 inline-block px-4'>
        < span>Submit</span>
        </button>
      </div>

      <form className='flex'>
        <div className='flex-1'>
          <div className="mb-5">
              <label htmlFor="name" className="block text-[#536471] mb-3">Plant's name</label>
              <input type="text" placeholder="plant's name" id="name" name="name"
              // value={formik.values.email}
              // onChange={formik.handleChange}
              className="rounded-md border border-gray-200 w-full p-4"/>
            </div>
            <div>
              <label htmlFor="description" className="block text-[#536471] mb-3">Description</label>
              <textarea placeholder="description" name="description" id="description"
              // onChange={(e) => setDescription(e.target.value)}
              // value={description}
              className='w-full border border-gray-200 outline-none focus:outline-none min-h-[120px] rounded-xl'/>
            </div>
            <div className='mt-2 flex items-center justify-center'>
              <button className=' mr-2 bg-green-200 text-gray-900 py-2 px-3 w-full rounded-lg  focus:outline-none focus:ring-4 focus:ring-green-100'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-6 h-6 inline align-top mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Pin Location</span>
              </button>
              <button className=' bg-green-200 text-gray-900 py-2 px-3 w-full rounded-lg  focus:outline-none focus:ring-4 focus:ring-green-100'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-6 h-6 inline align-top mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Find my Location</span>
              </button>
            </div>
        </div>

        <div className='ml-5'>
          <div>
            <label className="block text-[#536471] mb-3">Plant's image</label>
            <img src={logo} alt="plant img" className='w-[237px] h-full object-center object-cover rounded-xl border border-gray-200'/>
          </div>

          <button className='mt-3 bg-green-200 text-gray-900 py-2 px-3 w-full rounded-lg  focus:outline-none focus:ring-4 focus:ring-green-100'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6 inline align-top">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            <span>Add Image</span>
          </button>

        </div>
      </form>

     
    </div>
  )
}

export default AddPlantMap