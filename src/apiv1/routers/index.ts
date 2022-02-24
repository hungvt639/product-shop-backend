import { Router } from "express";
import UserRouter from "./userRouter";
import { errorHandler } from "../utils/errorHandler ";

const ApiV1 = Router();
ApiV1.use("/user", UserRouter);
ApiV1.use(errorHandler);

export default ApiV1;
