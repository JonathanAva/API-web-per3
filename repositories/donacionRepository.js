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

  async getAllDonaciones() {
    return await prisma.donacion.findMany({
      include: {
        Usuario: { select: { nombre: true } }, // Incluir datos del usuario
        Causa: { select: { nombreCausa: true } }, // Incluir datos de la causa
      },
    });
  }

  async getDonacionesHistorial(fecha = null) {
    const whereClause = fecha
      ? { fechaDonacion: { gte: new Date(fecha), lt: new Date(new Date(fecha).setDate(new Date(fecha).getDate() + 1)) } }
      : {};

    return await prisma.donacion.findMany({
      where: whereClause,
      include: {
        Usuario: { select: { nombre: true } }, // Incluye el nombre del usuario
        Causa: { select: { nombreCausa: true } }, // Incluye el nombre de la causa
      },
    });
  }
}

module.exports = new DonacionRepository();
