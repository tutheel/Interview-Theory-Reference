const prisma = require('@prisma/client');
const bcrypt = require('bcryptjs');
const client = new prisma.PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Password123!', 10);

  await client.user.upsert({
    where: { email: 'demo.user@example.com' },
    update: {},
    create: {
      email: 'demo.user@example.com',
      name: 'Demo User',
      passwordHash: hash
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
