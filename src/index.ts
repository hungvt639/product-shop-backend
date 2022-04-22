import ApiV1 from "./apiv1/routers";

import express from "express";
import morgan from "./utils/morgan";
import * as path from "path";
import ConnectMongoose from "./config/mongodb";
import bodyParser from "body-parser";
import env from "./config/env";
import cors from "cors";
import { generator } from "./utils/morgan";
import * as rfs from "rotating-file-stream";

const accessLogStream = rfs.createStream(generator, {
    interval: "1d",
    size: "10M",
    path: path.join(__dirname, "../", "log"),
});

const app = express();

app.use("/public", express.static(path.join(__dirname, "../", "public")));
app.use(
    morgan(
        ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]",
        { stream: accessLogStream }
    )
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(env.APIV1, ApiV1);

app.listen(env.PORT, async () => {
    await ConnectMongoose.connect();
    console.log(`App listening at http://0.0.0.0:${env.PORT}`);
});
