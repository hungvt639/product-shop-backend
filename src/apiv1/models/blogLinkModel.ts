import { model, plugin, Schema } from "mongoose";
import envV1 from "../config/_envV1";
import slug from "mongoose-slug-generator";

export class BlogLink {
    name: String;
    slug: String;
    content: String;
    constructor(name: string, content: string) {
        this.name = name;
        this.content = content;
    }
}
plugin(slug);

const BlogLinkSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 200,
        },
        slug: {
            type: String,
            slug: "name",
            unique: true,
            slug_padding_size: 4,
        },
        content: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const BlogLinkModel = model<BlogLink>(envV1.model.BLOG_LINK, BlogLinkSchema);
export default BlogLinkModel;
