import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [captainEmail,setCaptainEmail]=useState('')
  const [captainPassword,setCaptainPassword]=useState('')
  const [captainData,setCaptainData]=useState({})

  useEffect(()=>{
    console.log(captainData)
  },[captainData])

  const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setCaptainData({
      captainEmail:captainEmail,
      captainPassword:captainPassword
    })
    setCaptainPassword('');
    setCaptainEmail('');
  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{submitHandler(e)}}>
          <h3 className='text-xl font-medium mb-2'>What's our Captain's email</h3>
          <input 
            type="email"
            placeholder='email@example.com'
            value={captainEmail}
            onChange={(e)=>{
              setCaptainEmail(e.target.value)
            }}
            required
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          />

          <h3 className='text-xl font-medium mb-2'>Enter Password</h3>
          <input 
            type="password"
            placeholder='password'
            required
            value={captainPassword}
            onChange={(e)=>{
              setCaptainPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          />
          <button className='bg-black text-white font-semibold mb-7 px-4 py-2 w-full text-lg placeholder:text-base rounded'>Login</button>
          <p className='text-center'>Register as a new Captain! <br /> <Link to='/captain-signup' className='text-blue-600'>Create New Account</Link></p>
        </form>
      </div>
      <div>
        <Link to='/login' className='bg-[orange] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 text-lg'>Sign in as user</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
