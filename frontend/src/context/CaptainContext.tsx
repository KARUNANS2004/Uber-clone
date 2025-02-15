import React, { useContext, useState, createContext } from "react";

export const CaptainDataContext = createContext<any>(null);

interface captainContextProps{
    children:React.ReactNode
}

export const useCaptain=()=>{
    const context=useContext(CaptainDataContext)
    if(!context){
        throw new Error ('useCaptain must be used within a CaptainProvider')
    }
    return context;
}

export const CaptainContext:React.FC<captainContextProps>=({children})=>{
    const [captain,setCaptain]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)

    const updateCaptain=(captainData:any)=>{
        setCaptain(captainData);
    }

    const value={
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }

    return(
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}