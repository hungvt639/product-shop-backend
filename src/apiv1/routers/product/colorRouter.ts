import { Router } from "express";
import auth from "../../middlewares/authentication";
import _ from "../../middlewares/fnHandler";
import role from "../../middlewares/role";
import { ROUTE } from "../_const";
import ColorCtl from "../../controllers/product/colorController";
const colorRoute = ROUTE.color;

const ColorRouter = Router();

ColorRouter.use(auth);
ColorRouter.use(role);

ColorRouter.get(colorRoute.get_list_color, _(ColorCtl.gets));
ColorRouter.post(colorRoute.create_color, _(ColorCtl.create));
ColorRouter.put(colorRoute.edit_color, _(ColorCtl.editColor));
ColorRouter.delete(colorRoute.delete_color, _(ColorCtl.deleteColor));

export default ColorRouter;
