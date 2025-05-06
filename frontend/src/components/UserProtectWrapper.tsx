import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { UserContextData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface userProtectWrapperProps {
    children: ReactNode
}

const UserProtectWrapper: React.FC<userProtectWrapperProps> = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const userContext = useContext(UserContextData)

    if (!userContext) {
        throw new Error('UserContextData must be used within a UserContextProvider')
    }

    const { user, setUser } = userContext
    console.log(user)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        axios.get(`http://localhost:4000/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [token])

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

export default UserProtectWrapper