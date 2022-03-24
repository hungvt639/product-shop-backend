import PerCtl from "../controllers/permissionController";
import { Router } from "express";
import auth from "../middlewares/authentication";
import _ from "../middlewares/fnHandler";
import role from "../middlewares/role";
import { ROUTE } from "./_const";

const pRoute = ROUTE.permission;

const PerRouter = Router();

PerRouter.post(pRoute.create_per, auth, role, _(PerCtl.createPermission));
PerRouter.get(pRoute.list_per, auth, role, _(PerCtl.getListPermission));
PerRouter.put(pRoute.edit_per, auth, role, _(PerCtl.editPermission));
PerRouter.delete(pRoute.delete_per, auth, role, _(PerCtl.deletePermission));
PerRouter.get(pRoute.list_url, auth, role, _(PerCtl.getListUrl));

export default PerRouter;
