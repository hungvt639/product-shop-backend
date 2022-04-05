import mongoose, { SchemaDefinitionProperty, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import envV1 from "../../config/_envV1";
import env from "../../../config/env";

const Schema = mongoose.Schema;

export class User {
    _id?: ObjectId;
    email: SchemaDefinitionProperty<{ type: String; required: true }>;
    username: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    password: SchemaDefinitionProperty<{ type: String; required: true }>;
    fullname?: String;
    avatar?: SchemaDefinitionProperty<String>;
    isActivate: boolean;
    timeResetPassword?: Number;
    permissions: String[];
    groups: String[];

    constructor({ email, username, password, fullname, avatar }) {
        const salt = bcrypt.genSaltSync(10);
        this.email = email;
        this.username = username;
        this.password = bcrypt.hashSync(password, salt);
        this.fullname = fullname;
        this.avatar = avatar;
    }
}

interface UserUtils {
    // permission?: typeof Permission;
    // verifyPermission?: (per: string) => boolean;
    getProfile?: (filter, select) => any;
}

const UserSchema = new Schema<User>(
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
        isActivate: { type: Boolean, default: false },
        timeResetPassword: Number,
        permissions: [{ type: String, ref: envV1.model.PERMISSION }],
        groups: [{ type: String, ref: envV1.model.GROUP }],
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const UserModel: mongoose.Model<User> & UserUtils = mongoose.model(
    envV1.model.USER,
    UserSchema
);

// // UserModel.permission = Permission;
// UserModel.verifyPermission = (per: string) => {
//     // for (const [key, value] of Object.entries(Permission)) {
//     //     if (value === per) {
//     //         return true;
//     //     }
//     // }
//     return false;
// };
UserModel.getProfile = (id, options = "") => {
    return UserModel.findById(id, options)
        .populate("permissions")
        .populate("groups")
        .populate({
            path: "groups",
            populate: { path: "permissions" },
        });
};
export default UserModel;
