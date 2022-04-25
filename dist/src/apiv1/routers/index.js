"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./user/userRouter"));
const permissionRouter_1 = __importDefault(require("./user/permissionRouter"));
const groupRouter_1 = __importDefault(require("./user/groupRouter"));
const sizeRouter_1 = __importDefault(require("./product/sizeRouter"));
const colorRouter_1 = __importDefault(require("./product/colorRouter"));
const fileRouter_1 = __importDefault(require("./fileRouter"));
const errorHandler_1 = require("../utils/errorHandler ");
const _const_1 = require("./_const");
const typeRouter_1 = __importDefault(require("./product/typeRouter"));
const productRouter_1 = __importDefault(require("./product/productRouter"));
const orderRouter_1 = __importDefault(require("./product/orderRouter"));
const carouselRouter_1 = __importDefault(require("./product/carouselRouter"));
const countriesRouter_1 = __importDefault(require("./countriesRouter"));
const blogLinkRouter_1 = __importDefault(require("./blogLinkRouter"));
const ApiV1 = (0, express_1.Router)();
ApiV1.use(_const_1.ROUTE.user.root, userRouter_1.default);
ApiV1.use(_const_1.ROUTE.permission.root, permissionRouter_1.default);
ApiV1.use(_const_1.ROUTE.group.root, groupRouter_1.default);
ApiV1.use(_const_1.ROUTE.file.root, fileRouter_1.default);
ApiV1.use(_const_1.ROUTE.size.root, sizeRouter_1.default);
ApiV1.use(_const_1.ROUTE.color.root, colorRouter_1.default);
ApiV1.use(_const_1.ROUTE.type.root, typeRouter_1.default);
ApiV1.use(_const_1.ROUTE.product.root, productRouter_1.default);
ApiV1.use(_const_1.ROUTE.carousel.root, carouselRouter_1.default);
ApiV1.use(_const_1.ROUTE.order.root, orderRouter_1.default);
ApiV1.use(_const_1.ROUTE.country.root, countriesRouter_1.default);
ApiV1.use(_const_1.ROUTE.blog_link.root, blogLinkRouter_1.default);
ApiV1.use(errorHandler_1.errorHandler);
exports.default = ApiV1;
