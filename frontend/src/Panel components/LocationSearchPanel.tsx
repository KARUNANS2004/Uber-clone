import React from 'react'

interface VehiclePanelProps {
  vehiclePanel: boolean,
  setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>,
  panelOpen: boolean,
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPickup: React.Dispatch<React.SetStateAction<string>>,
  setDestination: React.Dispatch<React.SetStateAction<string>>,
  activeField: 'pickup' | 'destination' | null | string,
  suggestions: Array<{ name: { name: string, coordinates?: [number, number] } }>, // Define the structure of suggestions
}

const LocationSearchPanel = (props: VehiclePanelProps) => {

  const { suggestions = [], setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField } = props;

  const handleSuggestionClick = (suggestion: { name: string, coordinates?: [number, number] }) => { // Adjust the type accordingly
    if (activeField === 'pickup') {
      setPickup(suggestion.name); // Extract the name property
    } else if (activeField === 'destination') {
      setDestination(suggestion.name); // Extract the name property
    }
    // setPanelOpen(false);
  }
  return (
    <div>
      {
        suggestions.map((element, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(element.name)}
            className='flex cursor-pointer gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
          >
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{element.name.name}</h4>
          </div>
        ))
      }


    </div>
  )
}

export default LocationSearchPanel
1