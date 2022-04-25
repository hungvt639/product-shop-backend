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
const sizeService_1 = __importDefault(require("../../services/product/sizeService"));
const response_1 = __importDefault(require("../../utils/response"));
class SizeController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const data = yield sizeService_1.default.create(name);
            response_1.default.ok(res, data);
        });
    }
    gets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datas = yield sizeService_1.default.gets();
            response_1.default.ok(res, datas);
        });
    }
    del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield sizeService_1.default.del(id);
            response_1.default.ok(res, { message: "Xóa size thành công" });
        });
    }
}
exports.default = new SizeController();
//# sourceMappingURL=sizeController.js.map