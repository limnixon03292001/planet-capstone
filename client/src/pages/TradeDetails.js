import React from 'react'

const TradeDetails = () => {
  return (
    <div className='block border border-gray-200 w-full min-h-screen pt-6 overflow-hidden'>
        <h1 className='font-extrabold text-lg mt-1 px-4 pb-4 border-b border-gray-200 flex items-center justify-start'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <span>Trade Details</span>
        </h1>   

        <main className='w-full h-full'>
            <div className='px-4 py-2 mb-6'>
                <p>Trade Request from Aki Hayakawa</p>
            </div>
            <table className="table-fixed w-full h-full">
                <thead>
                    <tr>
                    <th className='hidden md:block'></th>
                    <th>
                        <div className='mr-2'>
                            <div className='relative'>
                                <img src="https://res.cloudinary.com/future-secure/image/upload/v1667449896/pqkqqvghshr4ktr8zrdv.jpg" alt="plant_img"
                                className='rounded-lg w-full h-56 object-cover object-center'/>
                                <img src="https://res.cloudinary.com/securing-future/image/upload/v1634784867/lrbkmns3lttmmtdn22y4.jpg" alt="plant_img"
                                className='rounded-full border-[5px] border-white w-14 h-14 object-cover object-center
                                absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2'/>
                            </div>
                            <div>
                                <p>Chinese Ixora</p>
                                <p className='text-sm text-gray-500 font-normal'>Anim ad dolore commodo ad tempor qui sit veniam minim fugiat dolor irure.</p>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div className='mr-2'>
                            <div className='relative'>
                                <img src="https://res.cloudinary.com/future-secure/image/upload/v1667203410/uhhzbpdvmsq2opea3aoj.jpg" alt="plant_img"
                                className='rounded-lg w-full h-56 object-cover object-center'/>
                                <img src="https://res.cloudinary.com/future-secure/image/upload/v1663556166/jj5qcqop7gabpdcblsev.jpg" alt="plant_img"
                                className='rounded-full border-[5px] border-white w-14 h-14 object-cover object-center
                                absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2'/>
                            </div>
                            <div>
                                <p>Chinese Ixora</p>
                                <p className='text-sm text-gray-500 font-normal'>Anim ad dolore commodo ad tempor qui sit veniam minim fugiat dolor irure.</p>
                            </div>
                        </div>
                    </th>
                    </tr>
                </thead>
                {/* <div className='w-full h-8 '/> */}
                <tbody>
                    {/* Growing Preference */}
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-emerald-600 whitespace-nowrap'>Growing Preference</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Sun Preference</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Soil Preference</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Interior Light</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Water Requirement</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Native Habitat</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>

                    {/* Growing Information */}
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-emerald-600 whitespace-nowrap'>Growing Information</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Date Planted</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Average Height</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Average Width</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Foliage Color</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Foliage Type</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Foliage Scent</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Flower Color</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Fragrant</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Nocturnal Flowering</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Repeat Blooming</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='hidden md:block py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>Flowering Period</td>
                        <td className='py-4 px-4'> Part Sun, Full Sun</td>
                        <td className='py-4 px-4'> Part Shade, Full Sun</td>
                    </tr>
                </tbody>
            </table>
       

        </main>
    </div>
  )
}

export default TradeDetails