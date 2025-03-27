import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

interface CaptainProtectWrapperProps {
    children: React.ReactNode
}

const CaptainProtectWrapper: React.FC<CaptainProtectWrapperProps> = ({ children }) => {

    const captainContext = useContext(CaptainDataContext)

    const { captain, setCaptain, isLoading, setIsLoading } = captainContext || {}


    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/captain-login')
        }
    }, [navigate, localStorage])

    axios.get(`${import.meta.env.VITE_API_BASE_URI}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response) => {
        if (response.status === 200) {
            setCaptain && setCaptain(response.data.captain)
            setIsLoading && setIsLoading(false)
        }
    }).catch((err) => {
        console.log(err)
        localStorage.removeItem('token')
        navigate('/captain-login')
    })

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper
