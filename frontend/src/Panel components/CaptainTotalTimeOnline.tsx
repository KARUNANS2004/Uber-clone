import { useEffect, useState } from 'react'

const CaptainTotalTimeOnline = () => {
    const [timeOnline, settimeOnline] = useState('00:00:00')

    useEffect(() => {
        const start = localStorage.getItem('captainOnlineStartTime')
        if (!start) {
            return
        }

        const starttime = new Date(start)

        const interval = setInterval(() => {
            const now = new Date()

            const diff = now.getTime() - starttime.getTime();

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            settimeOnline(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            )
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    return (
        <>{timeOnline}</>
    )
}

export default CaptainTotalTimeOnline
