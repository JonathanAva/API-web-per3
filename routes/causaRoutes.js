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
 *         multipart/form-data:
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
 *               idCategoria:
 *                 type: integer
 *               portada:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Causa creada exitosamente
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', verifyToken, upload.single('portada'), causaController.createCausa);
router.get('/ultimas', causaController.getLastSixCausas);
router.get('/', causaController.getAllCausas);
router.get('/mis-causas', verifyToken, causaController.getCausasByCurrentUser);
router.get('/:id', causaController.getCausaById);
router.put('/:id', verifyToken, causaController.updateCausa);
router.delete('/:id', verifyToken, causaController.deleteCausa);
router.get('/totales/por-dia', causaController.getTotalCausasByDay);
router.get('/usuario/:userId', causaController.getCausasByUserId);

router.get('/categoria/:nombre', causaController.getCausasByCategoriaNombre);


module.exports = router;
