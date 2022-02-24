import dotenv from "dotenv";
dotenv.config();

import ApiV1 from "./apiv1/routers";
import express from "express";
import morgan from "morgan";
import * as path from "path";
import connect from "./config/mongodb";
import bodyParser from "body-parser";
import Config from "./config/const";
import cors from "cors";

connect();
const app = express();

app.use("/public", express.static(path.join(__dirname, "../", "public")));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/apiv1", ApiV1);
app.listen(Config.PORT, () => {
    console.log(`App listening at http://0.0.0.0:${Config.PORT}`);
});
