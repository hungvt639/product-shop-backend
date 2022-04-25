"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countriesController_1 = __importDefault(require("../controllers/countriesController"));
const _const_1 = require("./_const");
const fnHandler_1 = __importDefault(require("../middlewares/fnHandler"));
const cRoute = _const_1.ROUTE.country;
const Country = (0, express_1.Router)();
Country.get(cRoute.get_provincials, (0, fnHandler_1.default)(countriesController_1.default.getProvincials));
Country.get(cRoute.get_districts, (0, fnHandler_1.default)(countriesController_1.default.getDistricts));
Country.get(cRoute.get_wards, (0, fnHandler_1.default)(countriesController_1.default.getWards));
exports.default = Country;
//# sourceMappingURL=countriesRouter.js.map