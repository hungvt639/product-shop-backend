/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { Color } from "../../models/product/colorModel";
declare class ColorService {
    create(name: string, code: string): Promise<import("mongoose").Document<any, any, Color> & Color & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    gets(): Promise<(import("mongoose").Document<any, any, Color> & Color & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    del(id: string): Promise<void>;
    edit(id: string, name: string, code: string): Promise<import("mongoose").Document<any, any, Color> & Color & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    _validateCodeColor(code: string): boolean;
}
declare const _default: ColorService;
export default _default;
