const fastify = require('fastify');
const app = require('../index');

module.exports = function setupTestEnvironment() {
  const server = fastify({
    logger: false,
  });

  beforeAll(async () => {
    await server.register(app)
  })
}