import app from './app.js';
import config from './config.js';
import prisma from './lib/prisma.js';
import logger from './lib/logger.js';

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
