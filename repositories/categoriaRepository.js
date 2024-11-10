const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoriaRepository {
  async getCategorias() {
    return await prisma.categoria.findMany();
  }
}

module.exports = new CategoriaRepository();
