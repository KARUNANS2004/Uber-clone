const { ExpressValidator } = require('express-validator')
const mapService=require('../services/maps.service')
const {validationResult} =require('express-validator')
const axios = require('axios');
require('dotenv').config()



module.exports.getCoordinates=async (req,res,next)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const {address}=req.query

    try{
        const coordinates=await mapService.getAddressCoordinates(address)
        res.status(200).json(coordinates);
    }catch(err){
        res.status(404).json({message: 'Coordinate not found'});
    }
}


module.exports.getEstimatedTime=async (req,res,next)=>{
    const {origin,destination}= req.query;

    if (!origin || !destination) {
        return res.status(400).json({ error: "Missing origin or destination" });
    }

    try {
        const response=await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`,{
            params:{
                origins:origin,
                destinations:destination,
                key:process.env.GOOGLE_DISTANCE_MATRIX_API_KEY
            }
        });

        res.json(response.data)
    } catch (error) {
        console.error("Google Maps API error:", err.message);
        res.status(500).json({ error: "Failed to fetch distance data" });
    }
}


module.exports.getDistanceTime = async (req, res,next) => {
    try {
        const { pickup, destination } = req.query;

        // Fetch coordinates for both pickup and destination
        const pickupCoords = await mapService.getAddressCoordinates(pickup);
        const destinationCoords = await mapService.getAddressCoordinates(destination);

        // Construct coordinates in the required format for ORS API
        const pickupStr = `${pickupCoords.lng},${pickupCoords.lat}`;
        const destinationStr = `${destinationCoords.lng},${destinationCoords.lat}`;

        // Get distance and time
        const distanceTime = await mapService.getDistanceTime(pickupCoords, destinationCoords);

        res.json(distanceTime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.getAutocompleteSuggestion=async(req,res,next)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {input}=req.query;
        if (!input) {
            return res.status(400).json({ message: "Input query is required" });
        }

        const suggestions = await mapService.getAutocompleteSuggestions(input);
        res.status(200).json(suggestions);

    } catch (err) {
        console.error(err)
        res.status(400).json({message:'Internal server error'})
    }
}