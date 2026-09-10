import dotenv from "dotenv"
import connectDB from "./config/db.js"
import http from "http"
import app from "./app.js"
import dns from "node:dns"

dns.setServers(["1.1.1.1", "8.8.8.8"])

dotenv.config()

const PORT = process.env.PORT || 5000

async function startServer() {
      await connectDB()

      const server = http.createServer(app)

      server.listen(PORT, ()=>{
        console.log("Server is now listning to port", PORT)
      })
}


startServer().catch((err)=>{
    console.error("Error while starting the server", err)
    process.exit(1)
})