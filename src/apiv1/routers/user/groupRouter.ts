import { Router } from "express";
import auth from "../../middlewares/authentication";
import _ from "../../middlewares/fnHandler";
import role from "../../middlewares/role";
import { ROUTE } from "../_const";
import GrCtl from "../../controllers/user/groupController";
const grRoute = ROUTE.group;

const GrRouter = Router();

GrRouter.use(auth);
GrRouter.use(role);

GrRouter.get(grRoute.get_groups, _(GrCtl.getGroups));
GrRouter.post(grRoute.create_group, _(GrCtl.createGroup));
GrRouter.delete(grRoute.delete_group, _(GrCtl.deleteGroup));
GrRouter.put(grRoute.update_permission_in_group, _(GrCtl.permissionOfGroup));

export default GrRouter;
