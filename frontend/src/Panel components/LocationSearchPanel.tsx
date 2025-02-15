import React from 'react'

interface VehiclePanelProps {
  vehiclePanel: boolean,
  setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>,
  panelOpen: boolean,
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LocationSearchPanel = (props: VehiclePanelProps) => {
  const locations = [
    "24B, near Jail Cafe",
    "Rajender Nagar, Sahibabad, Ghaziabad",
    "Jharia,Dhanbad"
  ]


  return (
    <div>
      {/* This is just a sample data */}
      {locations.map((item, itemKey) => {
        return (
          <div key={itemKey} onClick={() => { props.setVehiclePanel(true), props.setPanelOpen(false) }} className='flex gap-4 border-2 border-gray-300 active:border-black active:shadow-inner active:shadow-gray-200 p-3 rounded-xl items-center justify-start my-2 cursor-pointer'>
            <h2 className='bg-[#eee] rounded-full h-10 w-10 flex items-center justify-center '>
              <i className="ri-map-pin-line text-2xl"></i>
            </h2>
            <h4 className='font-medium'>{item}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default LocationSearchPanel
