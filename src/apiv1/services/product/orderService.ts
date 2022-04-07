import env from "../../../config/env";
import envV1 from "../../config/_envV1";
import OrderModel, { Order } from "../../models/product/orderModel";
import SendMail from "../../utils/sendEmail";
class OrderService {
    public async create(data: Order) {
        // console.log(data.orderProduct);

        // const price = data.orderProduct.reduce((a, b) => a + b.product.price, 0);
        // console.log("o", data.orderProduct);

        const price = 50000;
        // console.log("p", { ...data, price });

        // const order = await OrderModel.create({ ...data, price: price });
        // const order = new OrderModel({ ...data, price: price });

        const rs = await OrderModel.create(data);
        // if (order.email) {
        //     try {
        //         await SendMail({
        //             to: data.email as string,
        //             subject: `Đặt đơn shop ${env.SHOP_NAME}`,
        //             template: "order",
        //             context: {
        //                 message: "Đơn hàng của bạn đã được đặt thành công",
        //                 href: `${env.FRONTEND}/${envV1.r.order_detail}?${envV1.query.order_detail}=${order._id}`,
        //             },
        //         });
        //     } catch {}
        // }
        // await order.save();
        return rs;
    }

    public async gets() {
        return await OrderModel.find({});
    }

    public async update(id: string, data) {
        const order = await OrderModel.findOneAndUpdate({ _id: id }, data, {
            new: true,
        });
        if (!order) throw new Error("Không tìm thấy đơn hàng có id là: " + id);
        return order;
    }

    public async getDetail(id: string) {
        const order = await OrderModel.findById(id);
        if (!order) throw new Error("Không tìm thấy đơn hàng có id là: " + id);
        return order;
    }
}

export default new OrderService();
