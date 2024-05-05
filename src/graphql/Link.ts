import { extendType, objectType, nonNull, stringArg, intArg } from "nexus";

/* Schema */

/* Link Schema */
// type Link {
//     description: String!
//     id: Int!
//     url: String!
//   }
export const Link = objectType({
    name: "Link",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("description");
        t.nonNull.string("url");
        t.field("postedBy", {
            type: "User",
            resolve(parent, args, context) {  // 2
                return context.prisma.link
                    .findUnique({ where: { id: parent.id } })
                    .postedBy();
            }
        })
    },
})


/* Query */

/* Links Query */
// type Query {
//     feed: [Link!]!
//   }
export const LinksQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {
            type: "Link",
            resolve(parent, args, context, info) {
                return context.prisma.link.findMany()
            }
        })
    }
})

/* Link Query */
// type Query {
//     link(id: Int!): Link!
//   }
export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("link", {
            type: "Link",
            args: {
                id: nonNull(intArg())
            },
            resolve(parent, args, context) {
                const link = context.prisma.link.findUnique({
                    where: {
                        id: args.id
                    }
                })
                return link
            }
        })
    },
})


/* Mutaiton */

/* Create Link Mutation */
// type Mutation {
//     post(description: String!, url: String!): Link!
//   }
export const CreateLinkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Link",
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg())
            },
            resolve(parent, args, context) {
                const {description, url} = args

                const newLink = context.prisma.link.create({
                    data: {
                        description,
                        url
                    }
                })

                return newLink
            }
        })
    }
})

/* Update Link Mutaiton */
// type Mutation {
//     update(description: String!, id: Int!, url: String!): Link!
//   }
export const UpdateLinkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("update", {
            type: "Link",
            args: {
                id: nonNull(intArg()),
                description: nonNull(stringArg()),
                url: nonNull(stringArg())
            },
            resolve(parent, args, context) {
                const {id, description, url} = args

                const updateLink = context.prisma.link.update({
                    where: {
                        id: id
                    },
                    data: {
                        description,
                        url
                    }
                })

                return updateLink
            }
        })
    },
})

/* Delete Link Mutaiton */
// type Mutation {
//     delete(id: Int!): Link!
//   }
export const DeleteLinkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("delete", {
            type: "Link",
            args: {
                id: nonNull(intArg()),
            },
            resolve(parent, args, context) {
                const {id} = args
                const deleteLink = context.prisma.link.delete({
                    where: {
                        id: id
                    }
                })
                return deleteLink
            }
        })
    },
})