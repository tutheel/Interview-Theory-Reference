const fs = require('fs');
const path = require('path');
const prisma = require('@prisma/client');
const client = new prisma.PrismaClient();

async function main() {
  const uploadsDir = path.resolve(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const seedFilePath = path.join(uploadsDir, 'seed.txt');
  fs.writeFileSync(seedFilePath, 'seed file', 'utf8');

  await client.fileRecord.create({
    data: {
      originalName: 'seed.txt',
      storedName: 'seed.txt',
      mimeType: 'text/plain',
      size: 9,
      path: seedFilePath
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
