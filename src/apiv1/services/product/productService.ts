import ProductModel, { Product } from "../../models/product/productModel";

async function create(value: Product) {
    return await ProductModel.create(value);
}

async function gets() {
    return await ProductModel.find({}).populate("type");
}
async function gets_sale() {
    return await ProductModel.find({ isSale: true }).populate("type");
}
async function get(slug: string) {
    return await ProductModel.findOne({ slug: slug }).populate("type");
}
async function deleteP(id: string) {
    const del = await ProductModel.findByIdAndRemove(id);
    if (!del) throw new Error("Xóa product không thành công");
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
    get,
    deleteP,
    edit,
    gets_sale,
};
