/* eslint-disable no-undef */
const express = require("express");
const supertest = require("supertest"); // Import supertest to simulate HTTP requests
const app = express();
app.use(express.json());

// Import the router with mutation routes
const router = require("../../routes/mutation");
app.use("/", router);

// Create a test server using supertest
const request = supertest(app);

// Mock mutationHandler and mutationStats functions
jest.mock("../../controllers/mutation", () => ({
	mutationHandler: jest.fn(),
	mutationStats: jest.fn(),
}));

// Import mutationHandler and mutationStats functions
const { mutationHandler, mutationStats } = require("../../controllers/mutation");

describe("Mutation Routes", () => {
	beforeEach(() => {
		// Clear mock function calls and reset any mock state before each test.
		jest.clearAllMocks();
	});

	it("should return 'It's a mutation' with status 200 for valid mutation data", async () => {
		// Mock mutationHandler to return true (mutation)
		mutationHandler.mockResolvedValue(true);

		const response = await request
			.post("/mutation/")
			.send({ dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"] });

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("It's a mutation");
	});

	it("should return 'It's not a mutation' with status 403 for valid non-mutation data", async () => {
		// Mock mutationHandler to return false (no mutation)
		mutationHandler.mockResolvedValue(false);

		const response = await request
			.post("/mutation/")
			.send({ dna: ["ATGCAA", "CAGTGC", "TTATGT", "AGATGG", "CGCCTA", "TCACTG"] });

		expect(response.status).toBe(403);
		expect(response.body.message).toBe("It's not a mutation");
	});

	it("should return statistics with status 200 for /stats route", async () => {
		// Mock mutationStats to return sample statistics
		mutationStats.mockResolvedValue({
			count_mutations: 10,
			count_no_mutation: 20,
			ratio: 0.5,
		});

		const response = await request.get("/stats");

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			count_mutations: 10,
			count_no_mutation: 20,
			ratio: 0.5,
		});
	});

	it("should handle errors and return status 500 for /mutation/ route", async () => {
		// Mock mutationHandler to throw an error
		mutationHandler.mockRejectedValue(new Error("Test error"));

		const response = await request.post("/mutation/").send({ dna: ["ATGCAA"] });

		expect(response.status).toBe(500);
		expect(response.body.message).toBe("Internal Server Error: Test error");
	});

	it("should handle errors and return status 500 for /stats route", async () => {
		// Mock mutationStats to throw an error
		mutationStats.mockRejectedValue(new Error("Test error"));

		const response = await request.get("/stats");

		expect(response.status).toBe(500);
		expect(response.body.message).toBe("Internal Server Error: Test error");
	});
});
