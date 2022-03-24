import { Router } from "express";
import UserRouter from "./userRouter";
import { errorHandler } from "../utils/errorHandler ";

const ApiV2 = Router();
ApiV2.use("/user", UserRouter);
ApiV2.use(errorHandler);

export default ApiV2;
