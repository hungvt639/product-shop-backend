import mongoose, { SchemaDefinitionProperty, ObjectId } from "mongoose";
import env from "../../config/env";

const Schema = mongoose.Schema;

const Permission = {
    USER: "USER",
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN",
};

export interface UserInterface {
    _id: ObjectId;
    email: SchemaDefinitionProperty<{ type: String; required: true }>;
    username: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    password: SchemaDefinitionProperty<{ type: String; required: true }>;
    fullname?: String;
    avatar?: SchemaDefinitionProperty<String>;
    permission: SchemaDefinitionProperty<{ type: String; required: true }>[];
}

interface UserModelMethod {
    permission?: typeof Permission;
    verifyPermission?: (per: string) => boolean;
}

const User = new Schema<UserInterface>(
    {
        email: { type: String, required: true, unique: true },
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: 200,
        },
        password: { type: String, required: true, maxlength: 2000 },
        fullname: String,
        avatar: { type: String, default: env.AVATAR_DEFAULT },
        permission: [{ type: String, default: Permission.USER }],
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const UserModel: mongoose.Model<UserInterface> & UserModelMethod =
    mongoose.model("User", User);
UserModel.permission = Permission;
UserModel.verifyPermission = (per: string) => {
    for (const [key, value] of Object.entries(Permission)) {
        if (value === per) {
            return true;
        }
    }
    return false;
};
export default UserModel;
