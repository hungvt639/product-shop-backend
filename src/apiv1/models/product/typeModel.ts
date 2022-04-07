import mongoose, { Schema, SchemaDefinitionProperty } from "mongoose";
import envV1 from "../../config/_envV1";
import slug from "mongoose-slug-generator";

export class Type {
    name: String;
    slug: String;
    constructor(name: string) {
        this.name = name;
    }
}
mongoose.plugin(slug);

const TypeSchema = new Schema(
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

const TypeModel = mongoose.model<Type>(envV1.model.TYPE, TypeSchema);
export default TypeModel;
