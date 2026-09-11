import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import ApiError from "../lib/apiError.js";
import { asyncHanlder } from "../lib/asyncHanlder.js";

export function validateUserData(schema: z.ZodType){
   return asyncHanlder(async(req : Request, res: Response, next:NextFunction)=>{
      const result = await schema.safeParseAsync(req.body);
      if(!result.success){
        throw new ApiError(422, "invalid input format", [
            ...result.error.issues
        ], "Validation Error")
      } 
      req.body = result.data;
      return next()
   })
}