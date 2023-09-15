const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	dna: {
		type: [String],
	},
	mutation: Boolean,
});

const DNA = mongoose.model("dna", schema);

module.exports = DNA;
