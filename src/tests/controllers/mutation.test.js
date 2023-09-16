/* eslint-disable no-undef */
// Import the required modules and functions
const { mutationHandler, mutationStats } = require("../../controllers/mutation");

// Mock the hasMutation function directly
const hasMutation = require("../../services/mutationDetector");
jest.mock("../../services/mutationDetector");


// Mock the dependencies (addDNA and getDNA) and hasMutation function
jest.mock("../../services/dbService", () => ({
	addDNA: jest.fn(),
	getDNA: jest.fn(),
}));

const { addDNA, getDNA } = require("../../services/dbService");


describe("mutationHandler", () => {
	it("should return true for mutation and addDNA to database", async () => {
		
		// Mock hasMutation to return true
		hasMutation.mockReturnValue(true);

		// Mock addDNA to resolve
		addDNA.mockResolvedValue();

		const result = await mutationHandler(["ATGCGA", "CAGTGC"]);
				
		// Expectation: mutationHandler should return true
		expect(result).toBe(true);

		// Expectation: hasMutation should be called with the provided DNA
		expect(hasMutation).toHaveBeenCalledWith(["ATGCGA", "CAGTGC"]);

		// Expectation: addDNA should be called with the provided DNA and true for mutation
		expect(addDNA).toHaveBeenCalledWith(["ATGCGA", "CAGTGC"], true); 
	});

	it("should return false for no mutation and addDNA to database", async () => {
		// Mock hasMutation to return false
		hasMutation.mockReturnValue(false);

		// Mock addDNA to resolve
		addDNA.mockResolvedValue();

		const result = await mutationHandler(["ATGCGA", "CAGTGC"]);

		// Expectation: mutationHandler should return false
		expect(result).toBe(false);

		// Expectation: hasMutation should be called with the provided DNA
		expect(hasMutation).toHaveBeenCalledWith(["ATGCGA", "CAGTGC"]);

		// Expectation: addDNA should be called with the provided DNA and false for no mutation
		expect(addDNA).toHaveBeenCalledWith(["ATGCGA", "CAGTGC"], false);
	});

	it("should propagate an error if hasMutation or addDNA fails", async () => {
		// Mock hasMutation to throw an error
		hasMutation.mockImplementation(() => {
			throw new Error("Test error");
		});

		// Mock addDNA to resolve
		addDNA.mockResolvedValue();

		// Expectation: mutationHandler should throw an error
		await expect(mutationHandler(["ATGCGA", "CAGTGC"])).rejects.toThrow(
			"Test error"
		);
	});
});

describe("mutationStats", () => {
	it("should return mutation statistics", async () => {
		// Mock getDNA to resolve with counts
		getDNA.mockResolvedValue(10); // 10 mutations

		const result = await mutationStats();

		// Expectation: mutationStats should return the correct statistics
		expect(result).toEqual({
			count_mutations: 10,
			count_no_mutation: 10, // Mocked to be the same as count_mutations
			ratio: 1, // Ratio is 10 / 10 = 1
		});

		// Expectation: getDNA should be called twice with true and false for mutation
		expect(getDNA).toHaveBeenCalledWith(true);
		expect(getDNA).toHaveBeenCalledWith(false);
	});

	it("should propagate an error if getDNA fails", async () => {
		// Mock getDNA to throw an error
		getDNA.mockImplementation(() => {
			throw new Error("Test error");
		});

		// Expectation: mutationStats should throw an error
		await expect(mutationStats()).rejects.toThrow("Test error");
	});
});
