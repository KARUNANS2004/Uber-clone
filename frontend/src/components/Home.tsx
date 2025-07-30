import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Panel components/LocationSearchPanel'
import VehiclePanel from '../Panel components/VehiclePanel'
import ConfirmedRide from '../Panel components/ConfirmedRide'
import LookingForDriver from '../Panel components/LookingForDriver'
import WaitingForDriverComponent from '../Panel components/WaitingForDriverComponent'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { useUserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from './LiveTracking'

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
  captain: {
    fullName: {
      firstName: string,
      lastName: string
    },
    vehicle: {
      color: string,
      plate: string,
      capacity: number,
      vehicleType: string
    },
    location: {
      latitude: number,
      longitude: number
    },
    _id: string,
    email: string,
    status: string,
    socketId: string
  },
  otp: string,
  _id: string
}

interface HomeProps {
  paymentMethod: "cash" | "online" | null
  setPaymentMethod: React.Dispatch<React.SetStateAction<'cash' | 'online' | null>>
}

const Home = (props: HomeProps) => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const [lookingForDriverPanel, setlookingForDriverPanel] = useState(false)
  const [WaitingForDriver, setWaitingForDriver] = useState(false)

  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<string | null>(null)

  const [fare, setFare] = useState<{ auto: number, car: number, motorcycle: number }>({ auto: 0, car: 0, motorcycle: 0 })
  const [vehicleType, setVehicleType] = useState<"auto" | "car" | "motorcycle">("auto")
  const [ride, setRide] = useState<rideStructure | null>(null)

  // const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null)

  const navigate = useNavigate()

  const socketContext = useContext(SocketContext)
  if (!socketContext) {
    throw new Error("SocketContext is not available")
  }
  const { sendMessage } = socketContext
  const userContext = useUserContext()
  const { user } = userContext

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id })
  }, [user])

  socketContext.receiveMessage("ride-confirmed", (ride) => {
    console.log('Rider accepted the ride')
    setVehiclePanel(false)
    setWaitingForDriver(true);
    setlookingForDriverPanel(false);
    setRide(ride)
  })

  socketContext.receiveMessage("ride-started", (ride) => {
    setWaitingForDriver(false);
    console.log(ride)
    navigate('/riding', { state: { ride } });
  })

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

  const handlePickupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
        params: {
          input: e.target.value
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setPickupSuggestions(response.data)
    } catch (err: any) {
      throw new Error(err)
    }
  }

  const handleDestinationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch (error) {
      // handle error
      console.error('Error fetching destination suggestions:', error);
    }
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
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        y: '100%',
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [confirmRidePanel]);

  // looking for driver ref
  useGSAP(() => {
    if (lookingForDriverPanel) {
      gsap.set(lookingForDriverPanelRef.current, { clearProps: 'transform' }) // clear transform before animating
      gsap.to(lookingForDriverPanelRef.current, {
        y: 0, // use 'y' instead of 'transform'
      })
    } else {
      gsap.set(lookingForDriverPanelRef.current, { clearProps: 'transform' })
      gsap.to(lookingForDriverPanelRef.current, {
        y: '100%',
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

  async function findTrip() {
    setPanelOpen(false)

    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickup,
        destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(res.data)
    setFare(res.data)
    setVehiclePanel(true)

  }

  async function createRide() {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(res)
  }

  console.log(props.paymentMethod)
  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-12 absolute left-5 top-5' src="\saarthi_pages_logo.png" />
      <div onClick={() => {
        setVehiclePanel(false)
      }} className='h-screen w-screen'>
        {/*Image for temporary usage*/}
        <LiveTracking />
      </div>
      <div className='flex flex-col justify-end h-screen absolute bottom-0 w-full'>
        <div className='h-[30%] p-5 relative bg-[#F2C883]'>
          <i ref={panelCloseRef} className="ri-arrow-down-wide-line text-gray-400 text-4xl absolute right-5" onClick={() => { setPanelOpen(false) }}></i>
          <h4 className='text-2xl font-semibold text-[#1D2A44]'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className='relative'>
              <input
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField("pickup")
                }}
                value={pickup}
                onChange={(e) => {
                  handlePickupChange(e)
                }}
                type="text"
                className='bg-[#F7BD58] border border-[#D4932D] text-[#1D2A44] px-12 py-2 text-lg rounded-lg w-full mt-5 focus:outline-none focus:ring-[#D4932D] placeholder:text-[#1D2A44]'
                placeholder='Add a pick-up location'
              />
              <div className="base-circle h-3 w-3 bg-[#1D2A44] rounded-full absolute top-[50%] translate-y-1/2 left-[15px] flex justify-center items-center">
                <div className='inner-circle h-1 w-1 bg-white rounded-full'></div>
              </div>
              <div className="line bg-[#1D2A44] w-0.5 h-[10px] absolute bottom-[0%] left-[20px]"></div>
            </div>
            <div className='relative'>
              <div className="line bg-[#1D2A44] w-0.5 h-7 absolute left-[20px] "></div>
              <input
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField("destination")
                }}
                value={destination}
                onChange={(e) => {
                  handleDestinationChange(e)
                }}
                type="text"
                className='bg-[#F7BD58] border border-[#D4932D] text-[#1D2A44] px-12 py-2 text-lg rounded-lg w-full mt-3 focus:outline-none focus:ring-[#D4932D] placeholder:text-[#1D2A44]'
                placeholder='Enter your destination'
              />
              <div className="square bg-[#1D2A44] h-3 w-3 flex absolute top-[50%] translate-y-1/2 left-[15px] justify-center items-center">
                <div className='inner-square h-1 w-1 bg-white'></div>
              </div>
            </div>
          </form>
          <button className='bg-[#1D2A44] hover:bg-[#162033] transition duration-300 font-bold text-white px-4 py-2 rounded-[8px] mt-3 w-full '
            onClick={findTrip}>
            Find a Trip
          </button>
        </div>
        {/* Location Panel */}
        <div ref={panelRef} className='h-[0] px-5 pt-10 bg-[#F2C883] flex flex-col'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup'
              ? pickupSuggestions
              : destinationSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            panelOpen={panelOpen}
            setPanelOpen={setPanelOpen}
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      {/* vehicle panel */}
      <div ref={vehiclePanelRef} className='fixed translate-y-full w-full bottom-0 z-10 bg-[#F2C883] p-3 pb-10 flex flex-col gap-2'>
        <VehiclePanel pickup={pickup} destination={destination} setVehicleType={setVehicleType} fare={fare} setVehiclePanel={setVehiclePanel} setconfirmRidePanel={setconfirmRidePanel} />
      </div>
      {/* confirm ride panel */}
      <div ref={confirmRidePanelRef} className='fixed translate-y-full w-full bottom-0 z-10 bg-[#F2C883] py-10 pt-12'>
        <ConfirmedRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setconfirmRidePanel={setconfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setlookingForDriverPanel={setlookingForDriverPanel}
          setPaymentMethod={props.setPaymentMethod} />
      </div>
      <div ref={lookingForDriverPanelRef} className='fixed translate-y-full w-full bottom-0 z-10 bg-[#F2C883] py-10 pt-12'>
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setlookingForDriverPanel={setlookingForDriverPanel}
          paymentMethod={props.paymentMethod} />
      </div>
      <div ref={WaitingForDriverRef} className="fixed w-full bottom-0 z-10 bg-[#F2C883] pb-2 p-4">
        <WaitingForDriverComponent
          ride={ride}
          setlookingForDriverPanel={setlookingForDriverPanel}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

    </div>
  )
}

export default Home
