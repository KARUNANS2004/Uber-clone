import React, { useContext, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface CaptainProtectWrapperProps {
    children: React.ReactNode
}

const CaptainProtectWrapper: React.FC<CaptainProtectWrapperProps> = ({ children }) => {

    const { captain, setCaptain, isLoading, setIsLoading } = useContext(CaptainDataContext)


    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/captain-login')
        }
    }, [navigate])

    axios.get(`${import.meta.env.VITE_API_BASE_URI}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response) => {
        if (response.status === 200) {
            setCaptain(response.data.captain)
            setIsLoading(false)
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
