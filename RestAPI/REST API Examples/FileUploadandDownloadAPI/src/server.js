const app = require('./app');
const config = require('./config');
const prisma = require('./lib/prisma');
const logger = require('./lib/logger');

const server = app.listen(config.port, () => {
  logger.info({ port: config.port }, 'server.started');
});

async function shutdown(signal) {
  logger.info({ signal }, 'server.shutting_down');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
