import React, { useState } from 'react'
import UPI_Logo from "../assets/UPI_logo.png";
import MasterCard_Logo from "../assets/Mastercard-Logo.png"
import Gpay_Logo from "../assets/gpay_logo.png"
import cash from "../assets/cash.png"

interface confirmRidePanelProps {
    setconfirmRidePanel: React.Dispatch<React.SetStateAction<boolean>>
    setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>
    setlookingForDriverPanel: React.Dispatch<React.SetStateAction<boolean>>
    createRide: () => void
    pickup: string,
    destination: string
    fare: {
        auto: number,
        car: number,
        motorcycle: number
    }
    vehicleType: 'auto' | 'car' | 'motorcycle',
    setPaymentMethod: React.Dispatch<React.SetStateAction<"cash" | "online" | null>>
}

const ConfirmedRide = (props: confirmRidePanelProps) => {
    const [cashButtonClicked, setCashButtonClicked] = useState(false)
    const [onlinePaymentButtonClicked, setonlinePaymentButtonClicked] = useState(false)
    return (
        <div >
            <div className="px-3 flex justify-between text-2xl font-semibold">
                <h3 className="text-xl font-bold mb-3">Confirm Your Ride</h3>
                <i
                    onClick={() => {
                        props.setconfirmRidePanel(false);
                        props.setVehiclePanel(false);
                    }}
                    className="ri-arrow-down-wide-line text-gray-400 cursor-pointer pr-2 "
                ></i>
            </div>
            <div className=' w-screen flex flex-col justify-between items-center px-2'>
                <img
                    className='h-28'
                    src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                />
                <div className='h-[1px] w-full bg-gray-200'></div>
                <div className='w-full pl-3 flex-col'>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-map-pin-user-fill"></i></h1>
                        <div className='flex flex-col gap-2 justify-around w-full'>
                            <p className='font-medium'>{props.pickup}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>

                    </div>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-map-pin-2-fill"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='font-medium'>{props.destination}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>
                    </div>
                    <div className='flex pb-4 pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-currency-line"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <h2 className='text-xl font-semibold '>₹{props.fare[props.vehicleType]}</h2>
                            <div className='flex flex-col gap-2 justify-between'>
                                <div
                                    onClick={() => {
                                        setCashButtonClicked((prev) => prev && false)
                                        setonlinePaymentButtonClicked((prev) => !prev)
                                        props.setPaymentMethod("online")
                                        props.setlookingForDriverPanel(true)
                                        props.setconfirmRidePanel(false)
                                        props.createRide()
                                    }}
                                    className={`font-semibold w-full border py-5 flex items-center justify-start pl-3 rounded-xl transition-all duration-300 ease-in-out ${onlinePaymentButtonClicked ? "border-[1px] border-blue-500 bg-gray-50 " : "border"}`}>
                                    <p>Pay Now</p>
                                    <div className='ml-5 flex gap-2'>
                                        <img src={UPI_Logo} alt="upi" className='h-[20px]' />
                                        <img src={MasterCard_Logo} alt="mastercard" className='h-[20px]' />
                                        <img src={Gpay_Logo} alt="gpay" className='h-[20px]' />
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        setCashButtonClicked((prev) => !prev);
                                        setonlinePaymentButtonClicked(false);
                                        props.createRide()
                                        props.setlookingForDriverPanel(true)
                                        props.setconfirmRidePanel(false)
                                        props.setPaymentMethod("cash")
                                    }}
                                    className={`font-semibold w-full border py-5 flex items-center justify-start pl-3 rounded-xl transition-all duration-300 ease-in-out ${cashButtonClicked ? "border-[1px] border-blue-500 bg-gray-50 " : "border"}`}>
                                    <p>Pay with Cash</p>
                                    <div className='ml-5 flex gap-2'>
                                        <img src={cash} alt="cash" className='h-[20px]' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setlookingForDriverPanel(true);
                    props.setconfirmRidePanel(false);
                    props.createRide()
                }} className='w-full bg-green-500 hover:bg-green-600 active:bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>

        </div >
    )
}

export default ConfirmedRide
