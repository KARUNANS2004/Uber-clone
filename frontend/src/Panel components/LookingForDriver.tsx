import React from 'react'

interface LookingForDriverProps {
    setlookingForDriverPanel: React.Dispatch<React.SetStateAction<boolean>>
    pickup: string,
    destination: string,
    fare: {
        auto: number,
        car: number,
        motorcycle: number
    },
    vehicleType: 'auto' | 'car' | 'motorcycle'
}

const LookingForDriver = (props: LookingForDriverProps) => {
    return (
        <div >
            <div className="px-3 flex justify-between text-2xl font-semibold">
                <h3 className="text-xl font-bold mb-3">Looking For Driver</h3>
                <i
                    onClick={() => {
                        props.setlookingForDriverPanel(false);
                    }}
                    className="ri-arrow-down-wide-line text-gray-400 cursor-pointer pr-2 "
                ></i>
            </div>
            <div className=' w-screen flex flex-col justify-between items-center px-2'>
                <img
                    className='h-28'
                    src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                />
                <div className='h-[1px] w-full bg-gray-200'></div>
                <div className='w-full pl-3 flex-col'>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-map-pin-range-fill"></i></h1>
                        <div className='flex flex-col gap-2 justify-around w-full'>
                            <h2 className='text-xl font-semibold '>563/11-A</h2>
                            <p>{props.pickup}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>

                    </div>
                    <div className='flex items-center pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-square-fill"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <h2 className='text-xl font-semibold '>Third Wave Coffee</h2>
                            <p>{props.destination}</p>
                            <div className='h-[1px] w-full bg-gray-200'></div>
                        </div>
                    </div>
                    <div className='flex pb-4 pt-2'>
                        <h1 className='text-2xl mr-5'><i className="ri-bank-card-2-fill"></i></h1>
                        <div className='flex flex-col gap-2 w-full'>
                            <h2 className='text-xl font-semibold '>₹{props.fare[props.vehicleType]}</h2>
                            <p>Cash Payment</p>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default LookingForDriver
