import mongoose, { ObjectId, Schema, SchemaDefinitionProperty } from "mongoose";
import { PER } from "./permissionModel";
import { wordUpFirst } from "../utils/functions";
import envV1 from "../config/_envV1";

export class Group {
    _id: ObjectId;

    name: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    code: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;

    permissions: String[];

    constructor(code: string) {
        this.name = wordUpFirst(code.replace("_", " "));
        this.code = code;
    }
}
interface GroupMethod {}

const GroupSchema = new Schema<Group>(
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
        permissions: [{ type: String, ref: envV1.PERMISSION_MODEL }],
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const GroupModel: mongoose.Model<Group> & GroupMethod = mongoose.model(
    envV1.GROUP_MODEL,
    GroupSchema
);

export default GroupModel;
export const GROUP = {
    super_user: {
        name: "Super User",
        code: "super_user",
        permission: [
            PER.add_user,
            PER.view_user,
            PER.edit_user,
            PER.delete_user,

            PER.add_group,
            PER.view_group,
            PER.edit_group,
            PER.delete_group,

            PER.add_permission,
            PER.view_permission,
            PER.edit_permission,
            PER.delete_permission,
        ],
    },
    admin: {
        name: "Admin",
        code: "admin",
        permission: [
            PER.view_user,
            PER.edit_user,
            PER.add_group,
            PER.view_group,
            PER.edit_group,
            PER.delete_group,
        ],
    },
    user: {
        name: "User",
        code: "user",
        permission: [PER.view_user, PER.edit_user],
    },
};
