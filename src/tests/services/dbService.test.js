/* eslint-disable no-undef */

// Import required modules and functions.
const mongoose = require("mongoose");
const { addDNA, getDNA } = require("../../services/dbService");
const DNA = require("../../models/dna");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// Initial configuration before tests
beforeAll(async () => {
	// Create an instance of an in-memory MongoDB server.
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();

	// Connect to the temporary test database.
	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}, 10000);

// Close the connection after tests
afterAll(async () => {
	await mongoose.disconnect(); // Disconnect from the in-memory MongoDB server.
	await mongoServer.stop(); // Stop the in-memory MongoDB server.
});

// Test suite for the 'addDNA' function
describe("addDNA", () => {
	it("should add a new DNA record to the database if it does not exist", async () => {
		// Configure a spy for DNA.prototype.save
		const saveSpy = jest.spyOn(DNA.prototype, "save");

		// Call the 'addDNA' function with test data
		await addDNA("AAATTT", true);

		// Verify that DNA.prototype.save was called
		expect(saveSpy).toHaveBeenCalled();

		// Clean up the spy after the test
		saveSpy.mockRestore();
	});

	it("shouldn't add a new DNA record to the database if it does exist", async () => {
		const dna = "ATCGAA";
		const mutation = true;

		// Add an initial record
		await addDNA(dna, mutation);

		// Attempt to add the same record again
		await addDNA(dna, mutation);

		// Use 'await' to wait for the database operation to complete
		await mongoose.connection.collection("dnas").findOne({ dna }); // Retrieve the record

		// Verify that a new record was not added
		const count = await mongoose.connection
			.collection("dnas")
			.countDocuments({ dna });
		expect(count).toBe(1); // It should still be 1
	});

	it("should throw an error if DNA.findOne throws an error", async () => {
		// Mock DNA.findOne to throw an exception
		DNA.findOne = jest.fn(() => {
			throw new Error("Simulated error");
		});

		try {
			await addDNA("AAATTT", true);
		} catch (error) {
			// Verify that an exception was thrown and its message matches the expected error message
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Error: Simulated error");
		}
	});
});

// Test suite for the 'getDNA' function
describe("getDNA", () => {
	it("should return the correct count of DNA records with mutation", async () => {
		// Simulated value to be returned by countDocuments().exec()
		const countResult = 2;

		// Create a spy for the 'exec()' function of countDocuments
		const execSpy = jest
			.spyOn(mongoose.Query.prototype, "exec")
			.mockResolvedValue(countResult);

		// Create a spy for the countDocuments() function
		const countDocumentsSpy = jest
			.spyOn(DNA, "countDocuments")
			.mockReturnValue({
				exec: execSpy,
			});

		// Call the function you want to test
		const count = await getDNA(true);

		// Verify that countDocuments() was called with the correct arguments
		expect(countDocumentsSpy).toHaveBeenCalledWith({ mutation: true });

		// Verify that 'exec()' was called
		expect(execSpy).toHaveBeenCalled();

		// Verify that the result matches the expected count
		expect(count).toBe(countResult);

		// Restore the original functions after the test
		countDocumentsSpy.mockRestore();
		execSpy.mockRestore();
	});

	it("should return the correct count of DNA records without mutation", async () => {
		// Simulated value to be returned by countDocuments().exec()
		const countResult = 1;

		// Create a spy for the 'exec()' function of countDocuments
		const execSpy = jest
			.spyOn(mongoose.Query.prototype, "exec")
			.mockResolvedValue(countResult);

		// Create a spy for the countDocuments() function
		const countDocumentsSpy = jest
			.spyOn(DNA, "countDocuments")
			.mockReturnValue({
				exec: execSpy,
			});

		// Call the function you want to test
		const count = await getDNA(false);

		// Verify that countDocuments() was called with the correct arguments
		expect(countDocumentsSpy).toHaveBeenCalledWith({ mutation: false });

		// Verify that 'exec()' was called
		expect(execSpy).toHaveBeenCalled();

		// Verify that the result matches the expected count
		expect(count).toBe(countResult);

		// Restore the original functions after the test
		countDocumentsSpy.mockRestore();
		execSpy.mockRestore();
	});

	it("should throw an error if DNA.countDocuments throws an error", async () => {
		// Mock DNA.countDocuments to throw an exception
		DNA.countDocuments = jest.fn(() => {
			throw new Error("Simulated error");
		});

		try {
			await getDNA(true);
		} catch (error) {
			// Verify that an exception was thrown and its message matches the expected error message
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Error: Simulated error");
		}
	});
});
