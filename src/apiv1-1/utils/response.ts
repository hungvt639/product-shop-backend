import { StatusCodes } from "http-status-codes";
import { Res } from "../interfaces/Express";

function badRequest(res: Res, message: string) {
    res.status(StatusCodes.BAD_REQUEST).json({ message });
}

function ok(res: Res, data: any) {
    res.status(StatusCodes.OK).json(data);
}

function unauthorizer(res: Res, message: string) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message });
}

function forbidden(res: Res, message: string) {
    res.status(StatusCodes.FORBIDDEN).json({ message });
}

const HttpResponse = {
    badRequest,
    ok,
    unauthorizer,
    forbidden,
};
export default HttpResponse;
