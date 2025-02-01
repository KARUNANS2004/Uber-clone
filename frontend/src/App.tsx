import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import UserLogin from './components/UserLogin'
import UserSignup from './components/UserSignup'
import CaptainLogin from './components/CaptainLogin'
import CaptainSignup from './components/CaptainSignup'

const App = () => {
  return (
    <div className='max-h-screen'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
      </Routes>
    </div>
  )
}

export default App
