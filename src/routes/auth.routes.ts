import { Router } from "express";
import { validateUserData } from "../middlewares/validateUserData.js";
import { signUpController } from "../controllers/auth/auth.register.js";
import { createUserSchema } from "../schemas/auth.schema.js";
import { asyncHanlder } from "../lib/asyncHanlder.js";

const router = Router()

router.post("/signup", validateUserData(createUserSchema), asyncHanlder(signUpController) )

export default router  