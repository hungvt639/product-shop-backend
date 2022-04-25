"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const _envV1_1 = __importDefault(require("../../config/_envV1"));
const mongoosastic_1 = __importDefault(require("mongoosastic"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const env_1 = __importDefault(require("../../../config/env"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
mongoose_1.default.plugin(mongoose_slug_generator_1.default);
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 200,
        es_indexed: true,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
        slug_padding_size: 4,
        es_indexed: true,
    },
    img: {
        type: String,
        es_indexed: true,
    },
    img1: {
        type: String,
        es_indexed: true,
    },
    image: [String],
    price: {
        type: Number,
        es_indexed: true,
    },
    sizes: [String],
    colors: [
        {
            type: String,
            ref: _envV1_1.default.model.COLOR,
        },
    ],
    type: {
        type: String,
        ref: _envV1_1.default.model.TYPE,
        es_indexed: true,
        es_include_in_parent: true,
    },
    isSale: {
        type: Boolean,
        default: true,
        es_indexed: true,
    },
    description: String,
    information: String,
    sold: {
        type: Number,
        es_indexed: true,
        default: 0,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
exports.ProductSchema.plugin(mongoose_paginate_v2_1.default);
exports.ProductSchema.plugin(mongoosastic_1.default, {
    populate: [{ path: "type" }],
    index: _envV1_1.default.model.PRODUCT,
    clientOptions: {
        nodes: [env_1.default.ECONNREFUSED],
    },
});
const ProductModel = (0, mongoose_1.model)(_envV1_1.default.model.PRODUCT, exports.ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=productModel.js.map