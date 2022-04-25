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
const mongoose_1 = require("mongoose");
const orderService_1 = __importDefault(require("../../services/product/orderService"));
const functions_1 = __importDefault(require("../../utils/functions"));
const response_1 = __importDefault(require("../../utils/response"));
class OrderController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = req.body;
            if (!functions_1.default.validatePhone(value.phone))
                response_1.default.badRequest(res, "Định dạng số điện thoại không hợp lệ");
            if (!functions_1.default.validateEmail(value.email))
                response_1.default.badRequest(res, "Định dạng email không hợp lệ");
            const data = yield orderService_1.default.create(value);
            response_1.default.ok(res, data);
        });
    }
    gets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sort = req.query.sort;
            const stt = req.query.status;
            const status = stt ? parseInt(stt) : undefined;
            const filter = functions_1.default.removeKeyNull({ status });
            const datas = yield orderService_1.default.gets(req.querys, filter, sort);
            response_1.default.ok(res, datas);
        });
    }
    getDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(0, mongoose_1.isValidObjectId)(id))
                response_1.default.badRequest(res, "Định dạng ID không đúng");
            const data = yield orderService_1.default.getDetail(id);
            response_1.default.ok(res, data);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status, noteAdmin } = req.body;
            const data = yield orderService_1.default.update(id, {
                status,
                noteAdmin,
            });
            response_1.default.ok(res, data);
        });
    }
}
exports.default = new OrderController();
