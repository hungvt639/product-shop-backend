import { Next, Req, Res } from "../interfaces/Express";
import HttpResponse from "../utils/response";

const locales = (req: Req, res: Res, next: Next) => {
    const { locale } = req.params;
    console.log(req);

    console.log(locale);
    next();
};
export default locales;
