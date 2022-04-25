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
const blogLinkService_1 = __importDefault(require("../services/blogLinkService"));
const response_1 = __importDefault(require("../utils/response"));
class ProductController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, content } = req.body;
            const data = yield blogLinkService_1.default.create(name, content);
            response_1.default.ok(res, data);
        });
    }
    gets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { select } = req.querys;
            const datas = yield blogLinkService_1.default.gets(select);
            response_1.default.ok(res, datas);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const data = yield blogLinkService_1.default.get(slug);
            response_1.default.ok(res, data);
        });
    }
    del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield blogLinkService_1.default.del(id);
            response_1.default.ok(res, { message: "Xóa liên kết thành công" });
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, content } = req.body;
            const product = yield blogLinkService_1.default.edit(id, name, content);
            response_1.default.ok(res, product);
        });
    }
}
exports.default = new ProductController();
