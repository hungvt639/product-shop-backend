import { Router } from "express";
import auth from "../../middlewares/authentication";
import _ from "../../middlewares/fnHandler";
import role from "../../middlewares/role";
import { ROUTE } from "../_const";
import SizeCtl from "../../controllers/product/sizeController";
const sizeRoute = ROUTE.size;

const SizeRouter = Router();

SizeRouter.use(auth);
SizeRouter.use(role);

SizeRouter.get(sizeRoute.get_list_size, _(SizeCtl.gets));
SizeRouter.post(sizeRoute.create_size, _(SizeCtl.create));
SizeRouter.delete(sizeRoute.delete_size, _(SizeCtl.del));

export default SizeRouter;
