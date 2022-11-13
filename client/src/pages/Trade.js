import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import TradeRequestTab from '../components/TradeRequestTab';
import TradeTab from '../components/TradeTab';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Trade = () => {

    let [categories] = useState([
        'Trade', 'Your Request'
    ]);

  return (
    <div className='block border border-gray-200 w-full min-h-screen pt-6 overflow-hidden'>
        <h1 className='font-extrabold text-lg mt-1 px-4 pb-4 border-b border-gray-200 flex items-center justify-start'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
            <span>Trade</span></h1>   
        <div className="w-full px-2 mt-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b border-gray-200">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 ext-sm font-bold leading-5 text-gray-900, focus:outline-none relative',
                  selected
                    ? 'goBorderBottom'
                    : ''
                )
              }
            >
       
            {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
            <Tab.Panel>
              <TradeTab/>
            </Tab.Panel>
            <Tab.Panel>
              <TradeRequestTab/>
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
    </div>
  )
}

export default Trade