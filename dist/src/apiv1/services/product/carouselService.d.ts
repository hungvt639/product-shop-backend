/// <reference types="mongoose" />
/// <reference types="mongoosastic/node_modules/mongoose" />
/// <reference types="mongoose-paginate-v2" />
import { Carousel } from "../../models/product/carouselModel";
declare class CarouselService {
    create(image: string): Promise<import("mongoose").Document<any, any, Carousel> & Carousel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    gets(): Promise<(import("mongoose").Document<any, any, Carousel> & Carousel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    del(id: string): Promise<void>;
    edit(id: string, image: string): Promise<import("mongoose").Document<any, any, Carousel> & Carousel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
declare const _default: CarouselService;
export default _default;
