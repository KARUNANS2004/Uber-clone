// we will use (Context API) to manage the user state globally 

// we can also use Redux or MobX for state management

import React, { createContext, ReactNode, useState } from 'react'

// way to declare the type of children in ts+react
interface UserContextProps{
    children:ReactNode
}

interface User{
    email:string,
    fullName:{
        firstName:string,
        lastName:string
    }
}

interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Now lets make the context
export const UserContextData= createContext<UserContextType | undefined>(undefined)

const UserContext:React.FC<UserContextProps> = ({children}) => {
    const [user,setUser]=useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })

    return (
        <UserContextData.Provider value={{user,setUser}}>
            {children}
        </UserContextData.Provider>
    )
}

export default UserContext
