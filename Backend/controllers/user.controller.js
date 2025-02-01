const { validationResult } = require('express-validator')
const userModel=require('../models/user.model')
const userService=require('../services/user.services')
const blackListTokenModel=require('../models/blackListToken.model')

module.exports.registeredUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.loginUser= async (req,res,next)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors.array());
        return res.status(401).json({errors:errors.array()});
    }

    const {email,password}=req.body;

    const user=await userModel.findOne({email}).select('+password');

    if(!user){
        console.log('no user found ')
        return res.status(400).json({message:'Invalid email or password'});
    }

    const isMatch=user.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message:'Invalid email or password'});
    }

    const token=user.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token,user});
}

module.exports.getProfile=async (req,res,next)=>{

    res.status(200).json(req.user)
}

module.exports.logoutUser= async(req,res,next)=>{
    res.clearCookie('token')

    const token=req.cookies.token || req.header.authorization.split(' ')[1];

    await blackListTokenModel.create({token})

    res.status(200).json({message:'Logged Out'});
}