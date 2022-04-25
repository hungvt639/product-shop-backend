/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { Size } from "../../models/product/sizeModel";
declare class SizeService {
    create(name: string): Promise<import("mongoose").Document<any, any, Size> & Size & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    gets(): Promise<(import("mongoose").Document<any, any, Size> & Size & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    del(id: string): Promise<void>;
}
declare const _default: SizeService;
export default _default;
