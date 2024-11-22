const causaRepository = require('../repositories/causaRepository');
const { CausaDTO } = require('../dto/causaDTO');

class CausaService {
  async createCausa(causaData) {
    const newCausa = await causaRepository.createCausa(causaData);
    return new CausaDTO(newCausa);
  }

  async getAllCausas() {
    const causas = await causaRepository.getAllCausas();
    return causas.map((causa) => ({
      id: causa.id,
      nombreCausa: causa.nombreCausa,
      descripcion: causa.descripcion,
      meta: parseFloat(causa.meta), // Asegurarse que meta sea un número
      recaudado: parseFloat(causa.recaudado || 0), // Agregar total recaudado
      portada: causa.portada,
    }));
  }

  
  async getCausaById(id) {
    const causa = await causaRepository.getCausaById(id);
    if (!causa) throw new Error('Causa no encontrada');

    // Calcular el total recaudado
    const totalRecaudado = causa.Donaciones.reduce((sum, donacion) => sum + (donacion.monto || 0), 0);

    return {
      ...new CausaDTO(causa),
      recaudado: totalRecaudado,
    };
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

    return causas.map((causa) => {
      const totalRecaudado = causa.Donaciones.reduce((sum, donacion) => sum + (donacion.monto || 0), 0);
      return {
        ...new CausaDTO(causa),
        recaudado: totalRecaudado,
      };
    });
  }
  async getCausasByCategoriaNombre(nombreCategoria) {
  return await causaRepository.getCausasByCategoriaNombre(nombreCategoria);
}

}

module.exports = new CausaService();
