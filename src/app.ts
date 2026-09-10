import express from "express"
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json())
app.use(cookieParser())

app.get("/helth", (req,res)=>{
    res.json({status : "OK"})
})

export default app