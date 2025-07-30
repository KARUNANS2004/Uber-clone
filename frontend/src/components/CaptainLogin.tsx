import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCaptainContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setCaptain } = useCaptainContext();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        // storing the time a which captain logs in
        localStorage.setItem('captainOnlineStartTime', new Date().toISOString());
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Optionally show error to user
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between bg-[#F2C883] text-[#1D2A44]'>
      <div>
        <img
          className='w-20 mb-3 scale-[1.5]'
          src='\saarthi_pages_logo.png'
          alt='Captain Logo'
        />

        <form onSubmit={submitHandler}>
          <h3 className='text-xl font-bold mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#F7BD58] mb-7 rounded-md px-4 py-2 border border-[#D4932D] w-full text-[#1D2A44] text-lg placeholder:text-[#1D2A44] placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#D4932D]"
            type='email'
            placeholder='email@example.com'
          />

          <h3 className='text-xl font-bold mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#F7BD58] mb-7 rounded-md px-4 py-2 border border-[#D4932D] w-full text-[#1D2A44] text-lg placeholder:text-[#1D2A44] placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#D4932D]"
            type='password'
            placeholder='Password'
          />

          <button
            type='submit'
            className='bg-[#6B4226] hover:bg-[#5b3217]  text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Login
          </button>
        </form>

        <p className='text-center'>
          Join a fleet?{' '}
          <Link to='/captain-signup' className='text-blue-600 underline'>
            Register as a Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to='/login'
          className='bg-[#1D2A44] hover:bg-[#162033] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
