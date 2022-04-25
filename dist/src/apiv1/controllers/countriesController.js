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
const response_1 = __importDefault(require("../utils/response"));
const sub_vn_1 = __importDefault(require("sub-vn"));
class CountriesController {
    getProvincials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datas = sub_vn_1.default.getProvinces();
            response_1.default.ok(res, datas);
        });
    }
    getDistricts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { province } = req.params;
            const datas = sub_vn_1.default.getDistrictsByProvinceCode(province);
            response_1.default.ok(res, datas);
        });
    }
    getWards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { district } = req.params;
            const datas = sub_vn_1.default.getWardsByDistrictCode(district);
            response_1.default.ok(res, datas);
        });
    }
}
exports.default = new CountriesController();
