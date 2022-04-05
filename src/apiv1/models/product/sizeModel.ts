import mongoose, { Schema, SchemaDefinitionProperty } from "mongoose";
import envV1 from "../../config/_envV1";

export class Size {
    name: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;

    constructor(name: string) {
        this.name = name;
    }
}

const SizeSchema = new Schema<Size>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 20,
        },
    },
    { timestamps: false }
);

const SizeModel: mongoose.Model<Size> = mongoose.model(
    envV1.model.SIZE,
    SizeSchema
);
export default SizeModel;
