import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Panel components/LocationSearchPanel'
import VehiclePanel from '../Panel components/VehiclePanel'
import ConfirmedRide from '../Panel components/ConfirmedRide'
import LookingForDriver from '../Panel components/LookingForDriver'
import WaitingForDriverComponent from '../Panel components/WaitingForDriverComponent'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const [lookingForDriverPanel, setlookingForDriverPanel] = useState(false)
  const [WaitingForDriver, setWaitingForDriver] = useState(false)
  // useref -- usedd with GSAP 
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const lookingForDriverPanelRef = useRef(null)
  const WaitingForDriverRef = useRef(null)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  // GSAP

  // location panel ref

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
      });
      gsap.to(panelCloseRef.current, {
        opacity: '1',
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0',
      });
      gsap.to(panelCloseRef.current, {
        opacity: '0',
      });
    }
  }, [panelOpen])

  // vehicle panel ref

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  // confirm ride panel ref

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  // looking for driver ref
  useGSAP(() => {
    if (lookingForDriverPanel) {
      gsap.to(lookingForDriverPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(lookingForDriverPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [lookingForDriverPanel])
  // waiting for driver ref
  useGSAP(() => {
    if (WaitingForDriver) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [WaitingForDriver])

  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-12 absolute left-5 top-5' src="https://pngimg.com/d/uber_PNG24.png" />
      <div onClick={() => {
        setVehiclePanel(false)
      }} className='h-screen w-screen'>
        {/*Image for temporary usage*/}
        <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="uber-map-image" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute bottom-0 w-full'>
        <div className='h-[30%] p-5 relative bg-white'>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className='flex flex-col top-[46.5%] absolute items-center gap-1 left-9'>
              <div className="base-circle h-3 w-3 bg-gray-900 rounded-full flex justify-center items-center">
                <div className='inner-circle h-1 w-1 bg-white rounded-full'></div>
              </div>
              <div className="line bg-gray-900 w-0.5 h-10 "></div>
              <div className="square bg-gray-900 h-3 w-3 flex justify-center items-center">
                <div className='inner-square h-1 w-1 bg-white'></div>
              </div>
            </div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              type="text"
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              type="text"
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              placeholder='Enter your destination'
            />
          </form>
        </div>
        {/* Location Panel */}
        <div ref={panelRef} className='h-[0] px-5 bg-white flex flex-col'>
          <div className='block '>
            <h5 ref={panelCloseRef} className='opacity-0 text-center w-full text-4xl' onClick={() => { setPanelOpen(false) }}>
              <i className="ri-arrow-down-wide-line text-gray-400"></i>
            </h5>
          </div>
          <LocationSearchPanel panelOpen={panelOpen} setPanelOpen={setPanelOpen} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      {/* vehicle panel */}
      <div ref={vehiclePanelRef} className='fixed translate-y-full w-full bottom-0 z-10 bg-white p-3 pb-10 flex flex-col gap-2'>
        <VehiclePanel setVehiclePanel={setVehiclePanel} setconfirmRidePanel={setconfirmRidePanel} />
      </div>
      {/* confirm ride panel */}
      <div ref={confirmRidePanelRef} className='fixed translate-y-full w-full bottom-0 z-10 bg-white py-10 pt-12'>
        <ConfirmedRide setconfirmRidePanel={setconfirmRidePanel} setVehiclePanel={setVehiclePanel} setlookingForDriverPanel={setlookingForDriverPanel} />
      </div>
      <div ref={lookingForDriverPanelRef} className='fixed translate-y-full w-full bottom-0 z-10 bg-white py-10 pt-12'>
        <LookingForDriver setlookingForDriverPanel={setlookingForDriverPanel} />
      </div>
      <div ref={WaitingForDriverRef} className="fixed w-full bottom-0 z-10 bg-white pb-2 p-4">
        <WaitingForDriverComponent
          setlookingForDriverPanel={setlookingForDriverPanel}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

    </div>
  )
}

export default Home
