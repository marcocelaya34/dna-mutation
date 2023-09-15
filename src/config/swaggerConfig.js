// swaggerConfig.js
const swaggerJsdoc = require("swagger-jsdoc");

module.exports = swaggerJsdoc({
	definition: {
		openapi: "3.0.0",
		info: {
			title: "DNA Mutation API",
			version: "1.0.0",
			description: "An API for verifying DNA mutations",
		},
		servers: [
			{
				url: "https://dna-mutation-399019.uc.r.appspot.com",
			},
		],
	},
	apis: ["./src/docs/*.js"],
});
