/// <reference types="multer" />
declare class FIleService {
    uploadImgUr(file: Express.Multer.File): Promise<import("imgur/lib/common/types").ImageData>;
}
declare const _default: FIleService;
export default _default;
