import { NextFunction, Request, RequestHandler, Response } from "express";


export function asyncHanlder(requestHandler:RequestHandler){
    return (req:Request, res:Response, next:NextFunction)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=> next(err))
    }
}
