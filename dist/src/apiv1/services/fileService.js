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
const http_status_codes_1 = require("http-status-codes");
const imgur_1 = __importDefault(require("../config/imgur"));
class FIleService {
    uploadImgUr(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield imgur_1.default.upload({
                image: file.buffer,
                type: "stream",
            });
            if (response.status !== http_status_codes_1.StatusCodes.OK) {
                throw new Error(response.data);
            }
            return response.data;
        });
    }
}
exports.default = new FIleService();
//# sourceMappingURL=fileService.js.map