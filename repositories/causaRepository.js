const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CausaRepository {

// En el repositorio de causa (causaRepository.js)
async getLastSixCausas() {
  return await prisma.causa.findMany({
    orderBy: { fechaInicio: 'desc' },
    take: 6,
    include: {
      Usuario: true,
      Categoria: true,
    },
  });
}

  
  async createCausa(causaData) {
    return await prisma.causa.create({
      data: causaData,
    });
  }
  


// causaRepository.js
async getCausaById(id) {
  return await prisma.causa.findUnique({
    where: { id: parseInt(id) }, // Asegúrate de convertir 'id' a entero si es necesario
    include: {
      Usuario: {
        select: { nombre: true } // Asegúrate de que 'nombre' es el campo correcto
      },
      Categoria: true
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
