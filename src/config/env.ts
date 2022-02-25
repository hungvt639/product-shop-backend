const PORT = process.env.PORT || 3000;
const MONGO_DB = process.env.MONGO_DB || "";
const SECRET = process.env.SECRET || "123456789";
const AVATAR_DEFAULT =
    process.env.AVATAR_DEFAULT || "https://i.imgur.com/PID2X3i.png";

const PAGE_DEFAULT = "1";
const LIMIT_DEFAULT = "10";

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USERNAME = process.env.MYSQL_USERNAME || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_DB = process.env.MYSQL_DB || "auth-jwt";

export default {
    PORT,
    MONGO_DB,
    SECRET,
    AVATAR_DEFAULT,
    PAGE_DEFAULT,
    LIMIT_DEFAULT,
    MYSQL_HOST,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_DB,
};
