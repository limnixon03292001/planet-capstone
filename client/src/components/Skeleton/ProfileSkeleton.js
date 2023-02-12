import React from 'react'

const ProfileSkeleton = () => {
  return (

    <div className='w-full h-full animate-pulse'>
        {/* cover */}
        <div className='bg-slate-200 w-full h-40 md:h-64'/>
        {/* cover */}

         {/* user info */}
         <div className="md:flex">
                <div className="flex-shrink-0 overflow-hidden relative z-10 -mt-12 ml-5 w-24 h-24">
                    <div className="object-cover object-center w-full h-full border-4 border-white bg-slate-200 rounded-full"/>
                </div>
                <div className="flex-1 w-full pl-8 md:pl-0 md:ml-3 mt-2 ">
                    <div className='flex'>
                        <div className='flex-1'>
                            <div className="h-2 w-full max-w-[140px] bg-slate-200 rounded"/>
                            <div className="h-2 w-full max-w-[110px] mt-2 bg-slate-200 rounded"/>
                            <div className="h-2 w-full max-w-[110px] mt-2 bg-slate-200 rounded"/>
                        </div>
                        
            
                        <div className='self-start mr-4 -mt-12 md:-mt-0'>
                            <div className='flex gap-x-2 items-center'>
                                <div className="h-8 w-8 bg-slate-200 rounded-full"/>
                                <div className="h-8 w-16 bg-slate-200 rounded-full"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* user info */}

            {/* user descrip birthday etc */}
            <div className='mt-6'>
                <div className="mx-8 h-2 w-full max-w-[110px] mt-2 bg-slate-200 rounded"/>

                <div className='mx-8 mt-4 flex gap-x-3 flex-wrap items-center justify-start'>
        
                    <div className="h-2 w-full max-w-[110px] mt-2 bg-slate-200 rounded"/>
                    <div className="h-2 w-full max-w-[110px] mt-2 bg-slate-200 rounded"/>
                    <div className="h-2 w-full max-w-[110px] mt-2 bg-slate-200 rounded"/>
                    
                </div>
            </div>
            {/* user descrip birthday etc */}

    </div>
  )
}

export default ProfileSkeleton