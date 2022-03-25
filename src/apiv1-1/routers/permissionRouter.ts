import PerCtl from "../controllers/permissionController";
import { Router } from "express";
import auth from "../middlewares/authentication";
import _ from "../middlewares/fnHandler";
import role from "../middlewares/role";
import { ROUTE } from "./_const";

const pRoute = ROUTE.permission;

const PerRouter = Router();

PerRouter.use(auth);
PerRouter.use(role);

PerRouter.post(pRoute.create_per, _(PerCtl.createPermission));
PerRouter.get(pRoute.list_per, _(PerCtl.getListPermission));
PerRouter.put(pRoute.edit_per, _(PerCtl.editPermission));
PerRouter.delete(pRoute.delete_per, _(PerCtl.deletePermission));
PerRouter.get(pRoute.list_url, _(PerCtl.getListUrl));

export default PerRouter;
