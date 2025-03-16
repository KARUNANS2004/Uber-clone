import React from "react";

interface VehiclePanelProps {
  setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>
  setconfirmRidePanel: React.Dispatch<React.SetStateAction<boolean>>
  fare: {
    auto: number,
    car: number,
    motorcycle: number
  }
}

const VehiclePanel = (props: VehiclePanelProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-2xl font-semibold">
        <h3 className="text-xl font-bold mb-3">Choose your Ride</h3>
        <i
          onClick={() => {
            props.setVehiclePanel(false);
          }}
          className="ri-arrow-down-wide-line text-gray-400 cursor-pointer"
        ></i>
      </div>

      {/* the 3 available type of vehicles  */}
      <div onClick={() => {
        props.setconfirmRidePanel(true)
        props.setVehiclePanel(false)
      }} className="flex active:border-2 active:border-black bg-gray-100 shadow-inner shadow-gray-200 max-h-20 rounded-xl p-3 items-center justify-between">
        <img
          className="h-12"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="uberGoLogo"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-sm">
            UberGo{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.car}</h2>
      </div>
      <div onClick={() => {
        props.setconfirmRidePanel(true)
        props.setVehiclePanel(false)
      }} className="flex active:border-2 active:border-black bg-gray-100 shadow-inner shadow-gray-200 max-h-20 rounded-xl p-3 items-center justify-between">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="uberGoLogo"
        />
        <div className=" ml-2 w-1/2">
          <h4 className="font-medium text-sm">
            Moto{" "}
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable motorcycle rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">{props.fare.motorcycle}</h2>
      </div>
      <div onClick={() => {
        props.setconfirmRidePanel(true)
        props.setVehiclePanel(false)
      }} className="flex active:border-2 active:border-black bg-gray-100 shadow-inner shadow-gray-200 max-h-20 rounded-xl p-3 items-center justify-between">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="uberGoLogo"
        />
        <div className=" ml-2 w-1/2">
          <h4 className="font-medium text-sm">
            Uber Auto{" "}
            <span>
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable autos</p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
