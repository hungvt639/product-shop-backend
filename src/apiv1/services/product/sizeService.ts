import SizeModel, { Size } from "../../models/product/sizeModel";

class SizeService {
    public async create(name: string) {
        return await SizeModel.create(new Size(name));
    }

    public async gets() {
        return await SizeModel.find({});
    }

    public async deleteSize(id: string) {
        const del = await SizeModel.deleteOne({ _id: id });
        if (del.deletedCount <= 0) throw new Error("Xóa size không thành công");
    }
}

export default new SizeService();
