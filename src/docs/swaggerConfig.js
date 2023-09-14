// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Mutación de ADN',
      version: '1.0.0',
      description: 'Una API para verificar mutaciones de ADN',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/docs/*.js'], // Rutas a tus archivos de rutas dentro de la carpeta src
};

const specs = swaggerJsdoc(options);

module.exports = specs;
