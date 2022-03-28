import { Request } from "express";
import { IncomingMessage, ServerResponse } from "http";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";

const pad = (num: number) => (num > 9 ? "" : "0") + num;

export const generator = (time: number | Date, index?: number) => {
    if (!time) time = new Date();
    if (!index) index = 0;
    if (typeof time === "number") time = new Date(time);
    const year = time.getFullYear();
    const month = pad(time.getMonth() + 1);
    const day = pad(time.getDate());
    const fileName = `${year}/${year}_${month}_${day}-${index}.log`;

    return fileName;
};

morgan.token("body", function (req: Request, res) {
    return JSON.stringify(req.body);
});

export default (
    format: string,
    option?: morgan.Options<IncomingMessage, ServerResponse>
) => morgan(format, option);
