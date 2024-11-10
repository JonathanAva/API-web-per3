const categoriaService = require('../services/categoriaService');

exports.getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getCategorias();
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
