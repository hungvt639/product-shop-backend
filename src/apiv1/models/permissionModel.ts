import mongoose, { Schema, SchemaDefinitionProperty } from "mongoose";
import envV1 from "../config/_envV1";

export class Permission {
    name: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    code: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}
interface PermissionMethod {}

const PermissionSchema = new Schema<Permission>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 200,
        },
        code: {
            type: String,
            required: true,
            unique: true,
            maxlength: 200,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const PermissionModel: mongoose.Model<Permission> & PermissionMethod =
    mongoose.model(envV1.PERMISSION_MODEL, PermissionSchema);

export default PermissionModel;

export const PER = {
    add_user: "add_user",
    view_user: "view_user",
    edit_user: "edit_user",
    delete_user: "delete_user",

    add_group: "add_group",
    view_group: "view_group",
    edit_group: "edit_group",
    delete_group: "delete_group",

    add_permission: "add_permission",
    view_permission: "view_permission",
    edit_permission: "edit_permission",
    delete_permission: "delete_permission",
};
