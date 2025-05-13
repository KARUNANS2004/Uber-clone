import { useEffect, useRef, useState } from "react"

function toRad(value: number) {
    return (value * Math.PI) / 180;
}

function haversineDistance(coords1: any, coords2: any): number {
    const R = 6371;
    const dLat = toRad(coords2.latitude - coords1.latitude)
    const dLon = toRad(coords2.longitude - coords1.longitude)

    const lat1 = toRad(coords1.latitude)
    const lat2 = toRad(coords2.latitude)

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

const CaptainDistanceTracker = () => {
    const [totalDistance, setTotalDistance] = useState(0);
    const prevPosition = useRef<{ latitude: number, longitude: number } | null>(null)

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newPos = { latitude, longitude };
                if (prevPosition.current) {
                    const distance = haversineDistance(prevPosition.current, newPos);

                    setTotalDistance((prev) => prev + distance)
                }

                prevPosition.current = newPos
            },
            (err) => {
                console.error("Location error: ", err)
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );

        return () => navigator.geolocation.clearWatch(watchId)
    }, [])
    return (
        <>
            {totalDistance.toFixed(2)}
        </>
    )
}

export default CaptainDistanceTracker
