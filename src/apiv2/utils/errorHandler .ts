import { Req, Res, Next } from "../interfaces/Express";
import HttpResponse from "./response";

export function errorHandler(err: any, req: Req, res: Res, next: Next) {
    HttpResponse.badRequest(res, err.message);
}

// class ServerError extends Error {
//     message: string;
//     status: number;
//     data?: any;

//     constructor(status: number, message: string = "", data?: any) {
//         super();
//         this.status = status;
//         this.message = message;
//         this.data = data;
//     }
// }

// class UnauthorizedError extends ServerError {
//     constructor(message: string = "Unauthorized") {
//         super(StatusCodes.UNAUTHORIZED, message);
//     }
// }

// class BadRequestError extends ServerError {
//     constructor(message: string = "Bad Request") {
//         super(StatusCodes.BAD_REQUEST, message);
//     }
// }

// // error failure response function
// class FailureError extends Error {
//     message: string;
//     data?: any;
//     constructor(message: string = "", data?: any) {
//         super();
//         this.message = message;
//         this.data = data;
//     }
// }

// export const errorHandler = (err: Error, req: Req, res: Res, next: Next) => {
//     if (err) {
//         if (err instanceof ServerError) {
//             return res
//                 .status(err.status)
//                 .json({ message: err.message, data: err.data });
//         } else if (err instanceof FailureError) {
//             return res
//                 .status(StatusCodes.BAD_REQUEST)
//                 .json({ message: err.message, data: err.data });
//         }
//         return res
//             .status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .json({ message: "Internal Server Error" });
//     }
//     return next();
// };
