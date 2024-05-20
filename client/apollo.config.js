/// <reference types="node" />

module.exports = {
  client: {
    clientOnlyDirectives: ["connection", "type"],
    clientSchemaDirectives: ["client", "rest"],
    service: {
      name: 'api-engine',
      url: 'http://localhost:5001/graphql'
    },
    includes: ["./src/**/*.{ts,js,tsx}"],
  }
};
