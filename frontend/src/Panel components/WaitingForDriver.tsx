import React from 'react'

const WaitingForDriver = () => {
  return (
    <div className='flex flex-col' >
      <div className="px-3 flex flex-row-reverse justify-between text-2xl font-semibold">
        <i
          onClick={() => {
            props.setlookingForDriverPanel(false);
          }}
          className="ri-arrow-down-wide-line text-gray-400 cursor-pointer pr-2 "
        ></i>
      </div>
      <div className='flex justify-between items-center'>
        <img
          className='h-12'
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>Ravi</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP 14 CV 5552</h4>
          <p className='text-sm text-gray-500'>Hyundai Creta</p>
        </div>
      </div>
      <div className=' w-screen flex flex-col justify-between items-center pt-2'>
        <div className='h-[1px] w-full bg-gray-200'></div>
        <div className='w-full pl-3 flex-col'>
          <div className='flex items-center pt-2'>
            <h1 className='text-2xl mr-5'><i className="ri-map-pin-range-fill"></i></h1>
            <div className='flex flex-col gap-2 justify-around w-full'>
              <h2 className='text-xl font-semibold '>563/11-A</h2>
              <p>Kaikondrahalli, Bengaluru Karnataka</p>
              <div className='h-[1px] w-full bg-gray-200'></div>
            </div>

          </div>
          <div className='flex items-center pt-2'>
            <h1 className='text-2xl mr-5'><i className="ri-square-fill"></i></h1>
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='text-xl font-semibold '>Third Wave Coffee</h2>
              <p>17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru, Karnataka</p>
              <div className='h-[1px] w-full bg-gray-200'></div>
            </div>
          </div>
          <div className='flex pb-4 pt-2'>
            <h1 className='text-2xl mr-5'><i className="ri-bank-card-2-fill"></i></h1>
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='text-xl font-semibold '>₹193.20</h2>
              <p>Cash Payment</p>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

export default WaitingForDriver
