import TypeModel, { Type } from "../../models/product/typeModel";
import ProductModel, { Product } from "../../models/product/productModel";
import { Querys } from "../../interfaces/Express";

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

    public async getsProducts(options: Querys, sort: string) {
        let types = await TypeModel.find({});
        const data = await Promise.all(
            types.map(async (t) => {
                const { _id, name, slug } = t;
                const product = await ProductModel.paginate(
                    { type: _id },
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
                return { _id, name, slug, product };
            })
        );
        return data;
    }

    public async get(s: string, options: Querys, sort: string) {
        const type = await TypeModel.findOne({ slug: s });
        if (!type) throw new Error("Nhóm sản phẩm không tồn tại");
        const product = await ProductModel.paginate(
            { type: type._id },
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
        const { _id, name, slug } = type;
        return { ...type.toJSON(), product };
    }
}

export default new TypeService();
