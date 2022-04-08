import mongoose, { Schema } from "mongoose";
import envV1 from "../../config/_envV1";

export class Carousel {
    image: String;

    constructor(image: string) {
        this.image = image;
    }
}

const CarouselSchema = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: false }
);

const CarouselModel = mongoose.model<Carousel>(
    envV1.model.CAROUSE,
    CarouselSchema
);

export default CarouselModel;
