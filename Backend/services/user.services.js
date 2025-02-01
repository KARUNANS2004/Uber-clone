const userModel=require('../models/user.model')

module.exports.createUser=async({firstName,lastName,password,email})=>{
    if(!firstName || !email || !password){
        throw new Error("All fields are required")
    }

    const user=new userModel({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    })

    await user.save();
    return user;
}