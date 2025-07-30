import axios from 'axios'
import React, { useEffect, useState } from 'react'

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

// captain se customer ka distance captain home me calculate karenge taaki ride popup wagera me recalcualte naa karna pade jisse API calls decrease hongi

interface RidePopupProps {
    ride: rideData | null,
    setridePopupPanel: React.Dispatch<React.SetStateAction<boolean>>,
    setConfirmRidePopupPanel: React.Dispatch<React.SetStateAction<boolean>>,
    confirmRide: () => void,
    captainLocation: {
        latitude: number,
        longitude: number,
    } | null,
    paymentMethod: 'cash' | 'online' | null,
    setPaymentMethod: React.Dispatch<React.SetStateAction<'cash' | 'online' | null>>
}

const RidePopup = (props: RidePopupProps) => {
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

    return (
        <div>
            <div className="px-3 flex justify-between text-2xl font-semibold">
                <h5 className='p-1 text-center w-[93%] text-gray-300 absolute top-0' onClick={() => {
                    props.setridePopupPanel(false)
                }}><i className="ri-arrow-down-wide-line"></i></h5>
                <h3 className="text-xl font-bold mb-3">A Ride For You!</h3>
            </div>
            <div className='flex items-center justify-between p-3 mb-3 mt-4 bg-[#F7BD58] border-[#D4932D] rounded-lg mx-1'>
                <div className='flex items-center gap-3'>
                    <h2 className='text-lg font-medium'>Passenger Name: {props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{distance} KM</h5>
            </div>
            <div className=' w-screen flex flex-col justify-between items-center px-2'>
                <div className='w-full pl-3 flex-col'>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-map-pin-user-fill"></i></h1>
                        <div className='flex flex-col gap-2 justify-around w-full'>
                            <p className='font-medium'>{props.ride?.pickup}</p>
                            <div className='h-[1px] w-full bg-[#D4932D]'></div>
                        </div>

                    </div>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-map-pin-2-fill"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='font-medium'>{props.ride?.destination}</p>
                            <div className='h-[1px] w-full bg-[#D4932D]'></div>
                        </div>
                    </div>
                    <div className='flex pb-4 pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-currency-line"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <h2 className='text-xl font-semibold '>₹{props.ride?.fare}</h2>
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
