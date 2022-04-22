import { Router } from "express";
import auth from "../middlewares/authentication";
import _ from "../middlewares/fnHandler";
import role from "../middlewares/role";
import { ROUTE } from "./_const";
import BlogLinkCtl from "../controllers/blogLinkController";
const blRoute = ROUTE.blog_link;

const BlogLinkRouter = Router();

BlogLinkRouter.get(blRoute.get_list_blog_link, _(BlogLinkCtl.gets));
BlogLinkRouter.get(blRoute.get_blog_link, _(BlogLinkCtl.get));

BlogLinkRouter.use(auth);
BlogLinkRouter.use(role);
BlogLinkRouter.post(blRoute.creat_blog_link, _(BlogLinkCtl.create));
BlogLinkRouter.put(blRoute.edit_blog_link, _(BlogLinkCtl.edit));
BlogLinkRouter.delete(blRoute.delete_blog_link, _(BlogLinkCtl.del));

export default BlogLinkRouter;
