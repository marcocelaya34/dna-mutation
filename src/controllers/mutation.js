const { addDNA, getDNA } = require("../services/dbService");
const hasMutation = require("../services/mutationDetector");

const mutationHandler = async (dna) => {
	try {
		const isMutation = hasMutation(dna);

		await addDNA(dna, isMutation);

		if (isMutation) return true;

		return false;

	} catch (error) {
		throw Error(error);
	}

};

const mutationStats = async () => {
	try {
		const [count_mutations, count_no_mutation] = await Promise.all([
			getDNA(true),
			getDNA(false),
		]);

		const ratio = count_mutations / count_no_mutation;

		return {
			count_mutations,
			count_no_mutation,
			ratio,
		};
	} catch (error) {
		throw Error(error);
	}
};


module.exports = { mutationHandler, mutationStats };
