"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const fnHandler_1 = __importDefault(require("../middlewares/fnHandler"));
const role_1 = __importDefault(require("../middlewares/role"));
const _const_1 = require("./_const");
const blogLinkController_1 = __importDefault(require("../controllers/blogLinkController"));
const blRoute = _const_1.ROUTE.blog_link;
const BlogLinkRouter = (0, express_1.Router)();
BlogLinkRouter.get(blRoute.get_list_blog_link, (0, fnHandler_1.default)(blogLinkController_1.default.gets));
BlogLinkRouter.get(blRoute.get_blog_link, (0, fnHandler_1.default)(blogLinkController_1.default.get));
BlogLinkRouter.use(authentication_1.default);
BlogLinkRouter.use(role_1.default);
BlogLinkRouter.post(blRoute.creat_blog_link, (0, fnHandler_1.default)(blogLinkController_1.default.create));
BlogLinkRouter.put(blRoute.edit_blog_link, (0, fnHandler_1.default)(blogLinkController_1.default.edit));
BlogLinkRouter.delete(blRoute.delete_blog_link, (0, fnHandler_1.default)(blogLinkController_1.default.del));
exports.default = BlogLinkRouter;
//# sourceMappingURL=blogLinkRouter.js.map