import { useEffect, useState } from 'react';
import { useCaptainContext } from '../context/CaptainContext';
import CaptainTotalTimeOnline from './CaptainTotalTimeOnline';

const CaptainDetails = () => {
    const { captain } = useCaptainContext(); // clean hook usage
    const [captainFirstName, setCaptainFirstName] = useState('');
    const [captainLastName, setCaptainLastName] = useState('');

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && captain?.fullName?.firstName) {
                setCaptainFirstName(captain.fullName.firstName);
                setCaptainLastName(captain.fullName.lastName);
            }
        };

        if (captain?.fullName?.firstName) {
            handleVisibilityChange();
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [captain]);

    if (!captain._id) return <div>Loading...</div>; // ensures valid captain object

    return (
        <div>
            <div className='flex flex-wrap items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img
                        className='h-16 w-16 rounded-full object-cover'
                        src='https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg'
                        alt='Captain'
                    />
                    <h4 className='text-lg font-medium capitalize'>
                        {captainFirstName + ' ' + captainLastName}
                    </h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹295.20</h4>
                    <p className='text-sm font-medium text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-4 items-start'>
                <div className='text-center'>
                    <i className='text-3xl mb-2 font-extralight ri-timer-2-line'></i>
                    <h5 className='text-lg font-medium'><CaptainTotalTimeOnline /></h5>
                    <p className='text-sm text-gray-600'>Time Online</p>
                </div>
                <div className='text-center'>
                    <i className='text-3xl mb-2 font-extralight ri-booklet-line'></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Distance Travelled</p>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;
