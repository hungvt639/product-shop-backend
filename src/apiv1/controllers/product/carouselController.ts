import { Req, Res } from "../../interfaces/Express";
import carouselService from "../../services/product/carouselService";
import HttpResponse from "../../utils/response";

class CarouselController {
    public async create(req: Req, res: Res) {
        const { image } = req.body;
        const color = await carouselService.create(image);
        HttpResponse.ok(res, color);
    }

    public async gets(req: Req, res: Res) {
        const colors = await carouselService.gets();
        HttpResponse.ok(res, colors);
    }

    public async del(req: Req, res: Res) {
        const { id } = req.params;
        await carouselService.del(id);
        HttpResponse.ok(res, { message: "Xóa carousel thành công" });
    }

    public async edit(req: Req, res: Res) {
        const { id } = req.params;
        const { image } = req.body;
        const type = await carouselService.edit(id, image);
        HttpResponse.ok(res, type);
    }
}

export default new CarouselController();
