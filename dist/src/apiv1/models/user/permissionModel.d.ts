import mongoose, { ObjectId, SchemaDefinitionProperty } from "mongoose";
export declare class Permission {
    _id?: ObjectId;
    name: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    code: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    url: String;
    method: String;
    constructor(name: string, url: String, method: String);
}
declare const PermissionModel: mongoose.Model<Permission>;
export default PermissionModel;
