export declare type OptionEmail = {
    to?: string | Address | Array<string | Address> | undefined;
    subject?: string;
    template?: "activate-user" | "reset-password" | "order";
    context: {
        fullname?: string;
        href?: string;
        message?: string;
    };
};
interface Address {
    name: string;
    address: string;
}
declare function SendMail(option: OptionEmail): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export default SendMail;
