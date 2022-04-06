import { isValidObjectId } from "mongoose";
import envV1 from "../../config/_envV1";
import { Req, Res } from "../../interfaces/Express";
import { Order } from "../../models/product/orderModel";
import ProductModel from "../../models/product/productModel";
import orderService from "../../services/product/orderService";
import { validateEmail, validatePhone } from "../../utils/functions";
import HttpResponse from "../../utils/response";

async function create(req: Req, res: Res) {
    const { fullname, phone, email, address, orderProduct, note }: Order =
        req.body;

    if (!validatePhone(phone))
        HttpResponse.badRequest(res, "Định dạng số điện thoại không hợp lệ");

    if (!validateEmail(email))
        HttpResponse.badRequest(res, "Định dạng email không hợp lệ");

    const productId = orderProduct.map((oP) => oP.product._id);
    const products = await ProductModel.find({
        _id: { $in: productId },
        isSale: true,
    });
    if (products.length !== productId.length)
        return HttpResponse.badRequest(
            res,
            "Đơn hàng có chứa sản phầm không còn được bán"
        );

    const order = await orderService.create({
        fullname,
        phone,
        email,
        address,
        orderProduct,
        note,
    } as Order);
    HttpResponse.ok(res, order);
}

async function gets(req: Req, res: Res) {
    const orders = await orderService.gets();
    HttpResponse.ok(res, orders);
}

async function getDetail(req: Req, res: Res) {
    const id = req.body[envV1.query.order_detail];
    if (!isValidObjectId(id))
        HttpResponse.badRequest(res, "Định dạng ID không đúng");
    const orders = await orderService.getDetail(id);
    HttpResponse.ok(res, orders);
}

async function update(req: Req, res: Res) {
    const { id } = req.params;
    const { status, noteAdmin } = req.body;
    const order = await orderService.update(id, {
        status,
        noteAdmin,
    });
    HttpResponse.ok(res, order);
}

const OrderController = {
    create,
    gets,
    update,
    getDetail,
};
export default OrderController;
