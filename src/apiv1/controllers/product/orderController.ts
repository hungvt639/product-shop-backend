import { isValidObjectId } from "mongoose";
import envV1 from "../../config/_envV1";
import { Req, Res } from "../../interfaces/Express";
import orderService from "../../services/product/orderService";
import {
    removeKeyNull,
    validateEmail,
    validatePhone,
} from "../../utils/functions";
import HttpResponse from "../../utils/response";

class OrderController {
    public async create(req: Req, res: Res) {
        const value = req.body;

        if (!validatePhone(value.phone))
            HttpResponse.badRequest(
                res,
                "Định dạng số điện thoại không hợp lệ"
            );

        if (!validateEmail(value.email))
            HttpResponse.badRequest(res, "Định dạng email không hợp lệ");

        const data = await orderService.create(value);
        HttpResponse.ok(res, data);
    }

    public async gets(req: Req, res: Res) {
        const sort = req.query.sort as string | undefined;
        const stt = req.query.status as string | undefined;
        const status = stt ? parseInt(stt) : undefined;
        const filter = removeKeyNull({ status });
        const datas = await orderService.gets(req.querys, filter, sort);
        HttpResponse.ok(res, datas);
    }

    public async getDetail(req: Req, res: Res) {
        const { id } = req.params;
        if (!isValidObjectId(id))
            HttpResponse.badRequest(res, "Định dạng ID không đúng");
        const data = await orderService.getDetail(id);
        HttpResponse.ok(res, data);
    }

    public async update(req: Req, res: Res) {
        const { id } = req.params;
        const { status, noteAdmin } = req.body;
        const data = await orderService.update(id, {
            status,
            noteAdmin,
        });
        HttpResponse.ok(res, data);
    }
}
export default new OrderController();
