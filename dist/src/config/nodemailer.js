"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("./env"));
const smtp = nodemailer_1.default.createTransport({
    host: env_1.default.EMAIL_HOST,
    port: env_1.default.EMAIL_PORT,
    secure: env_1.default.NODE_ENV !== "development",
    auth: {
        user: env_1.default.EMAIL_USER,
        pass: env_1.default.EMAIL_PASSWORD,
    },
});
exports.default = smtp;
