const categoriaRepository = require('../repositories/categoriaRepository');

class CategoriaService {
  async getCategorias() {
    return await categoriaRepository.getCategorias();
  }
}

module.exports = new CategoriaService();
