import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { NumberResolver } from "./resolvers/number";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const app = express();
    // const post = orm.em.create(Post, { title: "My 6th post" });
    // await orm.em.persistAndFlush(post);
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [NumberResolver],
            validate: false,
        }),
    });

    apolloServer.applyMiddleware({ app });

    const posts = await orm.em.find(Post, {});
    app.get("/", (_, res) => res.send(posts));
    app.listen(4000, () =>
        console.log("Server started at http://localhost:4000")
    );
};

main().catch((err) => {
    console.log(err);
});
