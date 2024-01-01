import express from "express";
import cors from "cors";
import cookieParser from "cookie-parse"

const app = express();

// app.use(cors());  /* This will also work, but not professional */

// Cors set up
app.use(cors({
    origin: process.env.CORS_ORIGIN,  // Allowed URLs to use (Front end :) )
    credentials: true  // Allow credentials
}))

app.use(express.json({limit:"16kb"}))  // How much data at once 
app.use(express.urlencoded({extended: true, limit:"16kb"})) // To allow object inside object (Nested objects)
app.use(express.static("public")) // Use static files
// app.use(cookieParser()) // For cookies use

// Import routes
import userRouter from "./routes/user.routes.js";

// Routes declaration
// Activate userRouter on /user
// Means if we have /register on userRouter then url -> https://localhost:8000/api/v1/users/register
app.use('/api/v1/users', userRouter) 


export {app}