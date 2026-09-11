import { NextFunction, Request, Response } from "express";
import ApiError from "../lib/apiError.js";

function errorHandler(err: Error, req: Request, res:Response, next: NextFunction){
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            ...err
        })
    }

    return res.status(500).json({
        success : false,
        messsage : "Internal Server Error"
    })
}

export default errorHandler