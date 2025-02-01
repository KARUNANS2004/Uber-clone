import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  
  useEffect(()=>{
    console.log(userData)
  },[userData])

  const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setUserData({
      fullName:{
        firstName:firstName,
        lastName:lastName,
      },
      email:email,
      password:password
    })
    setFirstName('')
    setLastName('')
    setPassword('')
    setEmail('')
  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-2' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
          <div className='flex gap-2'>
            <input 
              type="text"
              value={firstName}
              onChange={(e)=>{
                setFirstName(e.target.value)
              }}
              required
              placeholder='First Name'
              className='rounded w-1/2 bg-[#eeeeee] mb-7 px-4 py-2 text-lg placeholder:text-base '
            />
            <input 
              type="text"
              required
              value={lastName}
              onChange={(e)=>{
                setLastName(e.target.value)
              }}
              placeholder='Last Name'
              className='rounded w-1/2 bg-[#eeeeee] mb-7 px-4 py-2 text-lg placeholder:text-base '
            />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input 
            type="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            required
            placeholder='example@email.com'
            className='rounded w-full bg-[#eeeeee] mb-7 px-4 py-2 text-lg placeholder:text-base '
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input 
            type="password"
            required
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            placeholder='Password'
            className='rounded w-full bg-[#eeeeee] mb-7 px-4 py-2 text-lg placeholder:text-base '
          />
          <button className='bg-black text-white font-semibold mb-2 px-4 py-2 w-full text-lg placeholder:text-base rounded'>Create Account</button>
          <p className='text-[10px] text-gray-500 m-2 leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>

          <p className='text-center'>Already have an Account! <Link to='/login' className='text-blue-600'>Login Here</Link></p>
        </form>
      </div>
      <div>
        <Link to='/captain-signup' className='bg-[#1eae1e] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 text-lg '>Sign Up as Captain</Link>
      </div>
    </div>
  )
}

export default UserSignup
