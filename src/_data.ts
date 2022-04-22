import ConentMongoose from "./config/mongodb";

import dataApiV1 from "./apiv1/_data/data";

const addData = async () => {
    await ConentMongoose.connect();
    await dataApiV1();
    await ConentMongoose.disConnet();
};

addData();
