const express = require('express');
const router = express.Router();
const causaController = require('../controllers/causaController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); 

/**
 * @swagger
 * /causas:
 *   post:
 *     summary: Crea una nueva causa
 *     tags: [Causas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCausa:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               meta:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               tipoDonacion:
 *                 type: string
 *               idUsuario:
 *                 type: integer
 *               idCategoria:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Causa creada exitosamente
 */

router.post('/', verifyToken, upload.single('portada'), causaController.createCausa); // Permitir carga de un solo archivo 'portada'
router.get('/:id', causaController.getCausaById);
router.put('/:id', verifyToken, causaController.updateCausa);
router.delete('/:id', verifyToken, causaController.deleteCausa);
router.get('/totales/por-dia', causaController.getTotalCausasByDay);
router.get('/usuario/:userId', causaController.getCausasByUserId);


module.exports = router;
