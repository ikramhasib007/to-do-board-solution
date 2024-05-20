/// <reference types="node" />

module.exports = {
  client: {
    clientOnlyDirectives: ["connection", "type"],
    clientSchemaDirectives: ["client", "rest"],
    service: {
      name: 'api-engine',
      url: 'http://localhost:4001/graphql'
    },
    includes: ["./src/**/*.{ts,js,tsx}"],
  }
};
