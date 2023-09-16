// Import the 'DNA' model from the specified path.
const DNA = require("../models/dna");

// Function to add a DNA sequence and its mutation status to the database.
const addDNA = async (dna, mutation) => {
	try {
		// Check if a DNA sequence with the same content already exists in the database.
		const existingDNA = await DNA.findOne({ dna }).exec();

		// If no existing DNA sequence is found, create and save a new DNA document.
		if (!existingDNA) new DNA({ dna, mutation }).save();
	} catch (error) {
		// Handle any errors that occur during database interaction and propagate the error.
		throw Error(error);
	}
};

// Function to get the count of DNA sequences with a specific mutation status from the database.
const getDNA = async (mutation) => {
	try {
		// Count the number of DNA documents in the database that match the specified mutation status.
		return await DNA.countDocuments({ mutation }).exec();
	} catch (error) {
		// Handle any errors that occur during database interaction and propagate the error.
		throw Error(error);
	}
};

// Export the 'addDNA' and 'getDNA' functions to make them available for use in other modules.
module.exports = { addDNA, getDNA };
