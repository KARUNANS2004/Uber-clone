import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen w-screen'>
            <Link to={'/home'} className='right-2 top-2 fixed h-10 w-10 bg-white rounded-full flex items-center justify-center'>
                <i className="ri-home-4-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" />
            </div>
            <div className='h-1/2 w-screen flex items-center flex-col'>
                <div className='flex justify-evenly items-center pr-4'>
                    <img
                        className='h-10'
                        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                    />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Ravi</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP 14 CV 5552</h4>
                        <p className='text-sm text-gray-500'>Hyundai Creta</p>
                    </div>
                </div>
                <div className=' w-screen flex flex-col justify-around items-center pt-2'>
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
                <button className='w-11/12 bg-green-500 hover:bg-green-600 active:bg-green-600 text-white font-semibold p-2 rounded-lg'>Make Payment</button>
            </div>
        </div>
    )
}

export default Riding
