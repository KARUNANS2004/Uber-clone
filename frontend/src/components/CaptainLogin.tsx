import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
  const [captainEmail,setCaptainEmail]=useState('')
  const [captainPassword,setCaptainPassword]=useState('')

  const {captain,setCaptain} = React.useContext(CaptainDataContext)

  const navigate=useNavigate();

  useEffect(()=>{

  })

  const submitHandler= async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const captain={
      email:captainEmail,
      password:captainPassword
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL_FOR_BACKEND}/captains/login`,captain)

    if(response.status===200){
      const data=response.data;

      setCaptain(data.captain);
      localStorage.setItem('token',data.token);
      if(localStorage.getItem('token')){
        navigate('/captain-home')
      }
    }

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
        </form>
        <p className='text-center'>Register as a new Captain! <br /> <Link to='/captain-signup' className='text-blue-600'>Create New Account</Link></p>
      </div>
      <div>
        <Link to='/login' className='bg-[orange] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 text-lg'>Sign in as user</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
