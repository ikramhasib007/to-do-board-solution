import server from './server';

const HTTP_PORT = process.env.HTTP_PORT || 3001;

// Start the server and you're done!
server.listen(HTTP_PORT, () => {
  console.info(`🚀 Server is running on http://localhost:${HTTP_PORT}/graphql`);
});
