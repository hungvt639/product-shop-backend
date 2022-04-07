import ColorModel, { Color } from "../../models/product/colorModel";

class ColorService {
    public async create(name: string, code: string) {
        return await ColorModel.create(new Color(name, code));
    }

    public async gets() {
        return await ColorModel.find({});
    }

    public async deleteColor(id: string) {
        const del = await ColorModel.deleteOne({ _id: id });
        if (del.deletedCount <= 0)
            throw new Error("Xóa color không thành công");
    }
    public async editColor(id: string, name: string, code: string) {
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

    public _validateCodeColor(code: string) {
        if (!code) return false;
        return (code.length === 7 || code.length === 9) && code.startsWith("#");
    }
}

export default new ColorService();
