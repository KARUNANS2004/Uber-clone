const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors');
const express=require('express');
const app=express();
const connectToDb=require('./database/database')
const cookieParser=require('cookie-parser')

const userRoutes=require('./Routes/user.routes')
const captainRoutes=require('./Routes/captain.routes')
const mapsRoutes=require('./Routes/maps.routes')
const rideRoutes=require('./Routes/ride.routes')



connectToDb();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('Hello');
})

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)


module.exports=app