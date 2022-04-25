import { Res } from "../interfaces/Express";
declare class HttpResponse {
    badRequest(res: Res, message: string): void;
    ok(res: Res, data: any): void;
    unauthorizer(res: Res, message: string): void;
    forbidden(res: Res, message: string): void;
}
declare const _default: HttpResponse;
export default _default;
