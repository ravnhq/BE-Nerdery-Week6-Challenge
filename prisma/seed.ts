import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create two clients
  const clientA = await prisma.client.upsert({
    where: { email: 'clientA@example.com' },
    update: {},
    create: {
      name: 'Client A',
      email: 'clientA@example.com',
    },
  });

  const clientB = await prisma.client.upsert({
    where: { email: 'clientB@example.com' },
    update: {},
    create: {
      name: 'Client B',
      email: 'clientB@example.com',
    },
  });

  // Create API keys for both clients
  // Set expiration to one year from now
  const now = new Date();
  const inOneYear = new Date(now);
  inOneYear.setFullYear(inOneYear.getFullYear() + 1);

  await prisma.apiKey.upsert({
    where: { key: 'api_key_clientA_1' },
    update: {},
    create: {
      clientId: clientA.id,
      key: 'api_key_clientA_1',
      expiration: inOneYear,
    },
  });

  await prisma.apiKey.upsert({
    where: { key: 'api_key_clientB_1' },
    update: {},
    create: {
      clientId: clientB.id,
      key: 'api_key_clientB_1',
      expiration: inOneYear,
    },
  });

  // Create an example product for clientA
  await prisma.product.upsert({
    where: {
      clientId_name: {
        clientId: clientA.id,
        name: 'Sample Product A'
      }
    },
    update: {},
    create: {
      clientId: clientA.id,
      name: 'Sample Product A',
      description: 'A sample product for Client A',
      stock: 100,
      price: 19.99,
    },
  });

  console.log('Seed finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
