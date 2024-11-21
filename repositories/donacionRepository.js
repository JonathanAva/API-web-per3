const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class DonacionRepository {
    async createDonacion(donacionData) {
        try {
          console.log("Repositorio: datos recibidos para insertar:", donacionData);
          return await prisma.donacion.create({
            data: {
              idUsuario: donacionData.idUsuario,
              idCausa: donacionData.idCausa,
              tipoDonacion: donacionData.tipoDonacion,
              monto: donacionData.monto,
              descripcion: donacionData.descripcion,
              img: donacionData.img,
            },
          });
        } catch (error) {
          console.error("Error en el repositorio al insertar la donación:", error);
          throw error;
        }
      }

  async getDonacionesByCausa(idCausa) {
    return await prisma.donacion.findMany({
      where: { idCausa: parseInt(idCausa) },
      include: {
        Usuario: { select: { nombre: true } },
        Causa: { select: { nombreCausa: true } },
      },
    });
  }

  async getDonacionesByUsuario(idUsuario) {
    return await prisma.donacion.findMany({
      where: { idUsuario: parseInt(idUsuario) },
      include: {
        Causa: { select: { nombreCausa: true } },
      },
    });
  }
}

module.exports = new DonacionRepository();
