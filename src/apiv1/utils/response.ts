import { StatusCodes } from "http-status-codes";
import { Res } from "../interfaces/Express";

class HttpResponse {
    public badRequest(res: Res, message: string) {
        res.status(StatusCodes.BAD_REQUEST).json({ message });
    }

    public ok(res: Res, data: any) {
        res.status(StatusCodes.OK).json(data);
    }

    public unauthorizer(res: Res, message: string) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message });
    }

    public forbidden(res: Res, message: string) {
        res.status(StatusCodes.FORBIDDEN).json({ message });
    }
}

export default new HttpResponse();
