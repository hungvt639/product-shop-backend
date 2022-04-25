import mongoose from "mongoose";
export declare class Size {
    name: String;
    constructor(name: string);
}
declare const SizeModel: mongoose.Model<Size, {}, {}, {}>;
export default SizeModel;
