import FilterButton from "../components/FilterButton"

const plantsCategories = [
  { name: 'Homeplant' },
  { name: 'Fruit' },
  { name: 'Vegetable' },
  { name: 'Flowers'},
  { name: 'Seed' },
  { name: 'Herbs' },
  { name: 'Waterplant' },
  { name: 'Others' },
]

const AddPlantCollections = () => {


  return (
    <div className='block border border-gray-200 w-full max-w-[860px] min-h-screen pt-6 overflow-hidden'>
      <div className="py-4">
        <h1 className='font-extrabold text-xl mt-1 px-4 text-gray-700'>Add Plant to your Collections!</h1>
      </div>

      <div>
        <h1 className='font-medium text-xl mt-1 px-4 py-4 border-y border-gray-200 text-emerald-600'>Plant Details</h1>

        <div className="px-4 mt-4">

          <div className="mb-5">
            <label htmlFor="name" className="block text-[#536471] mb-3">Plant's name</label>
            <input type="text" placeholder="plant's name" id="name" name="name" required
            // value={plantName}
            // onChange={(e) => setPlantName(e.target.value)}
            className="rounded-md border border-gray-200 w-full p-4"/>
          </div>

          <div className="mb-5">
            <label htmlFor="description" className="block text-[#536471] mb-3">Description</label>
            <textarea placeholder="description" name="description" id="description" required
            // onChange={(e) => setDescription(e.target.value)}
            // value={description}
            className='w-full border border-gray-200 outline-none focus:outline-none min-h-[120px] rounded-xl'/>
          </div>

          <div className="mb-5 flex items-center justify-start">
            <div className="mr-4">
              <p className='text-gray-500 mb-2'>Category</p>
              <FilterButton data={plantsCategories} />
            </div>

            <div>
              <label htmlFor="name" className='text-gray-500 mb-2 block'>Date Planted</label>
              <input type="date" placeholder="plant's name" id="name" name="name" required
              // value={plantName}
              // onChange={(e) => setPlantName(e.target.value)}
              className="rounded-md border border-gray-200 w-full text-sm p-3"/>
            </div>
          </div>

        </div>
      </div>

      <div className='mt-8'>

        <h1 className='font-medium text-xl mb-4 px-4 py-4 border-y border-gray-200 text-emerald-600'>Growing Preferences</h1>

        {/* Sun Preferences */}
        <div className="px-4 mb-4">
          <label htmlFor="name" className='text-gray-500 mb-4 block'>Sun Preferences</label>

          <div className="grid grid-cols-2">
            <div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Full Sun</label>
            </div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Part Sun</label>
            </div>
            </div>
            <div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Part Shade</label>
            </div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Shade</label>
            </div>
            </div>
          </div>
        </div>
        {/* Sun Preferences */}

        {/* Interior Light */}
        <div className="px-4 mb-4">
          <label htmlFor="name" className='text-gray-500 mb-4 block'>Interior Light</label>

          <div className="grid grid-cols-2">
            <div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Direct Sun</label>
            </div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Bright</label>
            </div>
            </div>
            <div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Medium</label>
            </div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Low</label>
            </div>
            </div>
          </div>
        </div>
        {/* Interior Light */}

        {/* Soil Preferences */}
        <div className="px-4 mb-4 ">
          <label htmlFor="name" className='text-gray-500 mb-4 block'>Soil Preferences</label>

          <div className="grid grid-cols-2">
            <div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Fertile</label>
            </div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Moist</label>
            </div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Wet</label>
            </div>
            </div>
            <div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Dry</label>
            </div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Well-Drained</label>
            </div>
            </div>
          </div>
        </div>
        {/* Soil Preferences */}

        {/* Water Requirements */}
        <div className="px-4 mb-4">
          <label htmlFor="name" className='text-gray-500 mb-4 block'>Water Requirements</label>

          <div className="grid grid-cols-2">
            <div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Low</label>
            </div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">Medium</label>
            </div>
            </div>
            <div>
            <div class="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" 
              className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                focus:ring-emerald-500 "/>
              <label for="default-checkbox" className="ml-2 text-sm">High</label>
            </div>
            </div>
          </div>
        </div>
        {/* Water Requirements */}

      </div>

      <div className='mt-8'>
        <h1 className='font-medium text-xl mb-4 px-4 py-4 border-y border-gray-200 text-emerald-600'>Growing Information</h1>

        <div className="mb-5 px-4">
          <label htmlFor="name" className="block text-[#536471] mb-3">Average Height</label>
          <input type="text" placeholder="width" id="name" name="name" required
          // value={plantName}
          // onChange={(e) => setPlantName(e.target.value)}
          className="rounded-md border border-gray-200 w-full p-4"/>
        </div>

        <div className="mb-5 px-4">
          <label htmlFor="name" className="block text-[#536471] mb-3">Average Height</label>
          <input type="text" placeholder="width" id="name" name="name" required
          // value={plantName}
          // onChange={(e) => setPlantName(e.target.value)}
          className="rounded-md border border-gray-200 w-full p-4"/>
        </div>
      
      </div>


    </div>
  )
}

export default AddPlantCollections