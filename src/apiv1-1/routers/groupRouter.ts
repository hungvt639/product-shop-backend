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
GrRouter.post(grRoute.add_per_to_gr, auth, role, _(GrCtl.addPerToGroup));
GrRouter.put(
    grRoute.remove_per_from_group,
    auth,
    role,
    _(GrCtl.removePerFromGroup)
);

export default GrRouter;
