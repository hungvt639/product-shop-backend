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
const typeService_1 = __importDefault(require("../../services/product/typeService"));
const response_1 = __importDefault(require("../../utils/response"));
class TypeController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const color = yield typeService_1.default.create(name);
            response_1.default.ok(res, color);
        });
    }
    gets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datas = yield typeService_1.default.gets();
            response_1.default.ok(res, datas);
        });
    }
    del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield typeService_1.default.del(id);
            response_1.default.ok(res, { message: "Xóa nhóm thành công" });
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            const data = yield typeService_1.default.edit(id, name);
            response_1.default.ok(res, data);
        });
    }
    getsProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sort = req.query.sort;
            const datas = yield typeService_1.default.getsProducts(req.querys, sort);
            response_1.default.ok(res, datas);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const sort = req.query.sort;
            const data = yield typeService_1.default.get(slug, req.querys, sort);
            response_1.default.ok(res, data);
        });
    }
}
exports.default = new TypeController();
