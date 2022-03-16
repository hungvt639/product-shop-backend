import nodemailer from "nodemailer";
import env from "./env";
const smtp = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.NODE_ENV !== "development",
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
    },
});
export default smtp;
