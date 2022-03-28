import ApiV1 from "./apiv1/routers";
import ApiV1_1 from "./apiv1-1/routers";
// import ApiV2 from "./apiv2/routers";
// import ApiV3 from "./apiv3/routers";

import express from "express";
import morgan from "./utils/morgan";
import * as path from "path";
import connect from "./config/mongodb";
import bodyParser from "body-parser";
import env from "./config/env";
import cors from "cors";
import dataApiV1_1 from "./apiv1-1/config/data";
import { generator } from "./utils/morgan";
import * as rfs from "rotating-file-stream";

const accessLogStream = rfs.createStream(generator, {
    interval: "1d",
    size: "10M",
    path: path.join(__dirname, "../", "log"),
});
// import dataApiV1 from "./apiv1/config/data";
// import { connectMySql } from "./config/mysql";
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
app.use(env.APIV1_1, ApiV1_1);

// app.use("/apiv2", ApiV2);
// app.use("/apiv3", ApiV3);

app.listen(env.PORT, async () => {
    await connect();
    // await dataApiV1();
    await dataApiV1_1();
    // await connectMySql();
    console.log(`App listening at http://0.0.0.0:${env.PORT}`);
});
