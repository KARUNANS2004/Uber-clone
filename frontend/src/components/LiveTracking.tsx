import { useState, useEffect, useCallback } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
} from '@vis.gl/react-google-maps';

const containerStyle = {
    width: '100%',
    height: '100vh',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    const updatePosition = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude,
                    });
                },
                (error) => {
                    console.error('Error getting current position:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude,
                });
            });

            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude,
                    });
                },
                (error) => {
                    console.error('Error watching position:', error);
                }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(updatePosition, 15000); // update every 5 seconds
        return () => clearInterval(intervalId);
    }, [updatePosition]);

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
                center={currentPosition}
                defaultZoom={16}
                mapId={'user-home-screen-map'}
                gestureHandling="greedy"
                disableDefaultUI={false} // Optional: shows default map UI controls
                style={containerStyle}
            >
                <AdvancedMarker position={currentPosition} title="Your Location">
                    <Pin background={'#E55050'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            </Map>
        </APIProvider>
    );
};

export default LiveTracking;
