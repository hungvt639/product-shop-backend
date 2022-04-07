import { StatusCodes } from "http-status-codes";
import imgur from "../config/imgur";

class FIleService {
    public async uploadImgUr(file: Express.Multer.File) {
        const response = await imgur.upload({
            image: file.buffer,
            type: "stream",
        });
        if (response.status !== StatusCodes.OK) {
            throw new Error(response.data as unknown as string);
        }
        return response.data;
    }
}

export default new FIleService();
