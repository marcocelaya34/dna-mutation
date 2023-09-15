const DNA = require("../models/dna");

const addDNA = async (dna, mutation) => {
	try {
		const existingDNA = await DNA.findOne({ dna }).exec();
		if (!existingDNA) new DNA({ dna, mutation }).save();
	} catch (error) {
		throw Error(error);
	}
};

const getDNA = async (mutation) => {
	try {
		return await DNA.countDocuments({ mutation }).exec() || [];
	} catch (error) {
		throw Error(error);
	}

};

module.exports = { addDNA, getDNA };
