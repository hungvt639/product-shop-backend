import { isValidObjectId } from "mongoose";
import { generateURLs, METHOD } from "../routers/_const";

export function convertCode(str: string) {
    return str
        .normalize("NFD")
        .trim()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/\s+/g, " ")
        .toLowerCase();
}

// export function setOption(obj: any, key: string, value: any, regex = false) {
//     if (value && key) {
//         if (regex) {
//             obj[key] = { $regex: value, $options: "i" };
//         } else {
//             obj[key] = value;
//         }
//     }
// }

export function wordUpFirst(str: string) {
    return str
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
}
function _valueInObject(obj: object, value: string) {
    for (const key in obj) {
        if (obj[key] === value) return true;
    }
    return false;
}
export function valiDataPermission(method: string, url: string) {
    const URLs = generateURLs();
    return (
        (_valueInObject(URLs, url) && _valueInObject(METHOD, method)) ||
        (!method && _valueInObject(URLs, url)) ||
        (!url && _valueInObject(METHOD, method))
    );
}

export function removeKeyNull(obj: any) {
    Object.keys(obj).forEach((key) => {
        if (!obj[key]) delete obj[key];
    });
    return obj;
}

export function validArrObjId(value: string[] | undefined) {
    if (!value) return false;
    if (!value.length) return false;
    else return value.every((val) => isValidObjectId(val));
}
