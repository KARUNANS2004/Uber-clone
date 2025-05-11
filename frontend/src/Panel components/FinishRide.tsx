import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface rideStructure {
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

interface finishRidePanelProps {
    setFinishRidePanel: React.Dispatch<React.SetStateAction<boolean>>
    rideData: rideStructure | null,
    captainLocation: {
        latitude: number,
        longitude: number
    } | null,
    setpickupLocation: React.Dispatch<React.SetStateAction<string | null>>
}

const FinishRide = (props: finishRidePanelProps) => {
    const navigate = useNavigate()

    const [distance, setDistance] = useState<number>()

    useEffect(() => {
        if (props.rideData?.pickup) {
            props.setpickupLocation(props.rideData.pickup)
        }
    }, [props.rideData?.pickup])

    useEffect(() => {
        if (!props.rideData?.pickup || !props.captainLocation) return;

        const fetchDistance = async () => {
            try {
                const response = await axios.get("http://localhost:4000/maps/get-distance-time", {
                    params: {
                        pickup: `${props.captainLocation?.latitude},${props.captainLocation?.longitude}`,
                        destination: props.rideData?.pickup
                    }
                });

                const roundedDistance = Math.round(response.data.distance)

                setDistance(roundedDistance);
            } catch (error) {
                console.error("Error fetching distance:", error);
            }
        }

        fetchDistance()
    }, [props.captainLocation, props.rideData?.pickup])

    async function endRide() {
        const response = await axios.post('http://localhost:4000/rides/end-ride', {
            rideId: props.rideData?._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 200) {
            props.setFinishRidePanel(false);
            navigate('/captain-home')
        }

    }

    return (
        <div className='mt-10'>
            <div className="px-3 flex justify-between text-2xl font-semibold">
                <h5 className='p-1 text-center w-[93%] text-gray-300 absolute top-0' onClick={() => {
                    props.setFinishRidePanel(false);
                }}><i className="ri-arrow-down-wide-line"></i></h5>
                <h3 className="text-xl font-bold mb-3">Finish This Ride</h3>
            </div>
            <div className='flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg mx-1'>
                <div className='flex items-center gap-3'>
                    <img className='h-16 w-16 rounded-full object-cover' src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>{props.rideData?.user.fullName.firstName + " " + props.rideData?.user.fullName.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{distance} KM</h5>
            </div>
            <div className=' w-screen flex flex-col justify-between items-center px-2'>
                <div className='h-[1px] w-full bg-gray-200'></div>
                <div className='w-full pl-3 flex-col'>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-map-pin-user-fill"></i></h1>
                        <div className='flex flex-col gap-2 justify-around w-full'>
                            <p className='font-medium'>{props.rideData?.pickup}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>

                    </div>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-map-pin-2-fill"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='font-medium'>{props.rideData?.destination}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>
                    </div>
                    <div className='flex pb-4 pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-currency-line"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <h2 className='text-xl font-semibold '>₹{props.rideData?.fare}</h2>
                            <p>Cash Payment</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col'>
                    <button
                        onClick={endRide}
                        className='w-full bg-green-500 hover:bg-green-600 active:bg-green-600 text-white font-semibold p-2 flex justify-center rounded-lg'>Finish Ride</button>

                    <p className='font-extralight text-red-500 mt-6 text-sm w-full flex justify-center'>click on finish ride if you have completed the payment</p>
                </div>
            </div>
        </div>
    )
}

export default FinishRide
