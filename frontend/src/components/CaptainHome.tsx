import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../Panel components/CaptainDetails'
import RidePopup from '../Panel components/RidePopup'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import ConfirmRidePopup from '../Panel components/ConfirmRidePopup'

const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(true)
  const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const ConfirmRidePopupPanelRef = useRef(null)
  // ridepopuppanel
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [ridePopupPanel])

  //confirmRidePopupPanel
  useGSAP(() => {
    if (ConfirmRidePopupPanel) {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [ConfirmRidePopupPanel])

  return (
    <div className='h-screen w-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
        <img className='w-16' src="https://pngimg.com/d/uber_PNG24.png" />
        <Link to={'/captain-login'} className='h-10 w-10 bg-white rounded-full flex items-center justify-center'>
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" />
      </div>
      <div className='h-2/5 p-4'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='fixed translate-y-full  w-full bottom-0 z-10 bg-white py-5 rounded-lg'>
        <RidePopup setridePopupPanel={setridePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={ConfirmRidePopupPanelRef} className='fixed translate-y-full h-screen  w-full bottom-0 z-10 bg-white py-5 rounded-lg'>
        <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setridePopupPanel={setridePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome
