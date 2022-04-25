"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileController_1 = __importDefault(require("../controllers/fileController"));
const multer_1 = __importDefault(require("multer"));
const _const_1 = require("./_const");
const fnHandler_1 = __importDefault(require("../middlewares/fnHandler"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const role_1 = __importDefault(require("../middlewares/role"));
const storage = multer_1.default.memoryStorage();
const f = (0, multer_1.default)({ storage: storage });
const fRoute = _const_1.ROUTE.file;
const File = (0, express_1.Router)();
File.post(fRoute.upload_img_ck, f.single("upload"), (0, fnHandler_1.default)(fileController_1.default.uploadImgUrCK));
File.use(authentication_1.default);
File.use(role_1.default);
File.post(fRoute.upload_img, f.single("image"), (0, fnHandler_1.default)(fileController_1.default.uploadImgUr));
exports.default = File;
//# sourceMappingURL=fileRouter.js.map