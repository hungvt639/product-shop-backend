"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = __importDefault(require("../services/fileService"));
const response_1 = __importDefault(require("../utils/response"));
const _envV1_1 = __importDefault(require("../config/_envV1"));
class FileController {
    uploadImgUr(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            if (!file)
                throw new Error("Không có file tải lên");
            const mimetype = file.mimetype;
            if (!_envV1_1.default.MIMETYPEs.includes(mimetype.toLowerCase()))
                throw new Error("Không hỗ trợ loại file này");
            const data = yield fileService_1.default.uploadImgUr(file);
            response_1.default.ok(res, data);
        });
    }
    uploadImgUrCK(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            if (!file)
                throw new Error("Không có file tải lên");
            const mimetype = file.mimetype;
            if (!_envV1_1.default.MIMETYPEs.includes(mimetype.toLowerCase()))
                throw new Error("Không hỗ trợ loại file này");
            const data = yield fileService_1.default.uploadImgUr(file);
            const response = { uploaded: true, url: data.link };
            response_1.default.ok(res, response);
        });
    }
}
exports.default = new FileController();
//# sourceMappingURL=fileController.js.map