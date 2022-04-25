"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const _envV1_1 = __importDefault(require("../../config/_envV1"));
const env_1 = __importDefault(require("../../../config/env"));
const Schema = mongoose_1.default.Schema;
class User {
    constructor({ email, username, password, fullname, avatar }) {
        const salt = bcrypt_1.default.genSaltSync(10);
        this.email = email;
        this.username = username;
        this.password = bcrypt_1.default.hashSync(password, salt);
        this.fullname = fullname;
        this.avatar = avatar;
    }
}
exports.User = User;
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 200,
    },
    password: { type: String, required: true, maxlength: 2000 },
    fullname: String,
    avatar: { type: String, default: env_1.default.AVATAR_DEFAULT },
    isActivate: { type: Boolean, default: false },
    timeResetPassword: Number,
    permissions: [{ type: String, ref: _envV1_1.default.model.PERMISSION }],
    groups: [{ type: String, ref: _envV1_1.default.model.GROUP }],
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const UserModel = mongoose_1.default.model(_envV1_1.default.model.USER, UserSchema);
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
exports.default = UserModel;
