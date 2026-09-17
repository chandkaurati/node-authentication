import express from "express"
import cookieParser from "cookie-parser"
import errorHandler from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js"

const app = express();

app.use(express.json())
app.use(cookieParser())

app.get("/helth", (req,res)=>{
    res.json({status : "OK"})
})

app.use("/api/auth", authRouter)


app.use(errorHandler)

export default app