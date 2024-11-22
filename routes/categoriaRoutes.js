const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */
router.get('/', categoriaController.getCategorias);
router.get('/estadisticas', categoriaController.getCategoriasConCausas);

module.exports = router;
