const axios = require('axios');
const captainModel = require('../models/captain.model'); // Assuming you have a Captain model defined

module.exports.getAddressCoordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);

        if (response.data.length > 0) {
            const location = response.data[0];

            return {
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};


module.exports.getDistanceTime = async (pickupCoords, destinationCoords) => {
    if (!pickupCoords || !destinationCoords) {
        throw new Error('pickup and destination coordinates are required');
    }

    const apiKey = '5b3ce3597851110001cf62485187a523533f4d53bc882c761be8ad89'; // Replace with your ORS API Key
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${pickupCoords.lng},${pickupCoords.lat}&end=${destinationCoords.lng},${destinationCoords.lat}`;

    try {
        const res = await axios.get(url);        

        if (res.data && res.data.features.length > 0) {
            const route = res.data.features[0].properties.summary;
            return {
                distance: route.distance/1000, //  meters 
                duration: route.duration/60, //  seconds
            };
        } else {
            throw new Error('No routes available');
        }
    } catch (err) {
        console.error("Error fetching distance & time:", err.response?.data || err.message);
        throw err;
    }
};



module.exports.getAutocompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const apiKey = '5b3ce3597851110001cf62485187a523533f4d53bc882c761be8ad89'; // Your OpenRouteService API Key

    const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(input)}`;

    try {
        const response = await axios.get(url);

        if (response.data && response.data.features.length > 0) {
            return response.data.features.map(place => ({
                name: place.properties.label,
                coordinates: place.geometry.coordinates
            }));
        } else {
            throw new Error('No suggestions found');
        }
    } catch (err) {
        console.error("Error fetching autocomplete suggestions:", err.message);
        throw err;
    }
};

// getting captains in radius


const toRad = (value) => (value * Math.PI) / 180;

const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};


module.exports.getCaptainInRadius=async(latitude, longitude, radius)=>{
    try {
        const allCaptains = await captainModel.find({
            'location.latitude': { $ne: null },
            'location.longitude': { $ne: null }
        });

        const nearbyCaptains = allCaptains.filter(captain => {
            const dist = getDistanceInKm(
                latitude,
                longitude,
                captain.location.latitude,
                captain.location.longitude
            );
            return dist <= radius;
        });

        return nearbyCaptains;
    } catch (err) {
        console.error("Error fetching captains in radius:", err.message);
        throw err;
    }

}