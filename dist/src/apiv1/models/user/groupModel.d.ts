import mongoose, { SchemaDefinitionProperty } from "mongoose";
export declare class Group {
    name: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    code: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    permissions: String[];
    constructor(name: string, per: String[]);
}
interface GroupMethod {
}
declare const GroupModel: mongoose.Model<Group> & GroupMethod;
export default GroupModel;
