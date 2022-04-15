import { Req, Res } from "../../interfaces/Express";
import carouselService from "../../services/product/carouselService";
import HttpResponse from "../../utils/response";

class CarouselController {
    public async create(req: Req, res: Res) {
        const { image } = req.body;
        const data = await carouselService.create(image);
        HttpResponse.ok(res, data);
    }

    public async gets(req: Req, res: Res) {
        const datas = await carouselService.gets();
        HttpResponse.ok(res, datas);
    }

    public async del(req: Req, res: Res) {
        const { id } = req.params;
        await carouselService.del(id);
        HttpResponse.ok(res, { message: "Xóa carousel thành công" });
    }

    public async edit(req: Req, res: Res) {
        const { id } = req.params;
        const { image } = req.body;
        const data = await carouselService.edit(id, image);
        HttpResponse.ok(res, data);
    }
}

export default new CarouselController();
