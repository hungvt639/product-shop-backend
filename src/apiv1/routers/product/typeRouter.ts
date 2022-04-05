import { Router } from "express";
import auth from "../../middlewares/authentication";
import _ from "../../middlewares/fnHandler";
import role from "../../middlewares/role";
import { ROUTE } from "../_const";
import TypeCtl from "../../controllers/product/typeController";
const typeRoute = ROUTE.type;

const TypeRouter = Router();

TypeRouter.get(typeRoute.get_list_type, _(TypeCtl.gets));

TypeRouter.use(auth);
TypeRouter.use(role);

TypeRouter.post(typeRoute.create_type, _(TypeCtl.create));
TypeRouter.put(typeRoute.edit_type, _(TypeCtl.editType));
TypeRouter.delete(typeRoute.delete_type, _(TypeCtl.deleteType));

export default TypeRouter;
