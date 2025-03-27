import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const captainContext = React.useContext(CaptainDataContext);

  if (!captainContext) {
    throw new Error('CaptainDataContext must be used within a CaptainDataProvider');
  }

  const { captain, setCaptain } = captainContext;

  useEffect(() => {
    console.log(userData)
  }, [userData])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL_FOR_BACKEND}/captains/register`, captainData)
    console.log(response)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      if (localStorage.getItem('token')) {
        navigate('/captain-home')
      }
    }

    setFirstName('')
    setLastName('')
    setPassword('')
    setEmail('')
    setVehicleCapacity('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleType('')
  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-2' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's our Captain's Name</h3>
          <div className='flex gap-2'>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              required
              placeholder='First Name'
              className='rounded w-1/2 bg-[#eeeeee] mb-4 px-4 py-2 text-lg placeholder:text-base '
            />
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              placeholder='Last Name'
              className='rounded w-1/2 bg-[#eeeeee] mb-4 px-4 py-2 text-lg placeholder:text-base '
            />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            placeholder='example@email.com'
            className='rounded w-full bg-[#eeeeee] mb-4 px-4 py-2 text-lg placeholder:text-base '
          />
          <h3 className='text-lg font-medium mb-2'>Vehicle's Information</h3>
          <div className='flex gap-2'>
            <input
              type="text"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
              required
              placeholder='Vehicle Color'
              className='rounded w-1/2 bg-[#eeeeee] mb-4 px-4 py-2 text-lg placeholder:text-base'
            />
            <input
              type="text"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
              required
              placeholder='Vehicle Plate'
              className='rounded w-1/2 bg-[#eeeeee] mb-4 px-4 py-2 text-lg placeholder:text-base '
            />
          </div>
          <div className='flex gap-2'>
            <input
              type="text"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
              required
              placeholder='Vehicle Capacity'
              className='rounded w-1/2 bg-[#eeeeee] mb-4 px-4 py-2 text-lg placeholder:text-base '
            />
            <select
              required
              className='rounded w-1/2 bg-[#eeeeee] mb-4 px-4 py-2 text-lg placeholder:text-base '
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled > Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Auto">Auto</option>
              <option value="Motorcycle">Moto</option>
            </select>
          </div>

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder='Password'
            className='rounded w-full bg-[#eeeeee] mb-4 px-4 py-2 text-lg placeholder:text-base '
          />
          <button className='bg-black text-white font-semibold mb-2 px-4 py-2 w-full text-lg placeholder:text-base rounded'>Create New Captain</button>
          <p className='text-[10px] text-gray-500 m-2 leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>

          <p className='text-center'>Already have an Account! <Link to='/captain-login' className='text-blue-600'>Login Here</Link></p>
        </form>
      </div>
      <div>
        <Link to='/signup' className='bg-[orange] flex items-center justify-center text-white font-semibold mb-4 rounded px-4 py-2 text-lg '>Sign Up as User</Link>
      </div>
    </div>
  )
}

export default CaptainSignup
