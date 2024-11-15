const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CausaRepository {
  async createCausa(causaData) {
    return await prisma.causa.create({
      data: causaData,
    });
  }

  async getCausaById(id) {
    return await prisma.causa.findUnique({
      where: { id },
      include: {
        Usuario: true,  // Incluir datos del usuario que creó la causa
        Categoria: true // Incluir información de la categoría de la causa
      }
    });
  }

  async updateCausa(id, causaData) {
    return await prisma.causa.update({
      where: { id },
      data: causaData,
    });
  }

  async deleteCausa(id) {
    return await prisma.causa.delete({
      where: { id },
    });
  }

  async getTotalCausasByDay() {
    return await prisma.causa.groupBy({
      by: ['fechaInicio'],
      _count: {
        id: true,
      },
    });
  }

  async getCausasByUserId(userId) {
    return await prisma.causa.findMany({
      where: { idUsuario: userId },
      include: {
        Categoria: true // Incluir información de la categoría en cada causa
      }
    });
  }
}

module.exports = new CausaRepository();
