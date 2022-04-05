import mongoose, { Schema, SchemaDefinitionProperty } from "mongoose";
import envV1 from "../../config/_envV1";

export class Type {
    name: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    slug: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    constructor(name: string) {
        this.name = name;
    }
}

const TypeSchema = new Schema<Type>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 20,
        },
        slug: {
            type: String,
            slug: "name",
            unique: true,
            slug_padding_size: 4,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const TypeModel: mongoose.Model<Type> = mongoose.model(
    envV1.model.TYPE,
    TypeSchema
);
export default TypeModel;
