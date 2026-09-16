import jwt from "jsonwebtoken"
import type {StringValue} from "ms"


export function generateJwtToken(payload : any, jwtSecret:string, expiresIn : StringValue){
    const token =  jwt.sign({...payload}, jwtSecret, {
        expiresIn : expiresIn
    } )

    return token
}