// Import the 'express' module for creating and configuring the web server.
const express = require("express");

// Import the 'swagger-ui-express' module to enable Swagger API documentation.
const swaggerUi = require("swagger-ui-express");

// Import the routes defined in 'mutation.js'.
const routes = require("./routes/mutation");

// Import the Swagger specification defined in 'swaggerConfig.js'.
const swaggerSpec = require("./config/swaggerConfig");

// Import the 'connectToDatabase' function to establish the database connection.
const connectToDatabase = require("./config/databaseConfig");

// Import the 'dotenv' module to load environment variables from a .env file.
require("dotenv").config();

// Create an instance of the Express application.
const app = express();

// Define the port on which the server will run, taking the value from the PORT environment variable or 8080 if not defined.
const port = process.env.PORT || 8080;

// Import the 'path' module to work with file and directory paths.
const path = require("path");

// Middleware: Configure the server to parse JSON requests.
app.use(express.json());

// Middleware: Enable Swagger API documentation at the "/api-docs" route.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware: Allow access to coverage information at the "/coverage/" route.
app.use("/coverage/", express.static(path.join(__dirname, "../coverage")));

// Middleware: Associate routes defined in 'mutation.js' with the server.
app.use("/", routes);

// Establish the database connection using the 'connectToDatabase' function.
connectToDatabase();

// Start the server and listen on the specified port.
const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = {server, app}; // Exporta la aplicación Express