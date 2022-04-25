/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { User } from "../../models/user/userModel";
declare class UserService {
    register(data: User): Promise<import("mongoose").Document<any, any, User> & User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
    activateUser(active_token: string): Promise<void>;
    login(username: string, password: string): Promise<{
        token: string;
        user: import("mongoose").Document<any, any, User> & User & {
            _id: import("mongoose").Schema.Types.ObjectId;
        };
        message: string;
    }>;
    getListUser(filter: any, select: any): Promise<(import("mongoose").Document<any, any, User> & User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    })[]>;
    getUser(id: any, select: any): Promise<import("mongoose").Document<any, any, User> & User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
    editProfile(_id: any, update: any): Promise<import("mongoose").Document<any, any, User> & User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
    changePassword(_id: any, password: any, oldPassword: any, pass: any): Promise<void>;
    sendResetPassword(param: string): Promise<void>;
    resetPassword(password: any, reset_password_token: any): Promise<void>;
    updateGroupUser(id: any, groups: any): Promise<import("mongoose").Document<any, any, User> & User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
}
declare const _default: UserService;
export default _default;
