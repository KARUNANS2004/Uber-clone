const express=require('express')
const router=express.Router();
const { body } =require('express-validator')
const userController=require('../controllers/user.controller')
const authMiddleware= require('../middlewares/auth.middleware')

router.post('/register',[
    body('email').
        isEmail().
        withMessage('Invalid email'),
    body('fullName.firstName').
        isLength({min:3}).
        withMessage('First name must be atleast 3 characters long'),
    body('password').
        isStrongPassword().
        isLength({min:6}).withMessage('Check your password again'),
], userController.registeredUser);

// login
router.post('/login',[
    body('email').
        isEmail().
        withMessage('Invalid Email'),

    body('password').
        isLength({min:6}).
        withMessage('Invalid Password')
],userController.loginUser);

// profile

router.get('/profile',authMiddleware.authUser,userController.getProfile);

// logout
router.get('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports=router;