import env from "../../../config/env";
import envV1 from "../../config/_envV1";
import { Querys } from "../../interfaces/Express";
import OrderModel, {
    Order,
    StatusOrder,
} from "../../models/product/orderModel";
import ProductModel from "../../models/product/productModel";
import SendMail from "../../utils/sendEmail";
class OrderService {
    public async create(data) {
        const orderProduct = await Promise.all(
            data.orderProducts.map(async (op) => {
                const product = await ProductModel.findOne(
                    { _id: op.product_id, isSale: true },
                    "_id name slug img img1 price sizes colors type"
                ).populate({ path: "type", select: "name" });
                if (!product)
                    throw new Error(
                        "Đơn hàng có chứa sản phầm không còn được bán"
                    );
                const type: any = product.type;
                const proOrder = {
                    ...op,
                    product: {
                        ...product.toJSON(),
                        type: type.name,
                    },
                };
                delete proOrder["product_id"];

                return proOrder;
            })
        );
        const price =
            orderProduct.reduce((a, b) => a + b.product.price * b.amount, 0) +
            env.SHIP;
        const order = await OrderModel.create({ ...data, price, orderProduct });
        if (order.email) {
            try {
                await SendMail({
                    to: data.email as string,
                    subject: `Đặt đơn shop ${env.SHOP_NAME}`,
                    template: "order",
                    context: {
                        message: "Đơn hàng của bạn đã được đặt thành công",
                        href: `${env.FRONTEND}/${envV1.r.order_detail}/${order._id}`,
                    },
                });
            } catch {}
        }
        await order.save();
        return order;
    }

    public async gets(options: Querys, filter: Object, sort: string) {
        return await OrderModel.paginate(filter, {
            ...options,
            sort,
        });
    }

    public async update(id: string, { status, noteAdmin }) {
        const order = await OrderModel.findById(id);
        if (!order) throw new Error("Không tìm thấy đơn hàng có id là: " + id);

        if (status) {
            let isPlus = 0;
            if (
                order.status === StatusOrder["Đã nhận hàng"] &&
                status !== order.status
            )
                isPlus = -1;
            if (
                order.status !== StatusOrder["Đã nhận hàng"] &&
                status === StatusOrder["Đã nhận hàng"]
            )
                isPlus = 1;
            if (isPlus) {
                await Promise.all(
                    order.orderProduct.map(async (op) => {
                        const product = await ProductModel.findById(
                            op.product._id
                        );
                        product.sold += isPlus * op.amount;
                        await product.save();
                    })
                );
            }
            if (order.email) {
                try {
                    await SendMail({
                        to: order.email as string,
                        subject: `Đặt đơn shop ${env.SHOP_NAME}`,
                        template: "order",
                        context: {
                            message: "Đơn hàng của bạn đã được cập nhật",
                            href: `${env.FRONTEND}/${envV1.r.order_detail}/${order._id}`,
                        },
                    });
                } catch {}
            }
            order.status = status;
        }
        if (noteAdmin) order.noteAdmin = noteAdmin;
        await order.save();
        return order;
    }

    public async getDetail(id: string) {
        const data = await OrderModel.findById(id);
        if (!data) throw new Error("Không tìm thấy đơn hàng có id là: " + id);
        return data;
    }
}

export default new OrderService();
