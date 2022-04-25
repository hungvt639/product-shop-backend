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
exports.Type = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const _envV1_1 = __importDefault(require("../../config/_envV1"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
class Type {
    constructor(name) {
        this.name = name;
    }
}
exports.Type = Type;
mongoose_1.default.plugin(mongoose_slug_generator_1.default);
const TypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
        slug_padding_size: 4,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const TypeModel = mongoose_1.default.model(_envV1_1.default.model.TYPE, TypeSchema);
exports.default = TypeModel;
