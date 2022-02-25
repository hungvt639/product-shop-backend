import { Sequelize } from "sequelize";
import env from "./env";
const sequelize = new Sequelize(
    env.MYSQL_DB,
    env.MYSQL_USERNAME,
    env.MYSQL_PASSWORD,
    {
        host: env.MYSQL_HOST,
        dialect: "mysql",
    }
);

export const connectMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection MySQL has been established successfully.");
    } catch (error) {
        console.error("Unable to connect MySQL to the database:", error);
    }
};
export default sequelize;
