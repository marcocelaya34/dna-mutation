const express = require('express');
const app = express();
const port = 3000; 

const swaggerUi = require('swagger-ui-express');

const routes = require('./routes/mutation'); 

const swaggerSpec = require('./docs/swaggerConfig'); // Ajusta la ruta según tu estructura


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use('/', routes);


app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
