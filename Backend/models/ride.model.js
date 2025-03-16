const mongoose=require('mongoose');

const rideSchema=new mongoose.Schema({
    user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Captain',
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['Pending','Accepted',"ongoing",'Completed','cancelled'],
        default:'Pending'
    },
    duration:{
        type:Number
    },
    distance:{
        type:Number
    },
    paymentID:{
        type:String
    },
    orderID:{
        type:String,
    },
    Signature:{
        type:String
    },
    otp:{
        type:String,
        select:false,
        required:true,
    }
})

module.exports=mongoose.model('Ride',rideSchema);