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
import CaptainRiding from './Panel components/CaptainRiding'
import { useState } from 'react'

const App = () => {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null)

  return (
    <div className='max-h-screen'>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />}></Route>
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={<UserProtectWrapper>
          <Home paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </UserProtectWrapper>} />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
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
