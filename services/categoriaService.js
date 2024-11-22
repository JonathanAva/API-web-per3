const categoriaRepository = require('../repositories/categoriaRepository');

class CategoriaService {
  async getCategorias() {
    return await categoriaRepository.getCategorias();
  }

  async getCategoriasConCausas() {
    const categorias = await categoriaRepository.getCategoriasConCausasCount();

    // Formatear datos
    return categorias.map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      count: categoria._count.Causas,
    }));
  }

}




module.exports = new CategoriaService();
