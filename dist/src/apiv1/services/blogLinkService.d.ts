/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { BlogLink } from "../models/blogLinkModel";
declare class BlockLinkService {
    create(name: string, content: string): Promise<import("mongoose").Document<any, any, BlogLink> & BlogLink & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    gets(select: string): Promise<(import("mongoose").Document<any, any, BlogLink> & BlogLink & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    get(slug: string): Promise<import("mongoose").Document<any, any, BlogLink> & BlogLink & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    del(id: string): Promise<void>;
    edit(id: string, name: string, content: string): Promise<import("mongoose").Document<any, any, BlogLink> & BlogLink & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
declare const _default: BlockLinkService;
export default _default;
