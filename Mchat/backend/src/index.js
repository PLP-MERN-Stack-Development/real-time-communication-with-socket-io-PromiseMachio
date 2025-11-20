import express from 'express'; // Webframe work...
import authRouter from '../router/auth.router.js'
import dotenv from "dotenv"
import connectDB from '../lib/db.js';
import cookieParser from "cookie-parser";

// Create API to make the the server
dotenv.config()


const app = express();
const PORT = process.env.PORT 
app.use(express.json())
app.use(cookieParser());
// creating routers 
app.use('/api/auth',authRouter)

app.listen(PORT, ()=>{
    console.log("Server is up and running in port:"+ PORT)
})
connectDB()


    
