import { Router } from "express";
import auth from "../../middlewares/authentication";
import _ from "../../middlewares/fnHandler";
import role from "../../middlewares/role";
import { ROUTE } from "../_const";
import OrderCtl from "../../controllers/product/orderController";
const orderRoute = ROUTE.order;

const OrderRouter = Router();

OrderRouter.post(orderRoute.create_order, _(OrderCtl.create));
OrderRouter.get(orderRoute.get_order_detail, _(OrderCtl.getDetail));

OrderRouter.use(auth);
OrderRouter.use(role);
OrderRouter.get(orderRoute.get_list_order, _(OrderCtl.gets));
OrderRouter.put(orderRoute.updte_order, _(OrderCtl.update));

export default OrderRouter;
