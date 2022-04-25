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
const colorService_1 = __importDefault(require("../../services/product/colorService"));
const response_1 = __importDefault(require("../../utils/response"));
class ColorController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, code } = req.body;
            if (!colorService_1.default._validateCodeColor(code))
                throw new Error("Mã màu không hợp lệ");
            const data = yield colorService_1.default.create(name, code);
            response_1.default.ok(res, data);
        });
    }
    gets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datas = yield colorService_1.default.gets();
            response_1.default.ok(res, datas);
        });
    }
    del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield colorService_1.default.del(id);
            response_1.default.ok(res, { message: "Xóa color thành công" });
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, code } = req.body;
            if (!colorService_1.default._validateCodeColor(code))
                throw new Error("Mã màu không hợp lệ");
            const data = yield colorService_1.default.edit(id, name, code);
            response_1.default.ok(res, data);
        });
    }
}
exports.default = new ColorController();
//# sourceMappingURL=colorController.js.map