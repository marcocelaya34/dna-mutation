const mongoose = require("mongoose");

// Define the schema for the 'DNA' collection in MongoDB.
const schema = new mongoose.Schema({
	dna: {
		type: [String], // Define the 'dna' field as an array of strings.
	},
	mutation: Boolean, // Define the 'mutation' field as a boolean.
});

// Create a MongoDB model for the 'DNA' collection based on the defined schema.
const DNA = mongoose.model("dna", schema);

// Export the 'DNA' model to make it available for use in other parts of the application.
module.exports = DNA;
