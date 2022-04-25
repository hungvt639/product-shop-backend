/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { Type } from "../../models/product/typeModel";
import { Product } from "../../models/product/productModel";
import { Querys } from "../../interfaces/Express";
declare class TypeService {
    create(name: string): Promise<import("mongoose").Document<any, any, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    gets(): Promise<(import("mongoose").Document<any, any, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    del(id: string): Promise<void>;
    edit(id: string, name: string): Promise<import("mongoose").Document<any, any, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getsProducts(options: Querys, sort: string): Promise<{
        _id: any;
        name: String;
        slug: String;
        product: import("mongoose").PaginateResult<Product & {
            _id: any;
        }>;
    }[]>;
    get(s: string, options: Querys, sort: string): Promise<{
        product: import("mongoose").PaginateResult<Product & {
            _id: any;
        }>;
        id?: import("mongoose").AnyObject | import("mongoose").FlattenMaps<any>;
        _id: import("mongoose").AnyObject | import("mongoose").FlattenMaps<any>;
        name: import("mongoose").FlattenMaps<String>;
        __v?: import("mongoose").AnyObject | import("mongoose").FlattenMaps<any>;
        slug: import("mongoose").FlattenMaps<String>;
    }>;
}
declare const _default: TypeService;
export default _default;
