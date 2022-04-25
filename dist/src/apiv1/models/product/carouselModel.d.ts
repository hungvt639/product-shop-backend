import mongoose from "mongoose";
export declare class Carousel {
    image: String;
    constructor(image: string);
}
declare const CarouselModel: mongoose.Model<Carousel, {}, {}, {}>;
export default CarouselModel;
