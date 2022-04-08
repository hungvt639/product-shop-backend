import { Router } from "express";
import auth from "../../middlewares/authentication";
import _ from "../../middlewares/fnHandler";
import role from "../../middlewares/role";
import { ROUTE } from "../_const";
import CrsCtl from "../../controllers/product/carouselController";

const crseRoute = ROUTE.carousel;

const CarouselRouter = Router();

CarouselRouter.get(crseRoute.get_list_carousel, _(CrsCtl.gets));

CarouselRouter.use(auth);
CarouselRouter.use(role);

CarouselRouter.post(crseRoute.create_carousel, _(CrsCtl.create));
CarouselRouter.put(crseRoute.edit_carousel, _(CrsCtl.edit));
CarouselRouter.delete(crseRoute.delete_carousel, _(CrsCtl.del));

export default CarouselRouter;
