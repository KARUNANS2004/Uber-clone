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

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride id"),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage("Invalid ride id"),
    query('otp').isString().isLength({min:6, max:6}).withMessage("Invalid otp"),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride id"),
    rideController.endRide
)

module.exports=router