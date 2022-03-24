import mongoose, { ObjectId, Schema, SchemaDefinitionProperty } from "mongoose";
import { convertCode } from "../utils/functions";
import envV1 from "../config/_envV1";

export class Group {
    // _id?: ObjectId;

    name: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    code: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;

    permissions: String[];

    constructor(name: string, per: String[]) {
        this.name = name;
        this.code = convertCode(name).split(" ").join("_");
        this.permissions = per;
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
