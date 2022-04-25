"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogLink = void 0;
const mongoose_1 = require("mongoose");
const _envV1_1 = __importDefault(require("../config/_envV1"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
class BlogLink {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }
}
exports.BlogLink = BlogLink;
(0, mongoose_1.plugin)(mongoose_slug_generator_1.default);
const BlogLinkSchema = new mongoose_1.Schema({
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
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const BlogLinkModel = (0, mongoose_1.model)(_envV1_1.default.model.BLOG_LINK, BlogLinkSchema);
exports.default = BlogLinkModel;
//# sourceMappingURL=blogLinkModel.js.map