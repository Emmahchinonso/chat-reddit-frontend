import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "app/graphql/**/*.graphql",
  generates: {
    "app/generate/": {
      preset: "client",
      plugins: ["typescript-urql"],
    },
  },
};

export default config;
