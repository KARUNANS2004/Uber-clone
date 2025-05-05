import { useEffect, useRef, useState } from 'react';
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

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState<rideData | null>(null);


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
          sendMessage("update-location-captain", {
            userId: captain._id,
            location: { latitude, longitude }
          });
        });
      }
    }

    const locationInterval = setInterval(updateLocation, 5000); // Update location every 5 seconds
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
    const response = await axios.post('http://localhost:4000/rides/confirm', {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  // GSAP animations for ride popup
  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [ridePopupPanel]);

  // GSAP animations for confirm ride popup
  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className='h-screen w-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full z-20'>
        <img className='w-16' src="https://pngimg.com/d/uber_PNG24.png" alt="Uber Logo" />
        <Link to={'/captain-login'} className='h-10 w-10 bg-white rounded-full flex items-center justify-center'>
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

      <div className='h-2/5 p-4'>
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className='fixed translate-y-full w-full bottom-0 z-10 bg-white py-5 rounded-lg'>
        <RidePopup
          ride={ride}
          setridePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div ref={confirmRidePopupPanelRef} className='fixed translate-y-full h-screen w-full bottom-0 z-10 bg-white py-5 rounded-lg'>
        <ConfirmRidePopup
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setridePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
