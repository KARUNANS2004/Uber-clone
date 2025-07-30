import { useGSAP } from '@gsap/react';
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from './FinishRide';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';
import { useCaptainContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state.ride;

    const { captain } = useCaptainContext();
    const socketContext = useContext(SocketContext);

    const [captainLocation, setCaptainLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [pickupLocation, setpickupLocation] = useState<string | null>(null)

    const [distance, setDistance] = useState<number>()


    useEffect(() => {
        if (!pickupLocation || !captainLocation) return;

        const fetchDistance = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`, {
                    params: {
                        pickup: `${captainLocation?.latitude},${captainLocation?.longitude}`,
                        destination: pickupLocation
                    }
                });

                const roundedDistance = Math.round(response.data.distance)

                setDistance(roundedDistance);
            } catch (error) {
                console.error("Error fetching distance:", error);
            }
        }

        fetchDistance()
    }, [captainLocation, pickupLocation])


    if (!socketContext) {
        throw new Error("SocketContext is not available");
    }

    const { sendMessage } = socketContext;

    useEffect(() => {
        if (captain._id) {
            sendMessage("join", {
                userType: "captain",
                userId: captain._id
            });
        }

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setCaptainLocation({ latitude, longitude })
                    sendMessage("update-location-captain", {
                        userId: captain._id,
                        location: { latitude, longitude }
                    });
                });
            }
        }

        const locationInterval = setInterval(updateLocation, 5000); // Update location every 5 seconds
        console.log(locationInterval)
        updateLocation()
    }, [captain._id, sendMessage]);

    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [finishRidePanel])
    return (
        <div className='h-screen'>

            <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
                <img className='w-16 scale-[1.5]' src="\saarthi_pages_logo.png" />
                <Link to={'/captain-login'} className='h-10 w-10 bg-white rounded-full flex items-center justify-center'>
                    <i className="ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <LiveTracking />
            </div>
            <div className='h=1/5 p-6 bg-[#f7b442] text-[#1D2A44] flex items-center justify-center relative' onClick={() => {
                setFinishRidePanel(true);
            }}>
                <h5 className='p-1 text-center w-full text-gray-900 absolute top-0' onClick={() => {
                }}><i className="ri-arrow-up-wide-line"></i></h5>

                <h4 className='text-3xl font-semibold'>{distance}Km Away</h4>
                <button className='w-full bg-green-500 hover:bg-green-600 active:bg-green-600 text-white font-semibold p-2 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed translate-y-full  w-full bottom-0 z-10 bg-[#F2C883] py-5 rounded-lg'>
                <FinishRide
                    setpickupLocation={setpickupLocation}
                    captainLocation={captainLocation}
                    rideData={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding
