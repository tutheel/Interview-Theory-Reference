const prisma = require('@prisma/client');
const client = new prisma.PrismaClient();

async function main() {
  await client.searchAudit.create({
    data: { userId: 'seed-user', query: 'seed query' }
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
