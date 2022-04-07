import { isValidObjectId } from "mongoose";
import envV1 from "../../config/_envV1";
import { Req, Res } from "../../interfaces/Express";
import { Order } from "../../models/product/orderModel";
import ProductModel from "../../models/product/productModel";
import orderService from "../../services/product/orderService";
import { validateEmail, validatePhone } from "../../utils/functions";
import HttpResponse from "../../utils/response";

class OrderController {
    public async create(req: Req, res: Res) {
        const { fullname, phone, email, address, orderProducts, note } =
            req.body;

        if (!validatePhone(phone))
            HttpResponse.badRequest(
                res,
                "Định dạng số điện thoại không hợp lệ"
            );

        if (!validateEmail(email))
            HttpResponse.badRequest(res, "Định dạng email không hợp lệ");

        const orderProduct = await Promise.all(
            orderProducts.map(async (op) => {
                const product: any = await ProductModel.findOne(
                    { _id: op.product_id, isSale: true },
                    "_id name slug img img1 price sizes colors type"
                ).populate({ path: "type", select: "name" });
                if (!product)
                    throw new Error(
                        "Đơn hàng có chứa sản phầm không còn được bán"
                    );
                const {
                    _id,
                    name,
                    slug,
                    img,
                    img1,
                    price,
                    sizes,
                    colors,
                    type,
                } = product;
                const proOrder = {
                    ...op,
                    product: {
                        _id,
                        name,
                        slug,
                        img,
                        img1,
                        price,
                        sizes,
                        colors,
                        type: type.name,
                    },
                };
                delete proOrder["product_id"];

                return proOrder;
            })
        );

        console.log("orderProduct", orderProduct);

        // const productId = orderProducts.map((oP) => oP.product_id);
        // const products = await ProductModel.find({
        //     _id: { $in: productId },
        //     isSale: true,
        // });
        // if (products.length !== productId.length)
        //     return HttpResponse.badRequest(
        //         res,
        //         "Đơn hàng có chứa sản phầm không còn được bán"
        //     );

        // const orderService = new OrderService();

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

    public async gets(req: Req, res: Res) {
        // const orders = await orderService.gets();
        // HttpResponse.ok(res, orders);
    }

    public async getDetail(req: Req, res: Res) {
        // const id = req.body[envV1.query.order_detail];
        // if (!isValidObjectId(id))
        //     HttpResponse.badRequest(res, "Định dạng ID không đúng");
        // const orders = await orderService.getDetail(id);
        // HttpResponse.ok(res, orders);
    }

    public async update(req: Req, res: Res) {
        // const { id } = req.params;
        // const { status, noteAdmin } = req.body;
        // const order = await orderService.update(id, {
        //     status,
        //     noteAdmin,
        // });
        // HttpResponse.ok(res, order);
    }
}
export default new OrderController();
