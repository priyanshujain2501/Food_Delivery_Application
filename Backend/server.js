import dotenv from 'dotenv'

//loading environment variable
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import {connectDB} from './database/db.js'
import foodRouter from './routes/food.route.js'
import userRouter from './routes/user.route.js'
import cartRouter from './routes/cart.route.js'
import orderRouter from './routes/order.route.js'


//app configuration
const app = express();





//middleware config
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/images",express.static("uploads"))
app.use(cors())
app.use(cookieParser())

//connect to database
connectDB()


//api endpoints
app.use('/api/food',foodRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);


app.listen(process.env.PORT || 3001,() => {
    console.log(`Server is running on https://localhost:${process.env.PORT}`)
})