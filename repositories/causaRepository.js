const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CausaRepository {
  // Método para obtener las últimas seis causas
  async getLastSixCausas() {
    return await prisma.causa.findMany({
      orderBy: { fechaInicio: 'desc' },
      take: 6,
      include: {
        Usuario: { select: { nombre: true } }, // Incluye el nombre del usuario
        Categoria: true,
      },
    });
  }

  // Método para crear una nueva causa
  async createCausa(causaData) {
    return await prisma.causa.create({
      data: causaData,
    });
  }

  // Método para obtener una causa por ID
  async getCausaById(id) {
    return await prisma.causa.findUnique({
      where: { id: parseInt(id) },
      include: {
        Usuario: { select: { nombre: true } }, // Incluye el nombre del usuario
        Categoria: true,
      },
    });
  }

  // Método para actualizar una causa
  async updateCausa(id, causaData) {
    return await prisma.causa.update({
      where: { id },
      data: causaData,
    });
  }

  // Método para eliminar una causa
  async deleteCausa(id) {
    return await prisma.causa.delete({
      where: { id },
    });
  }

  // Método para obtener el total de causas por día
  async getTotalCausasByDay() {
    return await prisma.causa.groupBy({
      by: ['fechaInicio'],
      _count: {
        id: true,
      },
    });
  }

  async getAllCausas() {
    return await prisma.causa.findMany({
      include: {
        Usuario: { select: { nombre: true } },
        Categoria: true,
      },
    });
  }



  // Método para obtener causas por usuario
  async getCausasByUserId(userId) {
    return await prisma.causa.findMany({
      where: { idUsuario: userId },
      include: {
        Categoria: true, // Incluye la categoría en cada causa
      },
    });
  }
}

module.exports = new CausaRepository();
