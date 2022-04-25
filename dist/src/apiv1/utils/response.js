"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class HttpResponse {
    badRequest(res, message) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message });
    }
    ok(res, data) {
        res.status(http_status_codes_1.StatusCodes.OK).json(data);
    }
    unauthorizer(res, message) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message });
    }
    forbidden(res, message) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message });
    }
}
exports.default = new HttpResponse();
