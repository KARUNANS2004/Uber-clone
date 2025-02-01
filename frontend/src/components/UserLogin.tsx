import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  useEffect(()=>{
    console.log(userData)
  },[userData])

  const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setUserData({
      email:email,
      password:password
    })
    setPassword('')
    setEmail('')
  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{submitHandler(e)}}>
          {/*Also try to make a login via the phone number */}
          <h3 className='text-xl font-medium mb-2'>What's your email</h3>
          <input 
            type="email" 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            required 
            placeholder='email@example.com'
          />
          <h3 className='text-xl mb-2'>Enter Password</h3>
          <input 
            type="password" 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
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
