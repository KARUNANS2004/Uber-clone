const userModel=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const blackListTokenModel=require('../models/blackListToken.model')
const captainModel = require('../models/captain.model')

module.exports.authUser= async (req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Unauthorized access'});
    }

    const isBlackListed=await blackListTokenModel.findOne({token:token});

    if(isBlackListed){
        res.status(401).json({message:'Unauthorized Access'});
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);

        req.user=user

        return next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized Access"})
    }
}

module.exports.authCaptain=async (req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized acces"});
    }

    const isBlackListed=await blackListTokenModel.findOne({token:token});
    if(isBlackListed){
        return res.status(401).json({message:"Unauthorized Access"});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decoded._id);

        req.captain=captain;
        return next();
    } catch (error) {
        res.status(401).json({message:"Unauthorized Access"});
    }

}