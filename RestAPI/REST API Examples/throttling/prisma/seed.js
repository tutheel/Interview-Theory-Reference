const prisma = require('@prisma/client');
const client = new prisma.PrismaClient();

async function main() {
  await client.readyCheck.create({
    data: { note: 'throttling ready check seed' }
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
