import { extendType, objectType, nonNull, stringArg, intArg } from "nexus";

/* Schema */

/* User Schema */
// type User {
//     email: String!
//     id: Int!
//     links: [Link!]!
//     name: String!
//     password: String!
//   }
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
        console.log(
          `id: ${parent.id}, name: ${parent.name}, email: ${parent.email}`
        );
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .links();
      },
    });
    t.nonNull.list.nonNull.field("votes", {
      type: "Link",
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .votes();
      },
    });
  },
});

/* Query */

/* Users Query */

// type Query {
//     users: [User!]!
//   }
export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(parent, args, context, info) {
        return context.prisma.user.findMany();
      },
    });
  },
});
