import ColorModel, { Color } from "../../models/product/colorModel";

class ColorService {
    public async create(name: string, code: string) {
        return await ColorModel.create(new Color(name, code));
    }

    public async gets() {
        return await ColorModel.find({});
    }

    public async del(id: string) {
        const data = await ColorModel.findByIdAndRemove(id);
        if (!data) throw new Error("Xóa color không thành công");
    }
    public async edit(id: string, name: string, code: string) {
        const data = await ColorModel.findByIdAndUpdate(
            id,
            { name, code },
            {
                new: true,
            }
        );
        if (!data) throw new Error("Không tìm thấy color có id là: " + id);
        return data;
    }

    public _validateCodeColor(code: string) {
        if (!code) return false;
        return (code.length === 7 || code.length === 9) && code.startsWith("#");
    }
}

export default new ColorService();
