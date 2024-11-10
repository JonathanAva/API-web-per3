const express = require('express');
const cors = require('cors'); // Importa CORS
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
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
  }
}));

app.set('view engine', 'ejs');

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

app.use('/api/users', userRoutes);
app.use('/api/causas', causaRoutes);
app.use('/api/categorias', categoriaRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
