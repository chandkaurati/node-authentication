import type {Channel} from "amqplib"

const EMAIL_QUEUE = "email_queue"

export async function  publishEmail(
    channel : Channel,
    emailData : {
        to : string,
        subject : string,
        text : string,
        html : string
    }
){
    channel.sendToQueue(
        EMAIL_QUEUE,
        Buffer.from(JSON.stringify(emailData)),
        {
            persistent : true
        }
    )

    console.log("email published")
}