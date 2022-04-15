import { isValidObjectId } from "mongoose";
import { generateURLs, METHOD } from "../routers/_const";

class Utils {
    public convertCode(str: string) {
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

    public wordUpFirst(str: string) {
        return str
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" ");
    }
    private _valueInObject(obj: object, value: string) {
        for (const key in obj) {
            if (obj[key] === value) return true;
        }
        return false;
    }
    public valiDataPermission(method: string, url: string) {
        const URLs = generateURLs();
        return (
            (this._valueInObject(URLs, url) &&
                this._valueInObject(METHOD, method)) ||
            (!method && this._valueInObject(URLs, url)) ||
            (!url && this._valueInObject(METHOD, method))
        );
    }

    public removeKeyNull(obj: any) {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "undefined") delete obj[key];
        });
        return obj;
    }

    public validArrObjId(value: string[] | undefined) {
        if (!value) return false;
        if (!value.length) return false;
        else return value.every((val) => isValidObjectId(val));
    }

    public validateEmail(email: string, nul = true) {
        if (!email) return nul;
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public validatePhone(phone: string) {
        const re = /((\+84|0)[3|5|7|8|9])+([0-9]{8})\b/g;
        return re.test(String(phone).toLowerCase());
    }
}
export default new Utils();
