import dotenv from "dotenv"
dotenv.config()
import connectRabbitMQ from "../config/rabbitmq.js";
import { sendEmail } from "../services/email.service.js";

async function startEmailWorker(){
    console.log(process.env.RABBITMQ_URL)
    const {channel} = await connectRabbitMQ()
    // return
    channel.consume("email_queue", async(message)=>{
        if(!message) return;
        const emailData = JSON.parse(message?.content.toString()!);
        await sendEmail(
            emailData.to,
            emailData.subject,
            emailData.text,
            emailData.html
        )

        channel.ack(message)
    })

    console.log("email worker is listning")
}

startEmailWorker().catch((error)=> {
    console.error("Email worker error:,", error)
    process.exit(1)
})