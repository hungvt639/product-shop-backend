"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generator = void 0;
const morgan_1 = __importDefault(require("morgan"));
const pad = (num) => (num > 9 ? "" : "0") + num;
const generator = (time, index) => {
    if (!time)
        time = new Date();
    if (!index)
        index = 0;
    if (typeof time === "number")
        time = new Date(time);
    const year = time.getFullYear();
    const month = pad(time.getMonth() + 1);
    const day = pad(time.getDate());
    const fileName = `${year}/${year}_${month}_${day}-${index}.log`;
    return fileName;
};
exports.generator = generator;
morgan_1.default.token("body", function (req, res) {
    return JSON.stringify(req.body);
});
exports.default = (format, option) => (0, morgan_1.default)(format, option);
//# sourceMappingURL=morgan.js.map