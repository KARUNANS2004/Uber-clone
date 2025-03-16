const rideModel=require('../models/ride.model');
const mapService=require('../services/maps.service');
const crypto=require('crypto');

async function getFare(pickup,destination){
    if(!pickup || !destination){
        return 'Pickup and Destination are required'
    }

    const pickupCoords = await mapService.getAddressCoordinates(pickup);
    const destinationCoords = await mapService.getAddressCoordinates(destination);

    const distanceTime=await mapService.getDistanceTime(pickupCoords,destinationCoords);

    const baseFare = {
        auto: 20,
        car: 50,
        motorcycle: 15
    };

    const perKmRate = {
        auto: 10,
        car: 20,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 1,
        car: 2,
        motorcycle: 0.5
    };

    const fare = {
        auto: (baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.duration * perMinuteRate.auto)).toFixed(2),
        car: (baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.duration * perMinuteRate.car)).toFixed(2),
        motorcycle: (baseFare.motorcycle + (distanceTime.distance * perKmRate.motorcycle) + (distanceTime.duration * perMinuteRate.motorcycle)).toFixed(2)
    };

    return fare;

}

module.exports.getFare=getFare;


function getOTP(num){ 
    const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}

module.exports.createRide = async ({
    user,pickup,destination,vehicleType,
})=>{
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }

    const fare=await getFare(pickup,destination);

    const ride=rideModel.create({
        user,
        pickup,
        destination,
        otp:getOTP(6),
        fare: fare[vehicleType]
    })

    return ride;
}

