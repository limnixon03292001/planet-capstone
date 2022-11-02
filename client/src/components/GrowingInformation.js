import React, { Fragment, useEffect, useState } from 'react'
import FilterButton from './FilterButton'
import { Listbox, Transition } from '@headlessui/react'
import { Foliage, FoliageYesOrNo, Measurement, FloweringPeriod } from '../data'


const GrowingInformation = ({
    avg, setAvg,
    measH, setMeasH,
    measW, setMeasW,
    foliageColor, setFoliageColor,
    setFoliageType, setFoliageScent,
    setFlowerColor, flowerColor,
    setFragrant,
    setNocturnalFlow, setRepeatBloom,
    setFloweringPer, floweringPer
}) => {
    
    
    //handlechange for checkboxes of flowering period.
    const handleChange = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        const name = e.target.name;
    
        //checking if the checkbox is checked. If true then add the value to the respective object key
        if(isChecked === true){
            setFloweringPer({...floweringPer, [e.target.name]: [e.target.value, ...floweringPer?.[e.target.name]]})
  
        } else {
            //logic for removing value from a certain object key
            const g = floweringPer?.[name].filter((x) => {
              return x !== value 
            });
            //set the return new array value
            setFloweringPer({...floweringPer, [e.target.name]: g});
        }
       
    }
    
  return (
    <div className='mt-8 text-sm'>
        <h1 className='font-medium text-xl mb-4 px-4 py-4 border-y border-gray-200 text-emerald-600'>Growing Information</h1>

        <div className="mb-5 px-4">
            <label htmlFor="name" className="block text-[#536471] mb-3">Average Height</label>
            <div className=' flex items-center '>
                <input type="number" placeholder="min-height" id="name" name="name" required
                value={avg?.minH}
                onChange={(e) => setAvg({...avg, minH: e.target.value})}
                className="rounded-md border border-gray-200 w-full p-3 text-sm"/>
                <span className='mx-3'>-</span>
                <input type="number" placeholder="max-height" id="name" name="name" required
                value={avg?.maxH}
                onChange={(e) => setAvg({...avg, maxH: e.target.value})}
                className="rounded-md border border-gray-200 w-full p-3 text-sm mr-3"/>
                <FilterButton data={Measurement} setData={setMeasH}/>
            </div>
        </div>

        <div className="mb-5 px-4">
            <label htmlFor="name" className="block text-[#536471] mb-3">Average Width</label>
            <div className=' flex items-center mb-5'>
                <input type="number" placeholder="min-width" id="name" name="name" required
                value={avg?.minW}
                onChange={(e) => setAvg({...avg, minW: e.target.value})}
                className="rounded-md border border-gray-200 w-full p-3 text-sm"/>
                <span className='mx-3'>-</span>
                <input type="number" placeholder="max-width" id="name" name="name" required
                value={avg?.maxW}
                onChange={(e) => setAvg({...avg, maxW: e.target.value})}
                className="rounded-md border border-gray-200 w-full p-3 text-sm mr-3"/>
                <FilterButton data={Measurement} setData={setMeasW}/>
            </div>
        </div>

        <div className='mb-5 px-4'>
            <div className='flex items-center mb-5'>
                <div className='mr-3 flex-1'>
                    <label htmlFor="name" className="block text-[#536471] mb-3">Foliage Color</label>
                    <input type="text" placeholder="foliage color" id="name" name="name" required
                    value={foliageColor}
                    onChange={(e) => setFoliageColor(e.target.value)}
                    className="rounded-md border border-gray-200 w-full p-3 text-sm"/>
                </div>
                <div className='mr-3'>
                    <label htmlFor="name" className="block text-[#536471] mb-3">Foliage Type</label>
                    <FilterFoliageType data={Foliage} setData={setFoliageType}/>
                </div>
                <div>
                    <label htmlFor="name" className="block text-[#536471] mb-3">Foliage Scent</label>
                    <FilterButton data={FoliageYesOrNo} setData={setFoliageScent}/>
                </div>
            </div>

            <div className='flex items-center mb-5'>
                <div className='mr-3 flex-1'>
                    <label htmlFor="name" className="block text-[#536471] mb-3">Flower Color</label>
                    <input type="text" placeholder="flower color" id="name" name="name" required
                    value={flowerColor}
                    onChange={(e) => setFlowerColor(e.target.value)}
                    className="rounded-md border border-gray-200 w-full p-3 text-sm"/>
                </div>
                <div className='mr-3'>
                    <label htmlFor="name" className="block text-[#536471] mb-3">Fragrant</label>
                    <FilterButton data={FoliageYesOrNo} setData={setFragrant}/>
                </div>
                <div className='mr-3'>
                    <label htmlFor="name" className="block text-[#536471] mb-3">Nocturnal Flowering</label>
                    <FilterButton data={FoliageYesOrNo} setData={setNocturnalFlow}/>
                </div>
                <div>
                    <label htmlFor="name" className="block text-[#536471] mb-3">Repeat Blooming</label>
                    <FilterButton data={FoliageYesOrNo} setData={setRepeatBloom}/>
                </div>
            </div>
            
            
            <div>
                <label htmlFor="name" className="block text-[#536471] mb-3">Flowering Period</label>
                <div className="grid grid-cols-2">
                    <div>
                        {FloweringPeriod?.slice(0,6).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                    <div>
                        {FloweringPeriod?.slice(6,12).map((d, i) => (
                            <div className="flex items-center mb-4" key={i}>
                                <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                    focus:ring-emerald-500 "/>
                                <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
  
  </div>
  )
}

export default GrowingInformation


const FilterFoliageType = ({data, setData}) => {
    const [selected, setSelected] = useState(data[0])


    useEffect(() => {
      
      setData(selected?.name);
   
    }, [selected])
    return (
        <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-[180px]">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-left 
            border border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300
             focus-visible:ring-opacity-75 text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>

            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-10 w-full rounded-md bg-white py-1 
            text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div className="relative">
            <div className="overflow-y-auto overflow-hidden w-full max-h-60 ">
                {data.map((d, dataIdx) => (
                    <Listbox.Option key={dataIdx} className={({ active }) => 
                    `group relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-100 text-green-900' : 'text-gray-900'}`} value={d}>
                    {({ selected }) => (
                        <>
                        <div className="">
                            <span className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                            }`}
                            >
                            {d.name}
                            </span>
                            {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </span>
                            ) : null}

                              <img src={d?.img} className="opacity-0 group-hover:opacity-100 
                              transition-opacity absolute top-2 right-0 object-cover object-center rotate-45 w-[50px]"/>
                        </div>
                       
                         </>
                    )}
                    
                    </Listbox.Option>
                   
                ))}
            </div>
            </div>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    )
}