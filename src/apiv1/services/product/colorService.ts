import ColorModel, { Color } from "../../models/product/ColorModel";

async function create(name: string, code: string) {
    return await ColorModel.create(new Color(name, code));
}

async function gets() {
    return await ColorModel.find({});
}

async function deleteColor(id: string) {
    const del = await ColorModel.deleteOne({ _id: id });
    if (del.deletedCount <= 0) throw new Error("Xóa color không thành công");
}
async function editColor(id: string, name: string, code: string) {
    const color = await ColorModel.findOneAndUpdate(
        { _id: id },
        { name, code },
        {
            new: true,
        }
    );
    if (!color) throw new Error("Không tìm thấy color có id là: " + id);
    return color;
}

function _validateCodeColor(code: string) {
    if (!code) return false;
    return (code.length === 7 || code.length === 9) && code.startsWith("#");
}

export default {
    create,
    gets,
    deleteColor,
    editColor,
    _validateCodeColor,
};
