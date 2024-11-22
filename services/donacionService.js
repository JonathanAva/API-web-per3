const donacionRepository = require('../repositories/donacionRepository');
const { DonacionDTO } = require('../dto/donacionDTO');

class DonacionService {
    async createDonacion(donacionData) {
        const donacion = await donacionRepository.createDonacion(donacionData);
        return new DonacionDTO(donacion);
      }

  async getDonacionesByCausa(idCausa) {
    const donaciones = await donacionRepository.getDonacionesByCausa(idCausa);
    return donaciones.map(donacion => new DonacionDTO(donacion));
  }

  async getDonacionesByUsuario(idUsuario) {
    const donaciones = await donacionRepository.getDonacionesByUsuario(idUsuario);
    return donaciones.map(donacion => new DonacionDTO(donacion));
  }

  async getAllDonaciones() {
    const donaciones = await donacionRepository.getAllDonaciones(); // Llamamos al repositorio
    return donaciones.map(donacion => new DonacionDTO(donacion)); // Transformamos en DTO
  }

  async getDonacionesHistorial(fecha = null) {
    const donaciones = await donacionRepository.getDonacionesHistorial(fecha);
    return donaciones.map(donacion => new DonacionDTO(donacion)); // Transformamos las donaciones a DTO
  }
}

module.exports = new DonacionService();
