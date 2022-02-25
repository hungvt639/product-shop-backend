import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/mysql";

class Permission extends Model {
    declare id: number;
}

Permission.init(
    {
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        code: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {
        sequelize,
        modelName: "permissions",
    }
);

export default Permission;
