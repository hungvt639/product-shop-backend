import mongoose from "mongoose";
export declare class Color {
    name: String;
    code: String;
    constructor(name: string, code: string);
}
export declare const ColorSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any>;
declare const ColorModel: mongoose.Model<Color, {}, {}, {}>;
export default ColorModel;
