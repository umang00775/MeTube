import mongoose, {Schema} from "mongoose";  // This Schema is called destructure (So we can use it without mongoose.Schema)
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // To optimize search (It is costly, so don't use it everywhere)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,  // Cloudinary url
        required: true,
    },
    coverImage: {
        type: String,  // Cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){  // Check if the password is modified or not
        this.password = bcrypt.hash(this.password, 10) // Hash the password with 10 rounds
    }
    next() // Pass to next :)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password) // (Entered pass, pass in user's context (DB)) and returns true/false
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        // 1) This is payload section, the more payload, the best :)
        {
            _id: this._id, // Id from mongoDB
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },

        // 2) Access token 
        process.env.ACCESS_TOKEN_SECRET,

        // 3) Expiry 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        // 1) This is payload section, We keep refresh payload small
        {
            _id: this._id
        },

        // 2) Refresh token 
        process.env.REFRESH_TOKEN_SECRET,

        // 3) Expiry 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)