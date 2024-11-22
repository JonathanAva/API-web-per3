const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoriaRepository {
  async getCategorias() {
    return await prisma.categoria.findMany();
  }

  async getCategoriasConCausasCount() {
    return await prisma.categoria.findMany({
      include: {
        _count: {
          select: { Causas: true },
        },
      },
    });
  }


}

module.exports = new CategoriaRepository();
