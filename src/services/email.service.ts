import "dotenv/config"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host :process.env.SMTP_HOST,
    port : Number(process.env.SMTP_PORT),
    secure : false,
    auth : {
        user : process.env.SMTP_USERNAME,
        pass : process.env.SMTP_PASSWORD
    }
})

export const sendEmail = async(
    to : string,
    subject : string,
    text : string,
    html : string
)=>{
    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        text,
        html
    })
}