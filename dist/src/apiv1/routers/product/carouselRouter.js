"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const fnHandler_1 = __importDefault(require("../../middlewares/fnHandler"));
const role_1 = __importDefault(require("../../middlewares/role"));
const _const_1 = require("../_const");
const carouselController_1 = __importDefault(require("../../controllers/product/carouselController"));
const crseRoute = _const_1.ROUTE.carousel;
const CarouselRouter = (0, express_1.Router)();
CarouselRouter.get(crseRoute.get_list_carousel, (0, fnHandler_1.default)(carouselController_1.default.gets));
CarouselRouter.use(authentication_1.default);
CarouselRouter.use(role_1.default);
CarouselRouter.post(crseRoute.create_carousel, (0, fnHandler_1.default)(carouselController_1.default.create));
CarouselRouter.put(crseRoute.edit_carousel, (0, fnHandler_1.default)(carouselController_1.default.edit));
CarouselRouter.delete(crseRoute.delete_carousel, (0, fnHandler_1.default)(carouselController_1.default.del));
exports.default = CarouselRouter;
//# sourceMappingURL=carouselRouter.js.map