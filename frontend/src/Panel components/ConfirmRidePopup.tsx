import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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

interface ConfirmRidePopupPanelProps {
    setConfirmRidePopupPanel: React.Dispatch<React.SetStateAction<boolean>>,
    setridePopupPanel: React.Dispatch<React.SetStateAction<boolean>>,
    ride: rideData | null,
    captainLocation: {
        latitude: number,
        longitude: number
    } | null;
}

const ConfirmRidePopup = (props: ConfirmRidePopupPanelProps) => {
    const [OTP, setOTP] = useState('')
    const navigate = useNavigate()
    const [distance, setDistance] = useState<number>()

    useEffect(() => {
        if (!props.ride?.pickup || !props.captainLocation) return;

        const fetchDistance = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`, {
                    params: {
                        pickup: `${props.captainLocation?.latitude},${props.captainLocation?.longitude}`,
                        destination: props.ride?.pickup
                    }
                });

                const roundedDistance = Math.round(response.data.distance)
                setDistance(roundedDistance);
            } catch (error) {
                console.error("Error fetching distance:", error);
            }
        }

        fetchDistance()
    }, [props.captainLocation, props.ride?.pickup])

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride?._id,
                otp: OTP
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setridePopupPanel(false)
            console.log("captain riding ", props.ride)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
    }

    return (
        <div className='h-screen w-screen flex flex-col text-[#1D2A44] bg-[#F2C883] rounded-[8px]'>
            {/* Header */}
            <div className="px-3 py-2 mb-4 flex justify-between items-center text-2xl font-semibold relative">
                <h3 className="text-xl font-bold mx-auto">Confirm Your Ride</h3>
            </div>

            {/* Rider Card */}
            <div className='flex items-center justify-between p-3 bg-[#f7b442] rounded-lg mx-3'>
                <div className='flex items-center gap-3'>
                    <h2 className='text-lg font-medium'>
                        {props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}
                    </h2>
                </div>
                <h5 className='text-lg font-semibold'>{distance} KM</h5>
            </div>

            {/* Ride Info Section */}
            <div className='flex-1 flex flex-col justify-between px-4 mt-4 overflow-auto'>

                {/* Pickup */}
                <div className='flex items-start gap-3  flex-1'>
                    <i className="ri-map-pin-user-fill text-2xl mt-1" />
                    <div className='flex flex-col justify-between w-full border-b border-b-[#D4932D] pb-2'>
                        <p className='font-medium'>{props.ride?.pickup}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className='flex items-start gap-3 flex-1'>
                    <i className="ri-map-pin-2-fill text-2xl mt-1" />
                    <div className='flex flex-col justify-between w-full border-b border-b-[#D4932D] pb-2 '>
                        <p className='font-medium'>{props.ride?.destination}</p>
                    </div>
                </div>

                {/* Fare */}
                <div className='flex items-start gap-3 flex-1'>
                    <i className="ri-currency-line text-2xl mt-1" />
                    <div className='flex flex-col justify-between w-full border-b border-b-[#D4932D] pb-2'>
                        <h2 className='text-xl font-semibold'>₹{props.ride?.fare}</h2>
                        <p>Cash Payment</p>
                    </div>
                </div>
            </div>

            {/* OTP Form Section */}
            <div className='px-4 py-3'>
                <form onSubmit={submitHandler} className='flex flex-col gap-3'>
                    <input
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)}
                        className='focus:outline-none bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full'
                        type="text"
                        placeholder='Enter OTP'
                    />
                    <button className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-lg'>
                        Confirm Ride
                    </button>
                    <button
                        type="button"
                        onClick={() => props.setConfirmRidePopupPanel(false)}
                        className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold p-3 rounded-lg'
                    >
                        Cancel Ride
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmRidePopup
