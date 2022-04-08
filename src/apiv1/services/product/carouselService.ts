import CarouselModel, { Carousel } from "../../models/product/carouselModel";

class CarouselService {
    public async create(image: string) {
        return await CarouselModel.create(new Carousel(image));
    }

    public async gets() {
        return await CarouselModel.find({});
    }

    public async del(id: string) {
        const del = await CarouselModel.findByIdAndDelete(id);
        if (!del) throw new Error("Xóa carousel không thành công");
    }
    public async edit(id: string, image: string) {
        const color = await CarouselModel.findByIdAndUpdate(
            id,
            { image },
            {
                new: true,
            }
        );
        if (!color) throw new Error("Không tìm thấy carousel có id là: " + id);
        return color;
    }
}

export default new CarouselService();
