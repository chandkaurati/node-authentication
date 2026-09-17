import amqp from "amqplib"


const  QUEUE_NAME = "email_queue"

async function connectRabbitMQ(){
     try {
        const connection = await amqp.connect(
        process.env.RABBITMQ_URL!
    )

    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, {
        durable : true,
    })

    console.log("RabbitMq connected")
    console.log(QUEUE_NAME, "queue is ready")
    return {connection, channel}
     } catch (error) {
       console.log(error) 
       throw error
     }
}


export default connectRabbitMQ