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

  useEffect(() => {
    console.log(userData)
  }, [userData])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL_FOR_BACKEND}/users/login`, userData)
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
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitHandler(e) }}>
          {/*Also try to make a login via the phone number */}
          <h3 className='text-xl font-medium mb-2'>What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            required
            placeholder='email@example.com'
          />
          <h3 className='text-xl mb-2'>Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            required
            placeholder='password'
          />
          <button className='bg-black text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base '
          >Login</button>
          <p className='text-center'>New here!<Link to='/signup' className='text-blue-600'>Create New Account</Link></p>
        </form>
      </div>
      <div>
        <Link to='/captain-login' className='bg-[#1eae1e] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 text-lg '>Sign in as captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
