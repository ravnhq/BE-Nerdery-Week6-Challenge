import prisma from '../prisma';

export class ApiKeyService {
  static async findByKey(key: string) {
    return prisma.apiKey.findUnique({
      where: { key },
      include: { client: true },
    });
  }

  static async findByClientId(clientId: string) {
    return prisma.apiKey.findFirst({
      where: { clientId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
