import { useState } from 'react'
import { Tab } from '@headlessui/react'
import PlantCollectionsTab from './PlantCollectionsTab'
import OnSaleTab from './OnSaleTab'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProfileTabs = () => {

    let [categories] = useState([
        'On Sale', 'Plant Collections'
    ]);
    // const { setPosts} = MyContext();
    // const location = useLocation();

    // useEffect(() => {
    //   return() => {
    //     setPosts([]);
    //   }
    // }, [location]);

  return (
    <div className="w-full px-2 mt-4 sm:px-0 mb-16 sm:mb-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b border-gray-200">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm font-bold leading-5 text-gray-900, focus:outline-none ',
                  selected
                    ? 'border-b-4 border-green-500'
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
              {/* Plants selling by the user */}
              <OnSaleTab/>
               {/* Plants selling by the user */}
            </Tab.Panel>
            <Tab.Panel>
              {/* Plant collection of the user */}
              <PlantCollectionsTab/>
              {/* Plant collection of the user */}
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default ProfileTabs