import React from 'react'

const CaptainDetails = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-16 w-16 rounded-full object-cover' src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg" alt="" />
                    <h4 className='text-lg font-medium'>Julie Catherine</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹295.20</h4>
                    <p className='text-sm font-medium text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-4 items-start'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-extralight  ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600 '>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-extralight  ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600 '>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-extralight  ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600 '>Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
