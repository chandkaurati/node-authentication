import {z} from "zod"


export const createUserSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.email(),
    password : z.string().min(6),
    age : z.number().int().min(18).max(100),
    role : z.enum(["user", "admin"]).default("user")
})

export type createUserInput  = z.infer<typeof createUserSchema>