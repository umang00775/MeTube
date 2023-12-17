import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // File system - Comes by default with nodejs, helps to manage files
          
// This code pasted from cloudinary console :) 
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// This function takes time -> So async :)
// 
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        // Upload the file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // File uploaded
        console.log("File uploaded successfully!! \nUrl: ", response.url);

        return response;
    } catch (error) {
        // Unlink the file
        // Remove the locally saved temporary file, as the upload failed
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}