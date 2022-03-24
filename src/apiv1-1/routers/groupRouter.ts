import { Router } from "express";
import auth from "../middlewares/authentication";
import _ from "../middlewares/fnHandler";
import role from "../middlewares/role";
import { ROUTE } from "./_const";
import GrCtl from "../controllers/groupController";
const grRoute = ROUTE.group;

const GrRouter = Router();

GrRouter.get(grRoute.get_groups, auth, role, _(GrCtl.getGroups));
GrRouter.post(grRoute.create_group, auth, role, _(GrCtl.createGroup));
GrRouter.delete(grRoute.delete_group, auth, role, _(GrCtl.deleteGroup));
GrRouter.put(
    grRoute.update_permission_in_group,
    auth,
    role,
    _(GrCtl.permissionOfGroup)
);

export default GrRouter;
