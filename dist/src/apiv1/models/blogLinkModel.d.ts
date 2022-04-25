/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
export declare class BlogLink {
    name: String;
    slug: String;
    content: String;
    constructor(name: string, content: string);
}
declare const BlogLinkModel: import("mongoose").Model<BlogLink, {}, {}, {}>;
export default BlogLinkModel;
