import mongoose, { ObjectId, Schema, SchemaDefinitionProperty } from "mongoose";
import envV1_1 from "../../config/_envV1";
import { convertCode } from "../../utils/functions";
export class Permission {
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
    constructor(name: string, url: String, method: String) {
        this.name = name;
        this.code = convertCode(name).split(" ").join("_");
        this.url = url;
        this.method = method;
    }
}

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
        url: String,
        method: String,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const PermissionModel: mongoose.Model<Permission> = mongoose.model(
    envV1_1.model.PERMISSION,
    PermissionSchema
);

export default PermissionModel;
