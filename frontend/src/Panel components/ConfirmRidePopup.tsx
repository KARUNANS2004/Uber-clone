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
    setridePopupPanel: React.Dispatch<React.SetStateAction<boolean>>
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
                const response = await axios.get("http://localhost:4000/maps/get-distance-time", {
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

        const response = await axios.get(`http://localhost:4000/rides/start-ride`, {
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
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{distance}KM</h5>
            </div>
            <div className=' w-screen flex flex-col justify-between items-center px-2'>
                <div className='h-[1px] w-full bg-gray-200'></div>
                <div className='w-full pl-3 flex-col'>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-map-pin-user-fill"></i></h1>
                        <div className='flex flex-col gap-2 justify-around w-full'>
                            <p className='font-medium'>{props.ride?.pickup}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>

                    </div>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-map-pin-2-fill"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='font-medium'>{props.ride?.destination}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>
                    </div>
                    <div className='flex pb-4 pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-currency-line"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <h2 className='text-xl font-semibold '>₹{props.ride?.fare}</h2>
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
                        <button className='w-full bg-green-500 hover:bg-green-600 active:bg-green-600 text-white font-semibold p-2 flex justify-center rounded-lg'>Confirm Ride</button>

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
