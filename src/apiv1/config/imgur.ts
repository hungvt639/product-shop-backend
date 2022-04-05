import { ImgurClient } from "imgur";
import env from "../../config/env";
const imgur = new ImgurClient({
    clientId: env.IMGUR_ID,
});
export default imgur;
