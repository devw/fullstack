import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

const main = async () => {
    await MikroORM.init(microConfig);
};

main().catch((err) => {
    console.log(err);
});
