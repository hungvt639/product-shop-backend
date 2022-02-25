import { Model, DataTypes, CreateOptions } from "sequelize";
import sequelize from "../../config/mysql";
import bcrypt from "bcrypt";
import Permission from "./permission";

class User extends Model {
    declare id: number;
}

User.init(
    {
        username: { type: DataTypes.STRING, unique: true, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        fullname: { type: DataTypes.STRING },
        avatar: { type: DataTypes.STRING },
    },
    {
        sequelize,
        modelName: "users",
    }
);

User.addHook("beforeCreate", "bcrypt", (user: any) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
});

User.hasMany(Permission, {
    foreignKey: "permissions",
});

export default User;
