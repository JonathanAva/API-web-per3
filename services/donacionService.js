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
}

module.exports = new DonacionService();
