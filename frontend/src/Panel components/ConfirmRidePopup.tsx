import React, { FormEvent, useState } from 'react'
import { HTMLFormMethod, Link } from 'react-router-dom'

interface ConfirmRidePopupPanelProps {
    setConfirmRidePopupPanel: React.Dispatch<React.SetStateAction<boolean>>,
    setridePopupPanel: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmRidePopup = (props: ConfirmRidePopupPanelProps) => {
    const [OTP, setOTP] = useState('')

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
    }
    return (
        <div className='mt-10'>
            <div className="px-3 flex justify-between text-2xl font-semibold">
                <h5 className='p-1 text-center w-[93%] text-gray-300 absolute top-0' onClick={() => {
                    props.setConfirmRidePopupPanel(false)
                }}><i className="ri-arrow-down-wide-line"></i></h5>
                <h3 className="text-xl font-bold mb-3">Confirm Your Ride</h3>
            </div>
            <div className='flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg mx-1'>
                <div className='flex items-center gap-3'>
                    <img className='h-16 w-16 rounded-full object-cover' src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>Catherine Joseph</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className=' w-screen flex flex-col justify-between items-center px-2'>
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
                <div className='w-full flex flex-col'>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }} className='flex flex-col gap-2'>
                        <input value={OTP} onChange={(e) => {
                            setOTP(e.target.value)
                        }} className='focus:outline-none  bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter OTP' />
                        <Link to={'/captain-riding'} className='w-full bg-green-500 hover:bg-green-600 active:bg-green-600 text-white font-semibold p-2 flex justify-center rounded-lg'>Confirm Ride</Link>

                        <button
                            onClick={() => {
                                props.setConfirmRidePopupPanel(false)
                            }}
                            className='w-full mt-1 bg-red-600 hover:bg-red-700 active:bg-red-700 text-white font-semibold p-2 rounded-lg'>Cancel Ride</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup
