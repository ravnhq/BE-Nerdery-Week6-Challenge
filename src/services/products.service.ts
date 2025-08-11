import prisma from '../prisma';

export class ProductService {
  static async getById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  static async getByIdAndClient(id: string, clientId: string) {
    return prisma.product.findFirst({
      where: { id, clientId },
    });
  }
}
