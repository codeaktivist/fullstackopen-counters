const config = require('./utils/config');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`The server is running on port ${config.ENV}`);
  console.log(`Environment: ${config.PORT}`);
});
