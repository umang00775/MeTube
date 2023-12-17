import multer from "multer";

// Directly pasted from github
// Here cb = Call Back :)
const storage = multer.diskStorage({
    // req --> requests
    // file --> we can find all files here
    // cb --> Callback
    destination: function (req, file, cb) {
        // cb(error handle, destination)
        cb(null, "./public/temp") // We created this folder previously for temporary files
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // Study this later
        cb(null, file.originalname) // Upload file with original name, not good practice
    }
})
  
export const upload = multer({ storage }) // ES6 :) 