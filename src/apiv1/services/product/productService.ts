import ProductModel, { Product } from "../../models/product/productModel";
class ProductService {
    public async create(value: Product) {
        const product = new ProductModel(value);
        await product.save();
        return await product.populate("colors");
        // return await ProductModel.create(value);
    }

    public async gets(sort: string, select) {
        console.log("sort", sort);

        return await ProductModel.find({}, select)
            .sort(sort)
            .populate("type")
            .populate("colors");
    }
    public async gets_sale() {
        return await ProductModel.find({ isSale: true })
            .populate("type")
            .populate("colors");
    }
    public async get(slug: string) {
        return await ProductModel.findOne({ slug: slug })
            .populate("type")
            .populate("colors");
    }
    public async deleteP(id: string) {
        const del = await ProductModel.findByIdAndRemove(id);
        if (!del) throw new Error("Xóa product không thành công");
    }
    public async edit(id: string, product) {
        const color = await ProductModel.findOneAndUpdate(
            { _id: id },
            product,
            {
                new: true,
            }
        )
            .populate("type")
            .populate("colors");
        if (!color) throw new Error("Không tìm thấy type có id là: " + id);
        return color;
    }
}

export default new ProductService();
