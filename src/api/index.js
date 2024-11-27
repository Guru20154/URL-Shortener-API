import dotenv from "dotenv"; 
import connectDB from "../db/index.js";
import {app} from '../app.js';

dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("MONGO ERROR: ", error)
        throw error
    })
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`Listening on port: ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("MONGO DB connection failed: ", err)
})
