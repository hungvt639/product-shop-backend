"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _const_1 = require("../routers/_const");
class Utils {
    convertCode(str) {
        return str
            .normalize("NFD")
            .trim()
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/\s+/g, " ")
            .toLowerCase();
    }
    // public setOption(obj: any, key: string, value: any, regex = false) {
    //     if (value && key) {
    //         if (regex) {
    //             obj[key] = { $regex: value, $options: "i" };
    //         } else {
    //             obj[key] = value;
    //         }
    //     }
    // }
    wordUpFirst(str) {
        return str
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" ");
    }
    _valueInObject(obj, value) {
        for (const key in obj) {
            if (obj[key] === value)
                return true;
        }
        return false;
    }
    valiDataPermission(method, url) {
        const URLs = (0, _const_1.generateURLs)();
        return ((this._valueInObject(URLs, url) &&
            this._valueInObject(_const_1.METHOD, method)) ||
            (!method && this._valueInObject(URLs, url)) ||
            (!url && this._valueInObject(_const_1.METHOD, method)));
    }
    removeKeyNull(obj) {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "undefined")
                delete obj[key];
        });
        return obj;
    }
    validArrObjId(value) {
        if (!value)
            return false;
        if (!value.length)
            return false;
        else
            return value.every((val) => (0, mongoose_1.isValidObjectId)(val));
    }
    validateEmail(email, nul = true) {
        if (!email)
            return nul;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validatePhone(phone) {
        const re = /((\+84|0)[3|5|7|8|9])+([0-9]{8})\b/g;
        return re.test(String(phone).toLowerCase());
    }
}
exports.default = new Utils();
//# sourceMappingURL=functions.js.map