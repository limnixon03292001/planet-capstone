import React from 'react'

const MarketplacePlantSK = () => {
  return (
    <div className="animate-pulse w-full h-full gap-x-3 md:grid grid-cols-2 mb-[20px]">
        <div>
            <div className='flex items-center w-full gap-x-3'>
                <div className="rounded-full bg-slate-200 h-10 w-10 flex-nowrap"></div>

                <div className="flex-1 w-full max-w-[120px] py-1">
                    <div className='w-full flex flex-col items-center space-y-2'>
                        <div className="h-2 w-full bg-slate-200 rounded"></div>
                        <div className="h-2 w-full bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>

            <div className='w-full mt-4 space-y-3'>
                <div className="h-2 w-full max-w-[120px] bg-slate-200 rounded"></div>
                <div className="h-2 w-full max-w-[120px] bg-slate-200 rounded"></div>
                <div className="h-32 w-full  bg-slate-200 rounded"></div>

                <div className="h-2 w-full max-w-[120px] bg-slate-200 rounded"></div>
                <div className="h-32 w-full  bg-slate-200 rounded"></div>

                <div className="h-2 w-full max-w-[120px] bg-slate-200 rounded"></div>
                <div className="h-32 w-full  bg-slate-200 rounded"></div>
            </div>
        </div>

        <div className='mt-4 w-full h-full'>
            <div className="h-72 w-full bg-slate-200 rounded"></div>
        </div>

       
    </div>
  )
}

export default MarketplacePlantSK