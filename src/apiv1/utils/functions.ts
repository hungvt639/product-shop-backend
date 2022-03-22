import { PER, Permission } from "../models/permissionModel";

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

export function setOption(obj: any, key: string, value: any, regex = false) {
    if (value && key) {
        if (regex) {
            obj[key] = { $regex: value, $options: "i" };
        } else {
            obj[key] = value;
        }
    }
}

export function generatePermission(PERMISSIONs: typeof PER): Permission[] {
    let permissions: Permission[] = [];
    for (const permission in PERMISSIONs) {
        permissions.push({
            code: permission,
            name: wordUpFirst(permission.replace("_", " ")),
        });
    }
    return permissions;
}

export function wordUpFirst(str: string) {
    return str
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
}
