const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
  async createUser(userData) {
    return await prisma.usuario.create({
      data: userData,
    });
  }

  async getUserByEmail(email) {
    return await prisma.usuario.findUnique({
      where: { email },
      include: { Rol: true }, 
    });
  }

  async updateUserVerification(userId) {
    return await prisma.usuario.update({
      where: { id: userId },
      data: { verificado: true, tokenVerificacion: null }, 
    });
  }
  
}

module.exports = new UserRepository();
