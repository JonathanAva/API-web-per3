const categoriaService = require('../services/categoriaService');

exports.getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getCategorias();
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCategoriasConCausas = async (req, res) => {
  try {
    const categoriasConCausas = await categoriaService.getCategoriasConCausas();
    res.status(200).json(categoriasConCausas);
  } catch (error) {
    console.error('Error al obtener las estadísticas de categorías:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};