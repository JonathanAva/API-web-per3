const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const donacionRoutes = require('./routes/donacionRoutes');
const userRoutes = require('./routes/userRoutes');
const causaRoutes = require('./routes/causaRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Configura CORS para permitir múltiples orígenes
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));

app.set('view engine', 'ejs');

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Donaciones',
      version: '1.0.0',
      description: 'API para gestión de donaciones con verificación de correo',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de recursos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas principales de la API
app.use('/api/users', userRoutes);
app.use('/api/causas', causaRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/donaciones', donacionRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
