import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { PrismaClient } from "@prisma/client";
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from "@generated/type-graphql"
import { buildSchema } from "type-graphql";


const PORT = process.env.PORT || 4000;


async function bootstrap() {



    const prisma = new PrismaClient();
    const schema = await buildSchema({
        resolvers,
        validate: false
    })

    const server = new ApolloServer({
        schema
    });

    const { url } = await startStandaloneServer(server, {
        context: async () => ({ prisma }),
        listen: { port: 4000 }
    });

    console.log(`Server running at ${url}`)

}

bootstrap()