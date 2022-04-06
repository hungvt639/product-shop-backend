import mongoose, { Schema, SchemaDefinitionProperty } from "mongoose";
import envV1 from "../../config/_envV1";

export class Color {
    name: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    code: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    constructor(name: string, code: string) {
        this.name = name;
        this.code = code;
    }
}

export const ColorSchema = new Schema<Color>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 20,
        },
        code: {
            type: String,
            required: true,
            maxlength: 20,
        },
    },
    { timestamps: false }
);

const ColorModel: mongoose.Model<Color> = mongoose.model(
    envV1.model.COLOR,
    ColorSchema
);
export default ColorModel;
