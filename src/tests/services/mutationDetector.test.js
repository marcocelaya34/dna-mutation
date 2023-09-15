/* eslint-disable no-undef */
const hasMutation = require("../../services/mutationDetector");

describe("hasMutation", () => {
	it("should return true for horizontal mutation", () => {
		const dna = [
			"ATGCGA",
			"CTGTGC",
			"TTATGT",
			"AGAATG",
			"CCCCCA",
			"TCACTG"
		];
		expect(hasMutation(dna)).toBe(true);
	});

	it("should return true for vertical mutation", () => {
		const dna = [
			"ATGCGA",
			"CAGTGC",
			"TTATGT",
			"AGATGG",
			"GCACTA",
			"GCACTG"
		];
		expect(hasMutation(dna)).toBe(true);
	});

	it("should return true for diagonal mutation (right)", () => {
		const dna = [
			"ATGCGA",
			"CAGTGC",
			"TTAGGT",
			"AGAAGG",
			"GCACTA",
			"TCACTG"
		];
		expect(hasMutation(dna)).toBe(true);
	});

	it("should return true for diagonal mutation (left)", () => {
		const dna = [
			"ATGCGA",
			"CAGTAC",
			"TTAAGT",
			"AGATTG",
			"GCACTA",
			"GCCCTG"
		];
		expect(hasMutation(dna)).toBe(true);
	});

	it("should return false for no mutation", () => {
		const dna = [
			"ATGCAA",
			"CAGTGC",
			"TTATGT",
			"AGATGG",
			"CGCCTA",
			"TCACTG"
		];
		expect(hasMutation(dna)).toBe(false);
	});
});
