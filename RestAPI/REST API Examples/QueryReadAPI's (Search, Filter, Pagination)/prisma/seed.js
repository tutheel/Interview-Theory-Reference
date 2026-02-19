const prisma = require('@prisma/client');
const client = new prisma.PrismaClient();

async function main() {
  const seedItems = [
    { sku: 'BK-1001', name: 'Clean Architecture', category: 'books', description: 'Software architecture book', price: 41.99 },
    { sku: 'BK-1002', name: 'Designing Data-Intensive Applications', category: 'books', description: 'Data systems book', price: 53.0 },
    { sku: 'EL-2001', name: 'Noise Cancelling Headphones', category: 'electronics', description: 'Wireless over-ear', price: 199.5 },
    { sku: 'EL-2002', name: 'USB-C Dock', category: 'electronics', description: '8-in-1 docking station', price: 89.0 },
    { sku: 'HM-3001', name: 'Standing Desk', category: 'home', description: 'Adjustable desk', price: 399.99 },
    { sku: 'HM-3002', name: 'Ergonomic Chair', category: 'home', description: 'Lumbar support chair', price: 289.49 }
  ];

  for (const item of seedItems) {
    await client.catalogItem.upsert({
      where: { sku: item.sku },
      update: {},
      create: item
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
