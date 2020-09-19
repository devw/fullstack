import { Query, Resolver, Ctx } from "type-graphql";
import { Post } from "../entities/Post";
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }
}
