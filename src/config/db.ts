import mongoose  from "mongoose";

export async function connectDB() {
    try {
      
      const connectionInstance = await mongoose.connect(process.env.MONGO_URI!)
      console.log("MONGO DB CONNECTED SUCCESSFULLY !! on", connectionInstance.connection.host)


    } catch (error) {
        console.log("Mongodb connection error")
        console.error(error)
        process.exit(1)
    }
}

export default connectDB