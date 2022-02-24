const PORT = process.env.PORT || 3000;
const MONGO_DB = process.env.MONGO_DB || "";
const SECRET = process.env.SECRET || "123456789";
const AVATAR_DEFAULT =
    process.env.AVATAR_DEFAULT || "https://i.imgur.com/PID2X3i.png";

const PAGE_DEFAULT = "1";
const LIMIT_DEFAULT = "10";

export default {
    PORT,
    MONGO_DB,
    SECRET,
    AVATAR_DEFAULT,
    PAGE_DEFAULT,
    LIMIT_DEFAULT,
};
