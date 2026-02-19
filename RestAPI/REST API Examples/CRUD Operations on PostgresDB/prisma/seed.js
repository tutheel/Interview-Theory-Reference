import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  await client.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { email: 'alice@example.com', name: 'Alice' }
  });

  await client.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: { email: 'bob@example.com', name: 'Bob' }
  });

  const alice = await client.user.findUnique({ where: { email: 'alice@example.com' } });

  await client.product.createMany({
    data: [
      {
        name: 'Laptop',
        description: '14 inch dev laptop',
        price: 1499.99,
        userId: alice.id
      },
      {
        name: 'Mechanical Keyboard',
        description: 'Brown switch keyboard',
        price: 129.50
      }
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
