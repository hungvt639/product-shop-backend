import env from "../../../config/env";
import envV1 from "../../config/_envV1";
import OrderModel, { Order } from "../../models/product/orderModel";
import SendMail from "../../utils/sendEmail";

async function create(data: Order) {
    const price = data.orderProduct.reduce((a, b) => a + b.product.price, 0);
    const order = await OrderModel.create({ ...data, price: price });
    if (order.email) {
        try {
            await SendMail({
                to: data.email as string,
                subject: `Đặt đơn shop ${env.SHOP_NAME}`,
                template: "order",
                context: {
                    message: "Đơn hàng của bạn đã được đặt thành công",
                    href: `${env.FRONTEND}/${envV1.r.order_detail}?${envV1.query.order_detail}=${order._id}`,
                },
            });
        } catch {}
    }
    return order;
}

async function gets() {
    return await OrderModel.find({});
}

async function update(id: string, data) {
    const order = await OrderModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    if (!order) throw new Error("Không tìm thấy đơn hàng có id là: " + id);
    return order;
}

async function getDetail(id: string) {
    const order = await OrderModel.findById(id);
    if (!order) throw new Error("Không tìm thấy đơn hàng có id là: " + id);
    return order;
}

export default {
    create,
    gets,
    update,
    getDetail,
};
