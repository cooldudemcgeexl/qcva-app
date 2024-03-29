import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: './documents/**/*.graphql',
  generates: {
    '../client/node_modules/@generated/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node']
    }
  }
}
export default config