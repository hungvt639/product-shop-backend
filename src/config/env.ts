import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT || 3000;
const MONGO_DB = process.env.MONGO_DB || "";
const SECRET = process.env.SECRET;
const SECRET_ACTIVATE_USER = process.env.SECRET_ACTIVATE_USER;
const SECRET_RESET_PASSWORD = process.env.SECRET_RESET_PASSWORD;

const AVATAR_DEFAULT =
    process.env.AVATAR_DEFAULT || "https://i.imgur.com/PID2X3i.png";

const PAGE_DEFAULT = "1";
const LIMIT_DEFAULT = "10";

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USERNAME = process.env.MYSQL_USERNAME || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_DB = process.env.MYSQL_DB || "auth-jwt";

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT) | 0;

const CORS_ORIGIN = (process.env.CORS_ORIGIN || "")
    .split(" ")
    .map((o) => new RegExp(o));
const FRONTEND = process.env.FRONTEND;
const ROUTER_ACTIVATE_USER = "activate-user";
const ROUTER_RESET_PASSWORD = "reset-password";

const KEY_ACTIVATE_USER = "active_token";
const KEY_RESET_PASSWORD = "reset_password_token";

const APIV1 = "/apiv1";
const APIV1_1 = "/apiv1-1";

export default {
    NODE_ENV,
    PORT,
    MONGO_DB,
    SECRET,
    SECRET_ACTIVATE_USER,
    SECRET_RESET_PASSWORD,
    AVATAR_DEFAULT,
    PAGE_DEFAULT,
    LIMIT_DEFAULT,
    MYSQL_HOST,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_DB,
    EMAIL_HOST,
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_PORT,
    FRONTEND,
    ROUTER_ACTIVATE_USER,
    ROUTER_RESET_PASSWORD,
    KEY_ACTIVATE_USER,
    KEY_RESET_PASSWORD,
    APIV1,
    APIV1_1,
    CORS_ORIGIN,
};
