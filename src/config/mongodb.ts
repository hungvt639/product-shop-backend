import mongoose from "mongoose";
import env from "./env";

class ConnectMongoose {
    public async connect() {
        await mongoose.connect(env.MONGO_DB);
        console.log("___Connect MongoDB___");
    }
    public async disConnet() {
        await mongoose.disconnect();
        console.log("___Disconent MongoDB___");
    }
}

export default new ConnectMongoose();
