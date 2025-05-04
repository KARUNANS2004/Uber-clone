import React from 'react'

interface rideData {
    destination: string,
    pickup: string,
    fare: string,
    status: string,
    user: {
        email: string,
        fullName: {
            firstName: string,
            lastName: string
        },
        socketID: string,
        _id: string
    },
    _id: string
}

interface RidePopupProps {
    ride: rideData | null,
    setridePopupPanel: React.Dispatch<React.SetStateAction<boolean>>,
    setConfirmRidePopupPanel: React.Dispatch<React.SetStateAction<boolean>>,
    confirmRide: () => void
}

const RidePopup = (props: RidePopupProps) => {
    return (
        <div>
            <div className="px-3 flex justify-between text-2xl font-semibold">
                <h5 className='p-1 text-center w-[93%] text-gray-300 absolute top-0' onClick={() => {
                    props.setridePopupPanel(false)
                }}><i className="ri-arrow-down-wide-line"></i></h5>
                <h3 className="text-xl font-bold mb-3">A Ride For You!</h3>
            </div>
            <div className='flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg mx-1'>
                <div className='flex items-center gap-3'>
                    <img className='h-16 w-16 rounded-full object-cover' src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
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
                            <p>{props.ride?.pickup}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>

                    </div>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-square-fill"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <h2 className='text-xl font-semibold '>Third Wave Coffee</h2>
                            <p>{props.ride?.destination}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>
                    </div>
                    <div className='flex pb-4 pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-bank-card-2-fill"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <h2 className='text-xl font-semibold '>₹{props.ride?.fare}</h2>
                            <p>Cash Payment</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setConfirmRidePopupPanel(true);
                    props.setridePopupPanel(false)
                    props.confirmRide()
                }} className='w-full bg-green-500 hover:bg-green-600 active:bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>

                <button
                    onClick={() => {
                        props.setridePopupPanel(false)
                    }}
                    className='w-full mt-1 bg-gray-300 hover:bg-gray-400 active:bg-gray-400 text-gray-700 font-semibold p-2 rounded-lg'>Ignore</button>
            </div>
        </div>
    )
}

export default RidePopup
