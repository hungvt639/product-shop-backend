import TypeModel, { Type } from "../../models/product/typeModel";

class TypeService {
    public async create(name: string) {
        return await TypeModel.create(new Type(name));
    }

    public async gets() {
        return await TypeModel.find({});
    }

    public async del(id: string) {
        const data = await TypeModel.findByIdAndRemove(id);
        if (!data) throw new Error("Xóa type không thành công");
    }
    public async edit(id: string, name: string) {
        const data = await TypeModel.findByIdAndUpdate(
            id,
            { name },
            {
                new: true,
            }
        );
        if (!data) throw new Error("Không tìm thấy type có id là: " + id);
        return data;
    }
}

export default new TypeService();
