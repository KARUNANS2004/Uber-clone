import axios from "axios";
import React, { useContext, useState, createContext, ReactNode, useEffect } from "react";


interface Captain {
    fullName: {
        firstName: string;
        lastName: string;
    };
    email: string;
    status: string;
    vehicle: {
        color: string;
        plate: string;
        capacity: number;
        vehicleType: string;
    };
}


interface CaptainContextType {
    captain: Captain | null;
    setCaptain: React.Dispatch<React.SetStateAction<Captain | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: any;
    setError: React.Dispatch<React.SetStateAction<any>>;
    updateCaptain: (captainData: any) => void;
}

export const CaptainDataContext = createContext<CaptainContextType | null>(null);

interface captainContextProps {
    children: ReactNode
}

const CaptainContext: React.FC<captainContextProps> = ({ children }) => {
    const [captain, setCaptain] = useState<Captain | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateCaptain = (captainData: Captain) => {
        setCaptain(captainData);
    }

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext;