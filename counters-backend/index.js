const config = require('./utils/config');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`The server is running on port ${config.PORT}`);
  console.log(`Environment: ${config.ENV}`);
  console.log(`Redis: ${config.REDIS_URL}`);
  console.log(`Mongo: ${config.MONGO_URL}`);
  console.log(`Release: ${process.env.RELEASE_HASH}`);
});
