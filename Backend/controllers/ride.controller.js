const rideService=require('../services/ride.service')
const {validationResult}=require('express-validator')
const mapService= require('../services/maps.service')
const {sendMessageToSocketId} =require('../socket')
const rideModel = require('../models/ride.model')

module.exports.createRide=async (req,res)=>{
    const errors=validationResult(req);
    console.log(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {userId,pickup,destination,vehicleType}=req.body

    try {
        const ride=await rideService.createRide({
            user:req.user._id,
            pickup,
            destination,
            vehicleType
        })
        res.status(201).json(ride)

        const pickupCoordinates= await mapService.getAddressCoordinates(pickup)

        const captainsInRadius=await mapService.getCaptainInRadius(pickupCoordinates.lat, pickupCoordinates.lng,2000)
        ride.otp="";

        const rideWithUser=await rideModel.findById(ride._id).populate('user')

        captainsInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:rideWithUser
            })
        })
        console.log('Captains in radius'+ captainsInRadius)
    } catch (err) {
        console.log('error at controller line 21',err)
        return res.status(500).json({message:err.message})
    }
}


//


module.exports.getfare=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {pickup,destination}=req.query

    try {
        const fare= await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.log('error at ride controller line 45',error)
        return res.status(500).json({message:error.message})
    }
}

module.exports.confirmRide=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {rideId}=req.body

    try {
        const ride=await rideService.confirmRide({rideId,captainId:req.captain._id})

        sendMessageToSocketId(ride.user.socketID,{
            event:"ride-confirmed",
            data:ride
        })

        console.log(ride)

        return res.status(200).json(ride)
    } catch (error) {
        console.log('error at ride controller line 60',error)
        return res.status(500).json({message:error.message})
    }
}

module.exports.startRide=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {rideId,otp}=req.query

    try {
        const ride=await rideService.startRide({rideId,otp,captain:req.captain})

        sendMessageToSocketId(ride.user.socketID,{
            event:"ride-started",
            data:ride
        })

        return res.status(200).json(ride)
    } catch (error) {
        console.log('error at ride controller line 75',error)
        return res.status(500).json({message:error.message})
    }
}

module.exports.endRide= async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {rideId}=req.body

    try {
        const ride=await rideService.endRide({rideId,captain:req.captain._id})

        sendMessageToSocketId(ride.user.socketID,{
            event:"ride-ended",
            data:ride
        })

        return res.status(200).json(ride)
    } catch (error) {
        console.log('error at ride controller line 90',error)
        return res.status(500).json({message:error.message})
    }
}