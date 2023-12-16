class ApiError extends Error{ // Extend errors from Node.js (https://nodejs.org/api/errors.html)
    constructor(
        statusCode, 
        message = "Something went wrong",
        errors = [],
        stack  = ""
    ){
        super(message) //Override message with super call

        // Override values in Error class
        this.statusCode = statusCode
        this.data  = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.costructor) // Show files and points of error/s
        }
    }
}

export {ApiError}