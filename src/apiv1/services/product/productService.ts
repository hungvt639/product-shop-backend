import ProductModel, { Product } from "../../models/product/productModel";

async function create(value: Product) {
    return await ProductModel.create(value);
}

async function gets() {
    return await ProductModel.find({});
}

async function deleteP(id: string) {
    const del = await ProductModel.deleteOne({ _id: id });
    if (del.deletedCount <= 0) throw new Error("Xóa type không thành công");
}
async function edit(id: string, product) {
    const color = await ProductModel.findOneAndUpdate({ _id: id }, product, {
        new: true,
    });
    if (!color) throw new Error("Không tìm thấy type có id là: " + id);
    return color;
}
export default {
    create,
    gets,
    deleteP,
    edit,
};
