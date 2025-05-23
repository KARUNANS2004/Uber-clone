import React, { createContext, ReactNode, useState, useContext } from 'react';

// Type for the props
interface CaptainContextProps {
    children: ReactNode;
}

// Captain interface
export interface Captain {
    _id: string;
    email: string;
    fullName: {
        firstName: string;
        lastName: string;
    };
    status: string;
    vehicle: {
        color: string;
        plate: string;
        capacity: number;
        vehicleType: string;
    };
}

// Context type
interface CaptainContextType {
    captain: Captain;
    setCaptain: React.Dispatch<React.SetStateAction<Captain>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

// Initial state
const initialCaptainState: Captain = {
    _id: '',
    email: '',
    fullName: {
        firstName: '',
        lastName: '',
    },
    status: '',
    vehicle: {
        color: '',
        plate: '',
        capacity: 0,
        vehicleType: '',
    },
};

const initialLoadingState: boolean = false;

// Create context
export const CaptainContextData = createContext<CaptainContextType | null>(null);

// Provider component
const CaptainContext: React.FC<CaptainContextProps> = ({ children }) => {
    const [captain, setCaptain] = useState<Captain>(initialCaptainState);
    const [isLoading, setIsLoading] = useState<boolean>(initialLoadingState);
    console.log(isLoading)

    return (
        <CaptainContextData.Provider value={{ captain, setCaptain, setIsLoading }}>
            {children}
        </CaptainContextData.Provider>
    );
};

// Custom hook
export const useCaptainContext = (): CaptainContextType => {
    const context = useContext(CaptainContextData);
    if (!context) {
        throw new Error('useCaptainContext must be used within a CaptainContext provider');
    }
    return context;
};

export default CaptainContext;
