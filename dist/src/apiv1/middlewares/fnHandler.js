"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../../config/env"));
exports.default = (fn) => (req, res, next) => {
    const { method } = req;
    if (method === "GET") {
        const page = req.query.page || env_1.default.PAGE_DEFAULT;
        const limit = req.query.limit || env_1.default.LIMIT_DEFAULT;
        const search = req.query.search;
        const select = req.query.select;
        req.querys = {
            page: parseInt(page),
            limit: parseInt(limit),
            search,
            select,
        };
    }
    return fn(req, res, next).catch(next);
};
