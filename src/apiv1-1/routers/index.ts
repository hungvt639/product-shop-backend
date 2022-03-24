import { Router } from "express";
import UserRouter from "./userRouter";
import PerRouter from "./permissionRouter";
import GrRouter from "./groupRouter";
import { errorHandler } from "../utils/errorHandler ";
import { ROUTE } from "./_const";

const ApiV1_1 = Router();
ApiV1_1.use(ROUTE.user.root, UserRouter);
ApiV1_1.use(ROUTE.permission.root, PerRouter);
ApiV1_1.use(ROUTE.group.root, GrRouter);

ApiV1_1.use(errorHandler);
export default ApiV1_1;
