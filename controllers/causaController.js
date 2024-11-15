const causaService = require('../services/causaService');

exports.createCausa = async (req, res) => {
  try {
    const { nombreCausa, descripcion, meta, tipoDonacion, idCategoria, fechaInicio, fechaFin } = req.body;

    if (!nombreCausa || !descripcion || !meta || !tipoDonacion || !idCategoria || !fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const causaData = {
      nombreCausa,
      descripcion,
      meta,
      tipoDonacion,
      idCategoria: parseInt(idCategoria), // Asegúrate de que sea un entero
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
      idUsuario: req.userId, // ID del usuario del token
      portada: req.file ? `/uploads/${req.file.filename}` : null,
    };

    if (isNaN(causaData.idCategoria)) {
      return res.status(400).json({ error: 'Categoría inválida' });
    }

    if (isNaN(causaData.fechaInicio.getTime()) || isNaN(causaData.fechaFin.getTime())) {
      return res.status(400).json({ error: 'Fechas inválidas' });
    }

    const newCausa = await causaService.createCausa(causaData);
    return res.status(201).json(newCausa);
  } catch (error) {
    console.error('Error al crear la causa:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getLastSixCausas = async (req, res) => {
  try {
    const causas = await causaService.getLastSixCausas();
    return res.status(200).json(causas);
  } catch (error) {
    console.error('Error al obtener las últimas 6 causas:', error);
    return res.status(500).json({ error: error.message });
  }
};

// causaController.js
exports.getCausasByCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; // Obtiene el ID del usuario del token
    const causas = await causaService.getCausasByUserId(userId);
    if (!causas || causas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron causas para este usuario' });
    }
    return res.status(200).json(causas);
  } catch (error) {
    console.error('Error al obtener las causas del usuario:', error);
    return res.status(500).json({ error: error.message });
  }
};


exports.getAllCausas = async (req, res) => {
  try {
    const causas = await causaService.getAllCausas();
    return res.status(200).json(causas);
  } catch (error) {
    console.error('Error al obtener todas las causas:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getCausaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10); // Asegúrate de convertir el id a entero
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const causa = await causaService.getCausaById(id);
    if (!causa) {
      return res.status(404).json({ error: 'Causa no encontrada' });
    }
    return res.status(200).json(causa);
  } catch (error) {
    console.error('Error al obtener la causa:', error);
    return res.status(500).json({ error: error.message });
  }
};


exports.updateCausa = async (req, res) => {
  try {
    const causaData = {
      ...req.body,
      fechaInicio: req.body.fechaInicio ? new Date(req.body.fechaInicio) : undefined,
      fechaFin: req.body.fechaFin ? new Date(req.body.fechaFin) : undefined,
      idCategoria: req.body.idCategoria ? parseInt(req.body.idCategoria) : undefined,
      portada: req.file ? `/uploads/${req.file.filename}` : undefined // Actualizar la ruta de la portada si existe un nuevo archivo
    };

    const updatedCausa = await causaService.updateCausa(req.params.id, causaData);
    if (!updatedCausa) {
      return res.status(404).json({ error: 'Causa no encontrada' });
    }
    return res.status(200).json(updatedCausa);
  } catch (error) {
    console.error('Error al actualizar la causa:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteCausa = async (req, res) => {
  try {
    const deleted = await causaService.deleteCausa(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Causa no encontrada' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la causa:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getTotalCausasByDay = async (req, res) => {
  try {
    const totalCausasByDay = await causaService.getTotalCausasByDay();
    return res.status(200).json(totalCausasByDay);
  } catch (error) {
    console.error('Error al obtener el total de causas por día:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getCausasByUserId = async (req, res) => {
  try {
    const causas = await causaService.getCausasByUserId(req.params.userId);
    if (!causas || causas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron causas para este usuario' });
    }
    return res.status(200).json(causas);
  } catch (error) {
    console.error('Error al obtener las causas por usuario:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getCausasByCategoriaNombre = async (req, res) => {
  try {
    const nombreCategoria = req.params.nombre;
    const causas = await causaService.getCausasByCategoriaNombre(nombreCategoria);
    if (!causas || causas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron causas para esta categoría' });
    }
    return res.status(200).json(causas);
  } catch (error) {
    console.error('Error al obtener causas por categoría:', error);
    return res.status(500).json({ error: error.message });
  }
};

