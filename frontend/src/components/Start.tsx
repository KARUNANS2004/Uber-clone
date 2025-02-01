import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div >
      <div className='h-screen bg-cover bg-[url(https://images.unsplash.com/photo-1554672408-17395951edc0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-8 w-full flex justify-between flex-col'>
        <img className='w-16 ml-8' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
