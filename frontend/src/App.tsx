import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './components/Start'
import UserLogin from './components/UserLogin'
import UserSignup from './components/UserSignup'
import CaptainLogin from './components/CaptainLogin'
import CaptainSignup from './components/CaptainSignup'
import Home from './components/Home'
import UserProtectWrapper from './components/UserProtectWrapper'
import UserLogout from './components/UserLogout'
import CaptainHome from './components/CaptainHome'
import CaptainProtectWrapper from './components/CaptainProtectWrapper'
import Riding from './components/Riding'

const App = () => {
  return (
    <div className='max-h-screen'>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />}></Route>
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={<UserProtectWrapper>
          <Home />
        </UserProtectWrapper>} />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
        <Route path='/users/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
