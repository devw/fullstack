import { Query, Resolver, Ctx } from "type-graphql";
import { Post as PostEntity } from "../entities/post.entity";
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};

@Resolver()
export class PostResolver {
    @Query(() => [PostEntity])
    posts(@Ctx() { em }: MyContext): Promise<PostEntity[]> {
        return em.find(PostEntity, {});
    }
}
