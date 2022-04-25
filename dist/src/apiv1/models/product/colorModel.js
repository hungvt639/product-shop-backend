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
exports.ColorSchema = exports.Color = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const _envV1_1 = __importDefault(require("../../config/_envV1"));
class Color {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}
exports.Color = Color;
exports.ColorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20,
    },
    code: {
        type: String,
        required: true,
        maxlength: 20,
    },
}, { timestamps: false });
const ColorModel = mongoose_1.default.model(_envV1_1.default.model.COLOR, exports.ColorSchema);
exports.default = ColorModel;
