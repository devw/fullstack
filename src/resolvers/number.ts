import { Resolver, Query } from "type-graphql";

@Resolver()
export class NumberResolver {
    @Query(() => Number)
    number() {
        return 1;
    }
}
