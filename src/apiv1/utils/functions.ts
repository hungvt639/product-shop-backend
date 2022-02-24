export function _getContentFromHtml(str: string) {
    return str
        .replace(/<\/[^>]+>/g, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s\s+/g, " ")
        .trim();
}

export function _removeAccents(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

export function _setOption(obj: any, key: string, value: any, regex = false) {
    if (value && key) {
        if (regex) {
            obj[key] = { $regex: value, $options: "i" };
        } else {
            obj[key] = value;
        }
    }
}
