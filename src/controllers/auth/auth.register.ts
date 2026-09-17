import { Request, Response } from "express";
import { createUserInput } from "../../schemas/auth.schema.js";
import { User } from "../../models/user.model.js";
import ApiError from "../../lib/apiError.js";
import { generateHash } from "../../lib/hash.js";
import { generateJwtToken } from "../../lib/generateJwtToken.js";
import { publishEmail } from "../../queues/email.producer.js";
import verifyEmailTemplate from "../../templates/verify.email.js";


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

       const verificationToken = generateJwtToken({id : newlyCreatedUser._id}, process.env.JWT_VERIFICATION_TOKEN_SECRET!, "1d" )

       const tokenHash = await generateHash(verificationToken, 10)
       
       newlyCreatedUser.emailVerificationToken = tokenHash
       newlyCreatedUser.emailVerificationTokenExpires = new Date( Date.now() + 24 * 60 * 60 * 1000)

       await newlyCreatedUser.save()

       const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
       const channel = req.app.locals.rabbitmqChannel

       await publishEmail(channel, {
         to : newlyCreatedUser.email,
         subject : "Verify email",
         text: `Verify your email using this link: ${verificationUrl}`,
         html : verifyEmailTemplate(verificationUrl)
       } )

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
        }
       })
}
