/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { Querys } from "../../interfaces/Express";
import { Product } from "../../models/product/productModel";
declare class ProductService {
    create(value: Product): Promise<Product & {
        _id: any;
    }>;
    gets(filter: Object, options: Querys, sort: string): Promise<import("mongoose").PaginateResult<Product & {
        _id: any;
    }>>;
    gets_sale(options: Querys, sort: string): Promise<import("mongoose").PaginateResult<Product & {
        _id: any;
    }>>;
    get(s: string): Promise<{
        sames: (Product & {
            _id: any;
        })[];
        type: import("mongoose").FlattenMaps<String | import("../../models/product/typeModel").Type>;
        id?: import("mongoose").AnyObject | import("mongoose").FlattenMaps<any>;
        _id: import("mongoose").AnyObject | import("mongoose").FlattenMaps<any>;
        name: import("mongoose").FlattenMaps<String>;
        index: import("mongoose").FlattenMaps<(opts?: import("mongoosastic/dist/types").IndexMethodOptions) => Promise<import("mongoosastic/dist/types").MongoosasticDocument<any> | import("@elastic/elasticsearch").ApiResponse<Record<string, any>, unknown>>>;
        addListener: import("mongoose").FlattenMaps<(eventName: string | symbol, listener: (...args: any[]) => void) => Product & {
            _id: any;
        }>;
        on: import("mongoose").FlattenMaps<(eventName: string | symbol, listener: (...args: any[]) => void) => Product & {
            _id: any;
        }>;
        once: import("mongoose").FlattenMaps<(eventName: string | symbol, listener: (...args: any[]) => void) => Product & {
            _id: any;
        }>;
        removeListener: import("mongoose").FlattenMaps<(eventName: string | symbol, listener: (...args: any[]) => void) => Product & {
            _id: any;
        }>;
        off: import("mongoose").FlattenMaps<(eventName: string | symbol, listener: (...args: any[]) => void) => Product & {
            _id: any;
        }>;
        removeAllListeners: import("mongoose").FlattenMaps<(event?: string | symbol) => Product & {
            _id: any;
        }>;
        setMaxListeners: import("mongoose").FlattenMaps<(n: number) => Product & {
            _id: any;
        }>;
        getMaxListeners: import("mongoose").FlattenMaps<() => number>;
        listeners: import("mongoose").FlattenMaps<(eventName: string | symbol) => Function[]>;
        rawListeners: import("mongoose").FlattenMaps<(eventName: string | symbol) => Function[]>;
        emit: import("mongoose").FlattenMaps<(eventName: string | symbol, ...args: any[]) => boolean>;
        listenerCount: import("mongoose").FlattenMaps<(eventName: string | symbol) => number>;
        prependListener: import("mongoose").FlattenMaps<(eventName: string | symbol, listener: (...args: any[]) => void) => Product & {
            _id: any;
        }>;
        prependOnceListener: import("mongoose").FlattenMaps<(eventName: string | symbol, listener: (...args: any[]) => void) => Product & {
            _id: any;
        }>;
        eventNames: import("mongoose").FlattenMaps<() => (string | symbol)[]>;
        __v?: import("mongoose").AnyObject | import("mongoose").FlattenMaps<any>;
        created_at: string;
        updated_at: string;
        slug: import("mongoose").FlattenMaps<String>;
        image: import("mongoose").FlattenMaps<import("mongoose").LeanDocument<String>>[];
        description?: import("mongoose").FlattenMaps<String>;
        information?: import("mongoose").FlattenMaps<String>;
        img: import("mongoose").FlattenMaps<String>;
        img1: import("mongoose").FlattenMaps<String>;
        price: number;
        sizes: import("mongoose").FlattenMaps<import("mongoose").LeanDocument<String>>[];
        colors: import("mongoose").FlattenMaps<import("mongoose").LeanDocument<String>>[];
        isSale: import("mongoose").FlattenMaps<Boolean>;
        sold: number;
        _highlight?: import("mongoose").FlattenMaps<Record<string, string[]>>;
        _esResult?: import("mongoose").FlattenMaps<import("@elastic/elasticsearch/api/types").SearchHit<any>>;
        esClient: import("mongoose").FlattenMaps<() => import("@elastic/elasticsearch").Client>;
        esOptions: import("mongoose").FlattenMaps<() => import("mongoosastic/dist/types").Options>;
        unIndex: import("mongoose").FlattenMaps<() => Promise<import("mongoosastic/dist/types").MongoosasticDocument<any>>>;
    }>;
    del(id: string): Promise<void>;
    edit(id: string, product: any): Promise<Product & {
        _id: any;
    }>;
    search(q: Querys, search: any): Promise<any>;
}
declare const _default: ProductService;
export default _default;
