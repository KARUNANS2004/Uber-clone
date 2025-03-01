import { useGSAP } from '@gsap/react';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from './FinishRide';
import gsap from 'gsap';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

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
                <img className='w-16' src="https://pngimg.com/d/uber_PNG24.png" />
                <Link to={'/captain-login'} className='h-10 w-10 bg-white rounded-full flex items-center justify-center'>
                    <i className="ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" />
            </div>
            <div className='h=1/5 p-6 bg-yellow-400 flex items-center justify-center relative' onClick={() => {
                setFinishRidePanel(true);
            }}>
                <h5 className='p-1 text-center w-full text-gray-900 absolute top-0' onClick={() => {
                }}><i className="ri-arrow-up-wide-line"></i></h5>

                <h4 className='text-3xl font-semibold'>4Km Away</h4>
                <button className='w-full bg-green-500 hover:bg-green-600 active:bg-green-600 text-white font-semibold p-2 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed translate-y-full  w-full bottom-0 z-10 bg-white py-5 rounded-lg'>
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding
