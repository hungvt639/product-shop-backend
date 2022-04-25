import mongoose from "mongoose";
export declare class Type {
    name: String;
    slug: String;
    constructor(name: string);
}
declare const TypeModel: mongoose.Model<Type, {}, {}, {}>;
export default TypeModel;
