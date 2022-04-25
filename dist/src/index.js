"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const routers_1 = __importDefault(require("./apiv1/routers"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("./utils/morgan"));
const path = __importStar(require("path"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const body_parser_1 = __importDefault(require("body-parser"));
const env_1 = __importDefault(require("./config/env"));
const cors_1 = __importDefault(require("cors"));
const morgan_2 = require("./utils/morgan");
const rfs = __importStar(require("rotating-file-stream"));
const accessLogStream = rfs.createStream(morgan_2.generator, {
    interval: "1d",
    size: "10M",
    path: path.join(__dirname, "../", "log"),
});
const app = (0, express_1.default)();
app.use("/public", express_1.default.static(path.join(__dirname, "../", "public")));
app.use((0, morgan_1.default)(":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]", { stream: accessLogStream }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: env_1.default.CORS_ORIGIN }));
app.use(env_1.default.APIV1, routers_1.default);
app.listen(env_1.default.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongodb_1.default.connect();
    console.log(`App listening at http://0.0.0.0:${env_1.default.PORT}`);
}));
//# sourceMappingURL=index.js.map