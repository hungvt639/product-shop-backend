import nodemailer from "nodemailer";
declare const smtp: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export default smtp;
