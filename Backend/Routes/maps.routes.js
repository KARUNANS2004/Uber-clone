const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller');
const { query } = require('express-validator');
const { validationResult } = require('express-validator');

router.get('/get-coordinates',// Moved to the beginning
    [query('address').isString().isLength({ min: 3 })],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    mapController.getCoordinates
);

router.get('/get-estimated-time',
    [query('origin').isString().isLength({min:3})],
    [query('destination').isString().isLength({min:3})],
    [query('key').isString().isLength({min:3})],
    (req,res,next)=>{
        const erros=validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({errors:erros.array()});
        }
        next();
    },
    mapController.getEstimatedTime
)


router.get('/get-distance-time',
    query('pickup').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    mapController.getDistanceTime
)

router.get('/get-suggestion',
    query('input').isString(),
    authMiddleware.authUser,
    mapController.getAutocompleteSuggestion
)

module.exports = router;