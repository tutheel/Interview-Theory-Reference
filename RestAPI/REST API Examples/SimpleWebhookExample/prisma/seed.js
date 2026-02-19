const prisma = require('@prisma/client');
const client = new prisma.PrismaClient();

async function main() {
  await client.webhookEvent.create({
    data: {
      eventId: 'seed-event-1',
      payload: { eventId: 'seed-event-1', type: 'seed.created' },
      processedAt: new Date()
    }
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
