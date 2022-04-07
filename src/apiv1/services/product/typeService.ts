import TypeModel, { Type } from "../../models/product/typeModel";

class TypeService {
    public async create(name: string) {
        return await TypeModel.create(new Type(name));
    }

    public async gets() {
        return await TypeModel.find({});
    }

    public async deleteType(id: string) {
        const del = await TypeModel.deleteOne({ _id: id });
        if (del.deletedCount <= 0) throw new Error("Xóa type không thành công");
    }
    public async editType(id: string, name: string) {
        const color = await TypeModel.findOneAndUpdate(
            { _id: id },
            { name },
            {
                new: true,
            }
        );
        if (!color) throw new Error("Không tìm thấy type có id là: " + id);
        return color;
    }
}

export default new TypeService();
