const express = require("express");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes/mutation");
const swaggerSpec = require("./config/swaggerConfig");
const connectToDatabase = require("./config/databaseConfig");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", routes);

// Database connection
connectToDatabase();

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
