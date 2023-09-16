// Import the 'swagger-jsdoc' module to generate Swagger documentation.
const swaggerJsdoc = require("swagger-jsdoc");

// Export a Swagger specification using 'swagger-jsdoc'.
const swaggerSpec = swaggerJsdoc({
	definition: {
		openapi: "3.0.0", // Specify the OpenAPI version.
		info: {
			title: "DNA Mutation API", // Provide a title for the API.
			version: "1.0.0", // Specify the API version.
			description: "An API for verifying DNA mutations", // Describe the API's purpose.
		},
		servers: [
			{
				url: "https://dna-mutation-399019.uc.r.appspot.com", // Define the server URL.
			},
		],
	},
	// Specify the path to the files that contain API documentation annotations.
	apis: ["./src/docs/*.js"],
});

module.exports = swaggerSpec;