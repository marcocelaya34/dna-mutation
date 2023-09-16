// Import the addDNA and getDNA functions from the specified path.
const { addDNA, getDNA } = require("../services/dbService");

// Import the hasMutation function from the specified path.
const hasMutation = require("../services/mutationDetector");

// Function to handle DNA mutations.
const mutationHandler = async (dna) => {
	try {
		// Check for mutations using the hasMutation function.
		const isMutation = hasMutation(dna);

		// Add the DNA sequence and its mutation status to the database.
		await addDNA(dna, isMutation);

		// If it's a mutation, return true; otherwise, return false.
		if (isMutation) return true;
		return false;
	} catch (error) {
		// Handle any errors that occur during mutation handling and propagate the error.
		throw Error(error);
	}
};

// Function to retrieve mutation statistics.
const mutationStats = async () => {
	try {
		// Use Promise.all to fetch the counts of mutations and non-mutations simultaneously.
		const [count_mutations, count_no_mutation] = await Promise.all([
			getDNA(true),
			getDNA(false),
		]);

		// Calculate the ratio of mutations to non-mutations.
		const ratio = count_mutations / count_no_mutation;

		// Return the mutation statistics as an object.
		return {
			count_mutations,
			count_no_mutation,
			ratio,
		};
	} catch (error) {
		// Handle any errors that occur during statistics retrieval and propagate the error.
		throw Error(error);
	}
};

// Export the mutationHandler and mutationStats functions to make them available for use in other modules.
module.exports = { mutationHandler, mutationStats };
