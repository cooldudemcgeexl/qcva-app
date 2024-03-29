import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { PrismaClient } from "@prisma/client";
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from "@generated/type-graphql"
import { buildSchema } from "type-graphql";
import path from "path";


const PORT = (process.env.PORT ? parseInt(process.env.PORT) : null) || 4000;

const SCHEMA_EXPORT_PATH = '../../graphql/schema/schema.graphql'

async function bootstrap() {



    const prisma = new PrismaClient();
    const schema = await buildSchema({
        resolvers,
        validate: false,
        emitSchemaFile: path.resolve(__dirname, SCHEMA_EXPORT_PATH)
    })

    const server = new ApolloServer({
        schema
    });

    const { url } = await startStandaloneServer(server, {
        context: async () => ({ prisma }),
        listen: { port: PORT }
    });

    console.log(`Server running at ${url}`)

}

bootstrap()