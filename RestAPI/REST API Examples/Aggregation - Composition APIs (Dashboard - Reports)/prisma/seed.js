const prisma = require('@prisma/client');
const client = new prisma.PrismaClient();

async function main() {
  const stats = [
    { metric: 'activeUsers', value: 1240 },
    { metric: 'newUsersToday', value: 52 },
    { metric: 'openTickets', value: 14 }
  ];

  for (const stat of stats) {
    await client.teamStat.upsert({
      where: { metric: stat.metric },
      update: { value: stat.value },
      create: stat
    });
  }

  await client.salesRecord.createMany({
    data: [
      { region: 'NA', amount: 1200.5, status: 'paid' },
      { region: 'EU', amount: 860.75, status: 'paid' },
      { region: 'APAC', amount: 430.0, status: 'pending' }
    ]
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
