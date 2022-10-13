import React, { useEffect, useState } from 'react'
import FilterButton from './FilterButton'

const Measurement = [
    { name: 'None' },
    { name: 'Inches' },
    { name: 'Meter' },
    { name: 'Feet' },
]

const Foliage = [
    { name: 'None' },
    { name: 'Linear' },
    { name: 'Ovate' },
    { name: 'Elliptical' },
    { name: 'Oblong' },
    { name: 'Cordate' },
    { name: 'Lanceolate' },
    { name: 'Acicular' },
    { name: 'Reniform' },
    { name: 'Orbicular' },
    { name: 'Sagittate' },
    { name: 'Hastate' },
    { name: 'Lyrate' },
    { name: 'Spatulate' },
    { name: 'Rhomboid' },
    { name: 'Oblique' },
    { name: 'Cuneate' },
]

const FoliageYesOrNo = [
    { name: 'None' },
    { name: 'Yes' },
    { name: 'No' },
]

const FloweringPeriod = [
    { name: 'flowPer', value: 'Jan' },
    { name: 'flowPer', value: 'Feb' },
    { name: 'flowPer', value: 'Mar' },
    { name: 'flowPer', value: 'Apr' },
    { name: 'flowPer', value: 'May' },
    { name: 'flowPer', value: 'Jun' },
    { name: 'flowPer', value: 'Jul' },
    { name: 'flowPer', value: 'Aug' },
    { name: 'flowPer', value: 'Sept' },
    { name: 'flowPer', value: 'Oct' },
    { name: 'flowPer', value: 'Nov' },
    { name: 'flowPer', value: 'Dec' },
]


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
                    <FilterButton data={Foliage} setData={setFoliageType}/>
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