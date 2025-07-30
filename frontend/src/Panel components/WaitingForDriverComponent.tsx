import React from 'react'
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
  _id: string,
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
  otp: string
}

interface WaitingForDriverComponentProps {
  setWaitingForDriver: React.Dispatch<React.SetStateAction<boolean>>,
  setlookingForDriverPanel: React.Dispatch<React.SetStateAction<boolean>>
  ride: rideStructure | null
}

const WaitingForDriverComponent = (props: WaitingForDriverComponentProps) => {
  if (!props.ride) {
    return (
      <div>
        <h1>Ride is undefined</h1>
      </div>
    )
  }
  return (
    <div className='flex flex-col text-[#1D2A44]' >
      <div className="px-3 flex flex-row-reverse justify-between text-2xl font-semibold">
        <i className="ri-arrow-down-wide-line text-gray-400 cursor-pointer pr-2 " ></i>
      </div>
      <div className='flex justify-between items-center'>
        <img
          className='h-12'
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>{props?.ride.captain.fullName.firstName + " " + props.ride.captain.fullName.lastName}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-500'>Hyundai Creta</p>
          <h1 className='text-lg font-semibold'>{props.ride.otp}</h1>
        </div>
      </div>
      <div className=' w-screen flex flex-col justify-between items-center pt-2'>
        <div className='h-[1px] w-full bg-gray-200'></div>
        <div className='w-full pl-3 flex-col'>
          <div className='flex items-center pt-2'>
            <h1 className='text-2xl mr-5'><i className="ri-map-pin-user-fill"></i></h1>
            <div className='flex flex-col gap-2 justify-around w-full'>
              <p className='font-medium'>{props.ride.pickup}</p>
              <div className='h-[1px] w-full bg-gray-200'></div>
            </div>

          </div>
          <div className='flex items-center pt-2'>
            <h1 className='text-2xl mr-5'><i className="ri-map-pin-2-fill"></i></h1>
            <div className='flex flex-col gap-2 w-full'>
              <p className='font-medium'>{props.ride.destination}</p>
              <div className='h-[1px] w-full bg-gray-200'></div>
            </div>
          </div>
          <div className='flex pb-4 pt-2'>
            <h1 className='text-2xl mr-5'><i className="ri-currency-line"></i></h1>
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='text-xl font-semibold '>₹{props.ride.fare}</h2>
              <p>Cash Payment</p>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

export default WaitingForDriverComponent
