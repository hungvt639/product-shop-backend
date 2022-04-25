"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imgur_1 = require("imgur");
const env_1 = __importDefault(require("../../config/env"));
const imgur = new imgur_1.ImgurClient({
    clientId: env_1.default.IMGUR_ID,
});
exports.default = imgur;
