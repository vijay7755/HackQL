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
    t.dateTime("createdAt");
    t.field("postedBy", {
      type: "User",
      resolve(parent, args, context) {
        console.log(`parent: ${parent.id}, desc: ${parent.description}`);
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .postedBy();
      },
    });
    t.nonNull.list.nonNull.field("voters", {
      type: "User",
      resolve(parent, args, context, info) {
        // console.log(`parent: ${parent.id}, `)
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .voters();
      },
    });
  },
});

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
        return context.prisma.link.findMany();
      },
    });
  },
});

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
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const link = context.prisma.link.findUnique({
          where: {
            id: args.id,
          },
        });
        return link;
      },
    });
  },
});

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
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { description, url } = args;
        const { userId } = context;
        console.log("userId: ", userId);
        console.log(`description: ${description}, url: ${url}`);
        if (!userId) {
          // 1
          console.log("Invalid user!");
          throw new Error("Cannot post without logging in.");
        }

        const newLink = context.prisma.link.create({
          data: {
            description,
            url,
            postedBy: { connect: { id: userId } },
          },
        });

        return newLink;
      },
    });
  },
});

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
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { id, description, url } = args;

        const updateLink = context.prisma.link.update({
          where: {
            id: id,
          },
          data: {
            description,
            url,
          },
        });

        return updateLink;
      },
    });
  },
});

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
        const { id } = args;
        const deleteLink = context.prisma.link.delete({
          where: {
            id: id,
          },
        });
        return deleteLink;
      },
    });
  },
});
