import mongoose, { SchemaDefinitionProperty, ObjectId } from "mongoose";
export declare class User {
    _id?: ObjectId;
    email: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    username: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    password: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    fullname?: String;
    avatar?: SchemaDefinitionProperty<String>;
    isActivate: boolean;
    timeResetPassword?: Number;
    permissions: String[];
    groups: String[];
    constructor({ email, username, password, fullname, avatar }: {
        email: any;
        username: any;
        password: any;
        fullname: any;
        avatar: any;
    });
}
interface UserUtils {
    getProfile?: (filter: any, select: any) => any;
}
declare const UserModel: mongoose.Model<User> & UserUtils;
export default UserModel;
