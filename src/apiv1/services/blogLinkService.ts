import { Querys } from "../interfaces/Express";
import BlogLinkModel, { BlogLink } from "../models/blogLinkModel";

class BlockLinkService {
    public async create(name: string, content: string) {
        return await BlogLinkModel.create(new BlogLink(name, content));
    }

    public async gets(select: string) {
        return await BlogLinkModel.find({}, select);
    }

    public async get(slug: string) {
        const data = await BlogLinkModel.findOne({ slug: slug });
        if (!data) throw new Error("Không tìm thấy liên kết");
        return data;
    }
    public async del(id: string) {
        const del = await BlogLinkModel.findByIdAndRemove(id);
        if (!del) throw new Error("Xóa product không thành công");
    }
    public async edit(id: string, name: string, content: string) {
        const data = await BlogLinkModel.findOneAndUpdate(
            { _id: id },
            { name, content },
            {
                new: true,
            }
        );
        if (!data) throw new Error("Không tìm thấy sản phẩm có id là: " + id);
        return data;
    }
}

export default new BlockLinkService();
