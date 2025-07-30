import React from 'react'

interface VehiclePanelProps {
  vehiclePanel: boolean,
  setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>,
  panelOpen: boolean,
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPickup: React.Dispatch<React.SetStateAction<string>>,
  setDestination: React.Dispatch<React.SetStateAction<string>>,
  activeField: 'pickup' | 'destination' | null | string,
  suggestions: string[], // Define the structure of suggestions
}

const LocationSearchPanel = (props: VehiclePanelProps) => {

  const { suggestions = [], setPickup, setDestination, activeField } = props;

  const handleSuggestionClick = (suggestion: string) => { // Adjust the type accordingly
    if (activeField === 'pickup') {
      setPickup(suggestion); // Extract the name property
    } else if (activeField === 'destination') {
      setDestination(suggestion); // Extract the name property
    }
    // setPanelOpen(false);
  }
  return (
    <div>
      {
        suggestions.map((element, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(element)}
            className='flex cursor-pointer gap-4 border-2 p-3 border-[#D4932D] bg-[#F7BD58] active:border-[#9c6e25] rounded-xl items-center my-2 justify-start hover:bg-[#f7af34] transition duration-300'
          >
            <h2 className='bg-[#D4932D] min-w-[40px] h-10 w-10 flex items-center justify-center rounded-full text-xl text-[#1D2A44]'>
              <i className="ri-map-pin-fill"></i>
            </h2>

            <h4 className='font-medium text-[#1D2A44]'>{element}</h4>
          </div>
        ))
      }


    </div>
  )
}

export default LocationSearchPanel
1