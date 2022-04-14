import { Router } from "express";
import auth from "../../middlewares/authentication";
import _ from "../../middlewares/fnHandler";
import role from "../../middlewares/role";
import { ROUTE } from "../_const";
import PCtl from "../../controllers/product/productController";
const pRoute = ROUTE.product;

const ProductRouter = Router();

ProductRouter.get(pRoute.get_product_sale, _(PCtl.gets_sale));
ProductRouter.get(pRoute.get_product, _(PCtl.get));
ProductRouter.get(pRoute.get_list_product, _(PCtl.gets));

ProductRouter.use(auth);
ProductRouter.use(role);
ProductRouter.post(pRoute.create_product, _(PCtl.create));
ProductRouter.put(pRoute.edit_product, _(PCtl.edit));
ProductRouter.delete(pRoute.delete_product, _(PCtl.deleteP));

export default ProductRouter;
