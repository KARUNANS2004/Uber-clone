import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../Panel components/CaptainDetails';
import RidePopup from '../Panel components/RidePopup';
import ConfirmRidePopup from '../Panel components/ConfirmRidePopup';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useCaptainContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import axios from 'axios';

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

interface CaptainProps {
  paymentMethod: 'cash' | 'online' | null
  setPaymentMethod: React.Dispatch<React.SetStateAction<'cash' | 'online' | null>>
}

const CaptainHome = (props: CaptainProps) => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState<rideData | null>(null);

  const [captainLocation, setCaptainLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  const { captain } = useCaptainContext();
  const socketContext = useContext(SocketContext);

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

  socketContext.receiveMessage("new-ride", (data) => {
    console.log(data)
    setRide(data);
    setRidePopupPanel(true);
  })

  async function confirmRide() {
    if (!ride) {
      console.log('Ride is null')
      return;
    }
    console.log("Console message at calling confirm ride\n", ride._id)
    console.log("Console message at calling confirm ride\n", captain._id)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response)
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  // GSAP animations for ride popup
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power2.in"
      });
    }
  }, [ridePopupPanel]);


  // GSAP animations for confirm ride popup
  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power2.in"
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className='h-screen w-screen text-[#1D2A44]'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full z-20'>
        <img className='w-16 scale-[1.5]' src="\saarthi_pages_logo.png" alt="Saarthi Logo" />
        <Link to={'/captain-login'} className='h-10 w-10 bg-[#F2C883] border border-[#D4932D] rounded-full flex items-center justify-center'>
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <img
          className='h-full w-full object-cover'
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          alt="Uber Background"
        />
      </div>

      <div className='h-2/5 p-4 bg-[#F2C883]'>
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className='fixed translate-y-full w-full bottom-0 z-10 bg-[#F2C883] py-5 rounded-lg'>
        <RidePopup
          captainLocation={captainLocation}
          ride={ride}
          setridePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
          paymentMethod={props.paymentMethod}
          setPaymentMethod={props.setPaymentMethod}
        />
      </div>

      <div ref={confirmRidePopupPanelRef} className='fixed translate-y-full h-screen w-full bottom-0 z-10 bg-white py-5 rounded-lg'>
        <ConfirmRidePopup
          captainLocation={captainLocation}
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setridePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
