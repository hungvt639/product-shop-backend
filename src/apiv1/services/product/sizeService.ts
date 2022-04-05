import SizeModel, { Size } from "../../models/product/sizeModel";

async function create(name: string) {
    return await SizeModel.create(new Size(name));
}

async function gets() {
    return await SizeModel.find({});
}

async function deleteSize(id: string) {
    const del = await SizeModel.deleteOne({ _id: id });
    if (del.deletedCount <= 0) throw new Error("Xóa size không thành công");
}

export default {
    create,
    gets,
    deleteSize,
};
