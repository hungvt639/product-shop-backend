import smtp from "../../config/nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

export type OptionEmail = {
    to?: string | Address | Array<string | Address> | undefined;
    subject?: string;
    template?: "activate-user" | "reset-password";
    context: {
        fullname?: string;
        href?: string;
    };
};

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve("src", "apiv1", "template"),
        defaultLayout: false,
    },
    viewPath: path.resolve("src", "apiv1", "template"),
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
