import { Querys } from "../../interfaces/Express";
import ProductModel, { Product } from "../../models/product/productModel";

class ProductService {
    public async create(value: Product) {
        const product = new ProductModel(value);
        await product.save();
        return await product.populate("colors");
    }

    public async gets(options: Querys, sort: string) {
        return await ProductModel.paginate(
            {},
            {
                ...options,
                sort,
                populate: [
                    {
                        path: "type",
                    },
                    {
                        path: "colors",
                    },
                ],
            }
        );
    }
    public async gets_sale(options: Querys, sort: string) {
        return await ProductModel.paginate(
            { isSale: true },
            {
                ...options,
                sort,
                populate: [
                    {
                        path: "type",
                    },
                    {
                        path: "colors",
                    },
                ],
            }
        );
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
        const p = await ProductModel.findOneAndUpdate({ _id: id }, product, {
            new: true,
        })
            .populate("type")
            .populate("colors");
        if (!p) throw new Error("Không tìm thấy sản phẩm có id là: " + id);
        return p;
    }

    public async search(q: Querys, search) {
        const data = await ProductModel.search(
            {
                query_string: {
                    fields: ["name", "slug"],
                    query: search,
                },
            },
            { size: q.limit, from: (q.page - 1) * q.limit } as any
        );
        return data.body.hits;
    }
}

export default new ProductService();
