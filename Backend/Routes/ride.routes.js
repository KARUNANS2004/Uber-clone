const express = require('express')
const router=express.Router()
const rideController=require('../controllers/ride.controller')
const authMiddleware=require('../middlewares/auth.middleware')

const {body,query} = require('express-validator');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup location'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination location'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/get-fare', 
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup location'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination location'),
    rideController.getfare
)

module.exports=router