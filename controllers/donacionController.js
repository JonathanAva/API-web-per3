const donacionService = require('../services/donacionService');

exports.createDonacion = async (req, res) => {
    try {
      const userId = req.userId; // Obtenemos el ID del usuario autenticado desde el token
      const { idCausa, tipoDonacion, monto, descripcion } = req.body;
      const img = req.file ? `/uploads/${req.file.filename}` : null; // Si hay archivo, guardamos la ruta
  
      // Validación del idCausa
      if (!idCausa || isNaN(parseInt(idCausa))) {
        return res.status(400).json({ error: 'El idCausa debe ser un número válido' });
      }
  
      // Validación dinámica basada en el tipo de donación
      if (!tipoDonacion) {
        return res.status(400).json({ error: 'El campo tipoDonacion es obligatorio' });
      }
  
      if (tipoDonacion === 'dinero' && !monto) {
        return res.status(400).json({ error: 'El campo monto es obligatorio para donaciones de dinero' });
      }
  
      if (['ropa', 'utensilios', 'servicio_social'].includes(tipoDonacion) && !descripcion) {
        return res.status(400).json({
          error: `El campo descripcion es obligatorio para donaciones de tipo ${tipoDonacion}`,
        });
      }
  
      const donacionData = {
        idUsuario: userId,
        idCausa: parseInt(idCausa),
        tipoDonacion,
        monto: monto ? parseFloat(monto) : null,
        descripcion,
        img,
      };
  
      console.log("Datos procesados para guardar:", donacionData);
  
      const donacion = await donacionService.createDonacion(donacionData);
      res.status(201).json(donacion);
    } catch (error) {
      console.error('Error al crear la donación:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
exports.getDonacionesByCausa = async (req, res) => {
  try {
    const { idCausa } = req.params;
    const donaciones = await donacionService.getDonacionesByCausa(idCausa);
    res.status(200).json(donaciones);
  } catch (error) {
    console.error('Error al obtener donaciones por causa:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDonacionesByUsuario = async (req, res) => {
  try {
    const userId = req.userId; // Obtenemos el ID del usuario autenticado desde el token
    const donaciones = await donacionService.getDonacionesByUsuario(userId);
    res.status(200).json(donaciones);
  } catch (error) {
    console.error('Error al obtener donaciones por usuario:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDonaciones = async (req, res) => {
  try {
    const donaciones = await donacionService.getAllDonaciones(); // Llamamos al servicio para obtener las donaciones
    res.status(200).json(donaciones); // Respondemos con las donaciones
  } catch (error) {
    console.error('Error al obtener todas las donaciones:', error);
    res.status(500).json({ error: 'Error al obtener todas las donaciones' });
  }
};

