import { Request, Response } from "express";
import { createUserInput } from "../../schemas/auth.schema.js";
import { User } from "../../models/user.model.js";
import ApiError from "../../lib/apiError.js";
import { generateHash } from "../../lib/hash.js";
import { generateJwtToken } from "../../lib/generateJwtToken.js";


export async function signUpController(req:Request, res: Response){

       const {age,email,firstName, lastName, password, role}:createUserInput = req.body;
       const normalizedEmail = email.toLowerCase().trim();

       const isUserAlreadyExists = await User.findOne({email : normalizedEmail})
       if(isUserAlreadyExists){
         throw new ApiError(409, "user already exist", [])
       }

       const hash = await generateHash(password)
       const newlyCreatedUser = await User.create({
         email : normalizedEmail,
         password: hash,
         firstName: firstName,
         lastName,
         age : age,
         role : role,
         isEmailVerified : false,
         istowFactorEnambled : false
       })

       const accessToken = generateJwtToken({id : newlyCreatedUser._id}, process.env.JWT_ACCESS_TOKEN_SECRET!, "15m")

       res.cookie("access_token", accessToken, {
        httpOnly : true,
        secure : true,
        sameSite : "strict",
        maxAge : 15 * 60 * 1000
       })

       return res.status(201).json({
        status : "success",
        message : "user created successfully",  
        user : {
          id : newlyCreatedUser._id,
          email : newlyCreatedUser.email,
          firstName : newlyCreatedUser.firstName, 
          lastName : newlyCreatedUser.lastName,
          age : newlyCreatedUser.age,
          role : newlyCreatedUser.role,
          isEmailVerified : newlyCreatedUser.isEmailVerified,
          istowFactorEnambled : newlyCreatedUser.istowFactorEnambled,
          createdAt : newlyCreatedUser.createdAt, 
          accessToken 
        }
       })
}
