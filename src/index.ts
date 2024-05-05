import { ApolloServer } from "apollo-server";

import { schema } from "./schema";
import { context } from "./context";

console.log("schema")
// console.log(schema)

export const server = new ApolloServer({
  schema,
  context
});

const port = 3007;

server.listen({ port }).then(({ url }) => {
  console.log(`server ready at ${url}`);
});
