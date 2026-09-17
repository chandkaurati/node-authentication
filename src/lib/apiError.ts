import { error } from "node:console";

class ApiError extends Error {
    statusCode : number;
    success : boolean;
    data : any;
    errors : any[];
    errorType : string
    message : string;

    constructor(statusCode : number, message : string, errors : any[], errorType = "", stack = ""){
        super(message)
        this.statusCode = statusCode
        this.success = false;
        this.data = null;
        this.errors = errors
        this.errorType = errorType
        this.message = message;
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
        
        Object.setPrototypeOf(this, ApiError.prototype)
    }
}

export default ApiError