const express = require('express');
const router = express.Router();
const donacionController = require('../controllers/donacionController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/**
 * @swagger
 * /api/donaciones:
 *   post:
 *     summary: Crea una nueva donación
 *     tags: [Donaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCausa:
 *                 type: integer
 *               tipoDonacion:
 *                 type: string
 *               monto:
 *                 type: number
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Donación creada exitosamente
 */

router.post('/', verifyToken, upload.single('img'), donacionController.createDonacion);

router.get('/causa/:idCausa', donacionController.getDonacionesByCausa);

router.get('/usuario', verifyToken, donacionController.getDonacionesByUsuario);

router.get('/estadisticas', donacionController.getAllDonaciones);

module.exports = router;
