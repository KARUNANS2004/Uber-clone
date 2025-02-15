import React, { useContext, useEffect } from 'react'
import { UserContextData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

interface UserProtectWrapperProps {
    children: React.ReactNode
}

const UserProtectWrapper:React.FC<UserProtectWrapperProps> = ({children}) => {
    //navigation
    const navigate=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
    },[navigate])
    
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper
