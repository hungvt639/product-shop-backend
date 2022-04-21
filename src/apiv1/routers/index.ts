import { Router } from "express";
import UserRouter from "./user/userRouter";
import PermisionRouter from "./user/permissionRouter";
import GroupRouter from "./user/groupRouter";
import SizeRouter from "./product/sizeRouter";
import ColorRouter from "./product/colorRouter";

import FileRouter from "./fileRouter";
import { errorHandler } from "../utils/errorHandler ";
import { ROUTE } from "./_const";
import TypeRouter from "./product/typeRouter";
import ProductRouter from "./product/productRouter";
import OrderRouter from "./product/orderRouter";
import CarouselRouter from "./product/carouselRouter";
import CountryRouter from "./countriesRouter";

const ApiV1 = Router();

ApiV1.use(ROUTE.user.root, UserRouter);
ApiV1.use(ROUTE.permission.root, PermisionRouter);
ApiV1.use(ROUTE.group.root, GroupRouter);
ApiV1.use(ROUTE.file.root, FileRouter);
ApiV1.use(ROUTE.size.root, SizeRouter);
ApiV1.use(ROUTE.color.root, ColorRouter);
ApiV1.use(ROUTE.type.root, TypeRouter);
ApiV1.use(ROUTE.product.root, ProductRouter);
ApiV1.use(ROUTE.carousel.root, CarouselRouter);
ApiV1.use(ROUTE.order.root, OrderRouter);
ApiV1.use(ROUTE.country.root, CountryRouter);

ApiV1.use(errorHandler);
export default ApiV1;
