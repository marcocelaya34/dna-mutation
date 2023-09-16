/* eslint-disable no-undef */

// Import the 'hasMutation' function from the specified path.
const hasMutation = require("../../services/mutationDetector");

// Test suite for the 'hasMutation' function
describe("hasMutation", () => {
	it("should return true for horizontal mutation", () => {
		// Define a DNA sequence with a horizontal mutation
		const dna = [
			"ATGCGA",
			"CTGTGC",
			"TTATGT",
			"AGAATG",
			"CCCCCA",
			"TCACTG",
		];

		// Verify that 'hasMutation' returns true for this DNA sequence
		expect(hasMutation(dna)).toBe(true);
	});

	it("should return true for vertical mutation", () => {
		// Define a DNA sequence with a vertical mutation
		const dna = [
			"ATGCGA",
			"CAGTGC",
			"TTATGT",
			"AGATGG",
			"GCACTA",
			"GCACTG",
		];

		// Verify that 'hasMutation' returns true for this DNA sequence
		expect(hasMutation(dna)).toBe(true);
	});

	it("should return true for diagonal mutation (right)", () => {
		// Define a DNA sequence with a diagonal mutation (right)
		const dna = [
			"ATGCGA",
			"CAGTGC",
			"TTAGGT",
			"AGAAGG",
			"GCACTA",
			"TCACTG",
		];

		// Verify that 'hasMutation' returns true for this DNA sequence
		expect(hasMutation(dna)).toBe(true);
	});

	it("should return true for diagonal mutation (left)", () => {
		// Define a DNA sequence with a diagonal mutation (left)
		const dna = [
			"ATGCGA",
			"CAGTAC",
			"TTAAGT",
			"AGATTG",
			"GCACTA",
			"GCCCTG",
		];

		// Verify that 'hasMutation' returns true for this DNA sequence
		expect(hasMutation(dna)).toBe(true);
	});

	it("should return false for no mutation", () => {
		// Define a DNA sequence with no mutation
		const dna = [
			"ATGCAA",
			"CAGTGC",
			"TTATGT",
			"AGATGG",
			"CGCCTA",
			"TCACTG",
		];

		// Verify that 'hasMutation' returns false for this DNA sequence
		expect(hasMutation(dna)).toBe(false);
	});
});
