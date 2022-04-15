import SizeModel, { Size } from "../../models/product/sizeModel";

class SizeService {
    public async create(name: string) {
        return await SizeModel.create(new Size(name));
    }

    public async gets() {
        return await SizeModel.find({});
    }

    public async del(id: string) {
        const data = await SizeModel.findByIdAndRemove(id);
        if (!data) throw new Error("Xóa size không thành công");
    }
}

export default new SizeService();
