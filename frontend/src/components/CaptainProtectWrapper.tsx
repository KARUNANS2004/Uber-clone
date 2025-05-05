import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCaptainContext } from '../context/CaptainContext';

interface CaptainProtectWrapperProps {
    children: React.ReactNode;
}

const CaptainProtectWrapper: React.FC<CaptainProtectWrapperProps> = ({ children }) => {
    const captainContext = useCaptainContext()
    const navigate = useNavigate();

    // Fallback if context is undefined
    if (!captainContext) {
        throw new Error('CaptainProtectWrapper must be used within a CaptainDataProvider');
    }

    const { captain, setCaptain, isLoading, setIsLoading } = captainContext;

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/captain-login');
            return;
        }

        const fetchCaptainProfile = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URI}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setCaptain(response.data.captain);
                } else {
                    throw new Error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Error fetching captain profile:', error);
                localStorage.removeItem('token');
                navigate('/captain-login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptainProfile();
    }, [navigate, setCaptain, setIsLoading]);

    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center text-lg font-medium">Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
