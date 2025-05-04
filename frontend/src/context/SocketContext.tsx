import React, { Children, createContext, ReactNode, useEffect } from 'react'
import { io } from "socket.io-client"

export const SocketContext = createContext<{
    sendMessage: (eventName: string, message: any) => void;
    receiveMessage: (eventName: string, callback: (...args: any) => void) => void;
} | null>(null);


const socket = io(`http://localhost:4000`)

interface socketProviderProps {
    children: ReactNode
}

const SocketProvider: React.FC<socketProviderProps> = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected To Server')
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from server')
        })
    }, [])

    const sendMessage = (eventName: string, message: any) => {
        console.log(message)
        socket.emit(eventName, message)
    }

    const receiveMessage = (eventName: string, callback: (...args: any) => void) => {
        socket.on(eventName, callback)
    }

    return (
        <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;