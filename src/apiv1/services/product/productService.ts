import { Querys } from "../../interfaces/Express";
import ProductModel, { Product } from "../../models/product/productModel";

class ProductService {
    public async create(value: Product) {
        const data = new ProductModel(value);
        await data.save();
        return await data.populate("colors");
    }

    public async gets(filter: Object, options: Querys, sort: string) {
        return await ProductModel.paginate(filter, {
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
        });
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
    public async get(s: string) {
        const product = await ProductModel.findOne({ slug: s })
            .populate("type")
            .populate("colors");
        if (!product) throw new Error("Không tìm thấy sản phẩm");
        const { type }: any = product;
        const sames = await ProductModel.find(
            { type: type._id, _id: { $ne: product._id } },
            "_id name slug sold price img img1 isSale"
        )
            .sort({ sold: -1 })
            .limit(5);
        return { ...product.toJSON(), sames };
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

    public async search(q: Querys, search): Promise<any> {
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
