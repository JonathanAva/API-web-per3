const causaService = require('../services/causaService');

exports.createCausa = async (req, res) => {
  try {
    const causaData = {
      ...req.body,
      idUsuario: req.userId,  
    };
    const newCausa = await causaService.createCausa(causaData);
    return res.status(201).json(newCausa);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCausaById = async (req, res) => {
  try {
    const causa = await causaService.getCausaById(req.params.id);
    return res.status(200).json(causa);
  } catch (error) {
    return res.status(404).json({ error: 'Causa no encontrada' });
  }
};

exports.updateCausa = async (req, res) => {
  try {
    const updatedCausa = await causaService.updateCausa(req.params.id, req.body);
    return res.status(200).json(updatedCausa);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteCausa = async (req, res) => {
  try {
    await causaService.deleteCausa(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getTotalCausasByDay = async (req, res) => {
  try {
    const totalCausasByDay = await causaService.getTotalCausasByDay();
    return res.status(200).json(totalCausasByDay);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCausasByUserId = async (req, res) => {
  try {
    const causas = await causaService.getCausasByUserId(req.params.userId);
    return res.status(200).json(causas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
