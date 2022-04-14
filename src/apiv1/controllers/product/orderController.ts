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
        const data = req.body;

        if (!validatePhone(data.phone))
            HttpResponse.badRequest(
                res,
                "Định dạng số điện thoại không hợp lệ"
            );

        if (!validateEmail(data.email))
            HttpResponse.badRequest(res, "Định dạng email không hợp lệ");

        const order = await orderService.create(data);
        HttpResponse.ok(res, order);
    }

    public async gets(req: Req, res: Res) {
        const sort = req.query.sort as string | undefined;
        const stt = req.query.status as string | undefined;
        const status = stt ? parseInt(stt) : undefined;
        const filter = removeKeyNull({ status });
        const orders = await orderService.gets(req.querys, filter, sort);
        HttpResponse.ok(res, orders);
    }

    public async getDetail(req: Req, res: Res) {
        const { id } = req.params;
        if (!isValidObjectId(id))
            HttpResponse.badRequest(res, "Định dạng ID không đúng");
        const orders = await orderService.getDetail(id);
        HttpResponse.ok(res, orders);
    }

    public async update(req: Req, res: Res) {
        const { id } = req.params;
        const { status, noteAdmin } = req.body;
        const order = await orderService.update(id, {
            status,
            noteAdmin,
        });
        HttpResponse.ok(res, order);
    }
}
export default new OrderController();
