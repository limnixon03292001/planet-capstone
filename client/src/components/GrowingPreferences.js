import React from 'react'
import {SunPreferences, InteriorLight, WaterRequirements, NativeHab, SoilPreferences } from '../data';

const GrowingPreferences = ({gp, setGp}) => {
    

    //dynamic function in handling checkbox changes
    const handleChange = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        const name = e.target.name;
        
        //checking if the checkbox is checked. If true then add the value to the respective object key
        if(isChecked === true){
            setGp({...gp, [e.target.name]: [e.target.value, ...gp?.[e.target.name]]})
  
        } else {
            //logic for removing value from a certain object key
            const g = gp?.[name].filter((x) => {
              return x !== value 
            });
            //set the return new array value
            setGp({...gp, [e.target.name]: g});
        }
       
    }

    // useEffect(() => {
    //     console.log("u", gp)
    //     console.log("str", gp?.sunPref.join(', '));
    // }, [gp]);
    
   
  return (
    <div className='mt-8'>

        <h1 className='font-medium text-xl mb-4 px-4 py-4 border-y border-gray-200 text-emerald-600'>Growing Preferences</h1>

        {/* Sun Preferences */}
        <div className="px-4 mb-4">
            <label htmlFor="name" className='text-gray-500 mb-4 block'>Sun Preferences</label>

            <div className="grid grid-cols-2">
                <div>
                    {SunPreferences?.slice(0,2).map((d, i) => (
                        <div className="flex items-center mb-4" key={i}>
                            <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                            className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                focus:ring-emerald-500 "/>
                            <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                        </div>
                    ))}
                </div>
                <div>
                    {SunPreferences?.slice(2,5).map((d, i) => (
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
        {/* Sun Preferences */}

        {/* Interior Light */}
        <div className="px-4 mb-4">
            <label htmlFor="name" className='text-gray-500 mb-4 block'>Interior Light</label>

            <div className="grid grid-cols-2">
                <div>
                    {InteriorLight?.slice(0,2).map((d, i) => (
                        <div className="flex items-center mb-4" key={i}>
                            <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                            className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                focus:ring-emerald-500 "/>
                            <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                        </div>
                    ))}
                </div>
                <div>
                    {InteriorLight?.slice(2,5).map((d, i) => (
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
        {/* Interior Light */}

        {/* Soil Preferences */}
        <div className="px-4 mb-4 ">
            <label htmlFor="name" className='text-gray-500 mb-4 block'>Soil Preferences</label>

            <div className="grid grid-cols-2">
                <div>
                    {SoilPreferences?.slice(0,3).map((d, i) => (
                        <div className="flex items-center mb-4" key={i}>
                            <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                            className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                focus:ring-emerald-500 "/>
                            <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                        </div>
                    ))}
                </div>
                <div>
                    {SoilPreferences?.slice(3,6).map((d, i) => (
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
        {/* Soil Preferences */}

        {/* Water Requirements */}
        <div className="px-4 mb-4">
            <label htmlFor="name" className='text-gray-500 mb-4 block'>Water Requirements</label>

            <div className="grid grid-cols-2">
                <div>
                    {WaterRequirements?.slice(0,2).map((d, i) => (
                        <div className="flex items-center mb-4" key={i}>
                            <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                            className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                focus:ring-emerald-500 "/>
                            <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                        </div>
                    ))}
                </div>
                <div>
                    {WaterRequirements?.slice(2,3).map((d, i) => (
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
        {/* Water Requirements */}

        {/* Native Habitat */}
        <div className="px-4 mb-4">
            <label htmlFor="name" className='text-gray-500 mb-4 block'>Native Habitat</label>

            <div className="grid grid-cols-2">
                <div>
                    {NativeHab?.slice(0,4).map((d, i) => (
                        <div className="flex items-center mb-4" key={i}>
                            <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                            className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                focus:ring-emerald-500 "/>
                            <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                        </div>
                    ))}
                </div>
                <div>
                    {NativeHab?.slice(4,8).map((d, i) => (
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
        {/* Native Habitat */}

    </div>
  )
}

export default GrowingPreferences