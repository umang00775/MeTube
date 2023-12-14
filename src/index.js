import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js"; 

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Connected to port ${port}`);
    })
})
.catch((error) => {
    console.log("Connection failed!! \n", error);
})







/*
import mongoose from "mongoose";
import {DB_NAME} from './constants.js'
import express from "express";
import { config } from "dotenv";
config()

const app = express()

;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on ${process.env.PORT}`);
        })
    }
    catch(error){
        console.error("ERROR: ", error);
        throw error
    }
})()

*/