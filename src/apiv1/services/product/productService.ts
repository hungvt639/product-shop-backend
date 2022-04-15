import { Querys } from "../../interfaces/Express";
import ProductModel, { Product } from "../../models/product/productModel";

class ProductService {
    public async create(value: Product) {
        const data = new ProductModel(value);
        await data.save();
        return await data.populate("colors");
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
    public async del(id: string) {
        const del = await ProductModel.findByIdAndRemove(id);
        if (!del) throw new Error("Xóa product không thành công");
    }
    public async edit(id: string, product) {
        const data = await ProductModel.findOneAndUpdate({ _id: id }, product, {
            new: true,
        })
            .populate("type")
            .populate("colors");
        if (!data) throw new Error("Không tìm thấy sản phẩm có id là: " + id);
        return data;
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
