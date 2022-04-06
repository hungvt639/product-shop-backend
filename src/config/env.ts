import dotenv from "dotenv";
dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV,

    PORT: process.env.PORT || 3000,
    MONGO_DB: process.env.MONGO_DB || "",
    SECRET: process.env.SECRET,
    SECRET_ACTIVATE_USER: process.env.SECRET_ACTIVATE_USER,
    SECRET_RESET_PASSWORD: process.env.SECRET_RESET_PASSWORD,

    AVATAR_DEFAULT:
        process.env.AVATAR_DEFAULT || "https://i.imgur.com/PID2X3i.png",

    PAGE_DEFAULT: "1",
    LIMIT_DEFAULT: "10",

    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_PORT: parseInt(process.env.EMAIL_PORT || "0"),
    SHIP: parseInt(process.env.SHIP || "30000"),

    ECONNREFUSED: process.env.ECONNREFUSED,
    CORS_ORIGIN: (process.env.CORS_ORIGIN || "")
        .split(" ")
        .map((o) => new RegExp(o)),
    FRONTEND: process.env.FRONTEND,
    IMGUR_ID: process.env.IMGUR_ID,

    APIV1: "/apiv1",

    SHOP_NAME: process.env.SHOP_NAME || "",
};
