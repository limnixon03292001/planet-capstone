import { useState } from 'react'
import { Tab } from '@headlessui/react'
import FetchUserPost from './FetchUserPost'
import ItemCard from '../components/ItemCard'
import PlantCollectionsTab from './PlantCollectionsTab'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProfileTabs = () => {

    let [categories] = useState([
        'Posts', 'On Sale', 'Plant Collections',
    ]);
    // const { setPosts} = MyContext();
    // const location = useLocation();

    // useEffect(() => {
    //   return() => {
    //     setPosts([]);
    //   }
    // }, [location]);

  return (
    <div className="w-full px-2 mt-4 sm:px-0">
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
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg> */}
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
            <Tab.Panel>
              {/* user posts */}
              <FetchUserPost/>
            </Tab.Panel>
            <Tab.Panel className={classNames('p-3')}>
              <div className='grid grid-cols-2'>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <PlantCollectionsTab/>
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default ProfileTabs