import { extendType, objectType, nonNull, stringArg, intArg } from "nexus";

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nonNull.list.nonNull.field("links", {
            type: "Link",
            resolve(parent, args, context) {
                console.log(`id: ${parent.id}, name: ${parent.name}, email: ${parent.email}`)
                return context.prisma.user
                .findUnique({
                    where: {id: parent.id}
                })
                .links();
            }
        })
    },
})