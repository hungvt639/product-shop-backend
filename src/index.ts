import dotenv from "dotenv";
dotenv.config();

import ApiV1 from "./apiv1/routers";
import ApiV2 from "./apiv2/routers";

import express from "express";
import morgan from "morgan";
import * as path from "path";
import connect from "./config/mongodb";
import bodyParser from "body-parser";
import env from "./config/env";
import cors from "cors";
import { connectMySql } from "./config/mysql";

connect();
connectMySql();

const app = express();

app.use("/public", express.static(path.join(__dirname, "../", "public")));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/apiv1", ApiV1);
app.use("/apiv2", ApiV2);

app.listen(env.PORT, () => {
    console.log(`App listening at http://0.0.0.0:${env.PORT}`);
});
