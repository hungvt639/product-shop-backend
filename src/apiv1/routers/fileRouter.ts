import { Router } from "express";
import fileCtl from "../controllers/fileController";
import multer from "multer";
import { ROUTE } from "./_const";
import _ from "../middlewares/fnHandler";
import auth from "../middlewares/authentication";
import role from "../middlewares/role";

const storage = multer.memoryStorage();
const f = multer({ storage: storage });
const fRoute = ROUTE.file;
const File = Router();

File.use(auth);
File.use(role);

File.post(fRoute.upload_img, f.single("image"), _(fileCtl.uploadImgUr));

export default File;
