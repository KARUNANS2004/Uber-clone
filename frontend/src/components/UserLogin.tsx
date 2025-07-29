import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserContextData } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData] = useState({})

  //navigation
  const navigate = useNavigate()

  //context
  const context = useContext(UserContextData)
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { user, setUser } = context;
  console.log(user)

  useEffect(() => {
    console.log(userData)
  }, [userData])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user)
      localStorage.setItem('token', data.token)
      if (localStorage.getItem('token')) {
        navigate('/home')
      }
    }
    setPassword('')
    setEmail('')
  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between bg-[#F2C883]'>
      <div>
        <img className='w-16 mb-10 scale-[1.5]' src="\saarthi_pages_logo.png" alt="" />
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitHandler(e) }}>
          {/*Also try to make a login via the phone number */}
          <h3 className='text-xl font-bold mb-2 text-[#1D2A44]'>What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            className="bg-[#F7BD58] mb-7 rounded-md px-4 py-2 border border-[#D4932D] w-full text-[#1D2A44] text-lg placeholder:text-[#1D2A44] placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#D4932D]"
            required
            placeholder='email@example.com'
          />
          <h3 className='text-xl mb-2 text-[#1D2A44] font-bold'>Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            className='bg-[#F7BD58] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            required
            placeholder='password'
          />
          <button className=' bg-[#1D2A44] hover:bg-[#162033] text-white font-semibold mb-7 rounded-[8px] px-4 py-2 w-full text-lg placeholder:text-base transition duration-300'
          >Login</button>
          <p className='text-center'>New here!<Link to='/signup' className='text-blue-600 underline'>Create New Account</Link></p>
        </form>
      </div>
      <div>
        <Link to='/captain-login' className='bg-[#D4932D] hover:bg-[#b38130] flex items-center justify-center text-white font-semibold mb-7 rounded-[8px] px-4 py-2 text-lg tranition duration-300 '>Sign in as captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
