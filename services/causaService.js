const causaRepository = require('../repositories/causaRepository');
const { CausaDTO } = require('../dto/causaDTO');

class CausaService {
  async createCausa(causaData) {
    const newCausa = await causaRepository.createCausa(causaData);
    return new CausaDTO(newCausa);
  }

  async getCausaById(id) {
    const causa = await causaRepository.getCausaById(id);
    if (!causa) throw new Error('Causa no encontrada');
    return new CausaDTO(causa);
  }
  

  async updateCausa(id, causaData) {
    const updatedCausa = await causaRepository.updateCausa(id, causaData);
    if (!updatedCausa) throw new Error('Causa no encontrada');
    return new CausaDTO(updatedCausa);
  }

  async deleteCausa(id) {
    const causa = await causaRepository.getCausaById(id);
    if (!causa) throw new Error('Causa no encontrada');
    await causaRepository.deleteCausa(id);
  }

  async getTotalCausasByDay() {
    const totalCausasByDay = await causaRepository.getTotalCausasByDay();
    return totalCausasByDay.map(day => ({
      fecha: day.fechaInicio,
      total: day._count.id,
    }));
  }

  async getCausasByUserId(userId) {
    const causas = await causaRepository.getCausasByUserId(userId);
    if (!causas || causas.length === 0)
      throw new Error('No se encontraron causas para el usuario');
    return causas.map(causa => new CausaDTO(causa));
  }

  async getLastSixCausas() {
    const causas = await causaRepository.getLastSixCausas();
    return causas.map(causa => new CausaDTO(causa));
  }
}

module.exports = new CausaService();
