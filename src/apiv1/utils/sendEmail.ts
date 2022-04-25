import smtp from "../../config/nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

export type OptionEmail = {
    to?: string | Address | Array<string | Address> | undefined;
    subject?: string;
    template?: "activate-user" | "reset-password" | "order";
    context: {
        fullname?: string;
        href?: string;
        message?: string;
    };
};

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve("template"),
        defaultLayout: false,
    },
    viewPath: path.resolve("template"),
};

smtp.use("compile", hbs(handlebarOptions));
interface Address {
    name: string;
    address: string;
}

async function SendMail(option: OptionEmail) {
    return await smtp.sendMail(option as any);
}
export default SendMail;
