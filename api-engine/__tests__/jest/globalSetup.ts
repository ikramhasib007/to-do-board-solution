import server from "../../src/server";

module.exports = async () => {
  globalThis.__httpServer__ = await server.listen(process.env.HTTP_PORT);
};
