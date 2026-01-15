import { Menu, Transition, Listbox, } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import {SunPreferences, InteriorLight, WaterRequirements, NativeHab, SoilPreferences } from '../data';

const FilterPlantCollection = ({gp, setGp, resetState, handleChange}) => {

  return (
    <Menu as="div" className="relative inline-block text-left">
        <div className='text-gray-500'>
          {/* <p className='mb-2'>All Filters</p> */}
          <Menu.Button className="inline-flex items-center justify-start px-4 rounded-md bg-white py-3 text-sm font-light border border-gray-200
        focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-opacity-75 transition-all mr-3 text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            <span> Filters</span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 block w-[370px] h-full min-h-[420px] overflow-auto origin-top-right divide-y divide-gray-100 rounded-md 
          bg-white/95 backdrop-blur-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 text-gray-900 font-light">
                <div className='px-6 py-3 w-full sticky top-0 '>
                    <button type="button" onClick={() => {
                    setGp(resetState)}} 
                    className='bg-emerald-400 block ml-auto text-white py-1 px-2 rounded-full text-sm'>Reset All
                    </button>
                 </div>

                <div className="w-full px-4">

                 
                    {/* Sun Preferences */} 
                    <div className="px-4 mb-3">
                        <label htmlFor="name" className='text-emerald-500 mb-4 block'>Sun Preferences</label>

                        <div className="grid grid-cols-2">
                            <div>
                                {SunPreferences?.slice(0,2).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500 " checked = {gp?.sunPref.includes(d?.value)} />
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {SunPreferences?.slice(2,5).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500 " checked = {gp?.sunPref.includes(d?.value)}/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Sun Preferences */}

                    {/* Interior Light */}
                    <div className="px-4 mb-3">
                        <label htmlFor="name" className='text-emerald-500 mb-4 block'>Interior Light</label>
                        <div className="grid grid-cols-2">
                            <div>
                                {InteriorLight?.slice(0,2).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500" checked = {gp?.interLight.includes(d?.value)}/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {InteriorLight?.slice(2,5).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500" checked = {gp?.interLight.includes(d?.value)}/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Interior Light */}

                    {/* Soil Preferences */}
                    <div className="px-4 mb-3">
                        <label htmlFor="name" className='text-emerald-500 mb-4 block'>Soil Preferences</label>
                        <div className="grid grid-cols-2">
                            <div>
                                {SoilPreferences?.slice(0,3).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500" checked = {gp?.soilPref.includes(d?.value)}/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {SoilPreferences?.slice(3,6).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500" checked = {gp?.soilPref.includes(d?.value)}/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Soil Preferences */}

                    {/* Water Requirements */}
                    <div className="px-4 mb-3">
                        <label htmlFor="name" className='text-emerald-500 mb-4 block'>Water Requirements</label>

                        <div className="grid grid-cols-2">
                            <div>
                                {WaterRequirements?.slice(0,2).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500" checked = {gp?.waterReq.includes(d?.value)}/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {WaterRequirements?.slice(2,3).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500" checked = {gp?.waterReq.includes(d?.value)}/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                        </div>                
                    </div>
                    {/* Water Requirements */}

                    {/* Native Habitat */}
                    <div className="px-4 mb-3">
                        <label htmlFor="name" className='text-emerald-500 mb-4 block'>Native Habitat</label>
                        <div className="grid grid-cols-2">
                            <div>
                                {NativeHab?.slice(0,4).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500" checked = {gp?.nativeHab.includes(d?.value)}/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {NativeHab?.slice(4,8).map((d, i) => (
                                    <div className="flex items-center mb-4" key={i}>
                                        <input id="default-checkbox" type="checkbox" name={d?.name} value={d?.value} onChange={(e) => handleChange(e)} 
                                        className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300
                                            focus:ring-emerald-500" checked = {gp?.nativeHab.includes(d?.value)}/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm">{d?.value}</label>
                                    </div>
                                ))}
                            </div>
                        </div>                
                    </div>
                    {/* Native Habitat */}

                </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
  )
}

export default FilterPlantCollection