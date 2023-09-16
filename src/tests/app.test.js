/* eslint-disable no-undef */
const supertest = require("supertest");
const { server, app } = require("../app");
const mongoose = require("mongoose");
const connectToDatabase = require("../config/databaseConfig");

let request; // Declare the 'request' variable here to make it available throughout the scope.

// Describe a set of tests related to the Express server configuration.
describe("Express Server Configuration", () => {
  
	// Before all tests, set up some initial conditions.
	beforeAll(async () => {
		jest.spyOn(console, "error").mockImplementation(() => {});
    
		// Create the 'supertest' instance after the server is up and running.
		request = supertest(app);
    
		// Set the timeout for asynchronous tests to 10 seconds.
		jest.setTimeout(10000);
	});

	// After all tests, clean up and close resources.
	afterAll(async () => {
		// Close the database connection before shutting down the server.
		await mongoose.connection.close();
    
		// Restore the original console.error function.
		console.error.mockRestore();
    
		// Close the Express server.
		server.close();
	});

	// After each test, reset the mock state for console.error.
	afterEach(() => {
		console.error.mockClear();
	});

	// Test case: Check if routes are correctly associated with the server.
	it("should correctly associate routes with the server", async () => {
		const response = await request.get("/stats");
    
		// Expect the HTTP response status to be 200 (OK).
		expect(response.status).toBe(200);
	});

	// Test case: Check if Swagger documentation is served correctly.
	it("should correctly serve the Swagger documentation", async () => {
		const response = await request.get("/api-docs/"); // Access Swagger documentation route.
    
		// Expect the HTTP response status to be 200 (OK).
		expect(response.status).toBe(200);
	});

	// Test case: Simulate a MongoDB connection error and check if it's properly handled.
	it("should handle database connection error", async () => {
		const fakeError = new Error("Simulated MongoDB connection error");
    
		// Emit a "fake" MongoDB connection error.
		mongoose.connection.emit("error", fakeError);
    
		// Expect console.error to have been called with the specific error message.
		expect(console.error).toHaveBeenCalledWith("MongoDB connection error:", fakeError);
	});
});

// Describe another set of tests related to database connection handling.
describe("Database Connection Handling", () => {
  
	// Test case: Simulate a database connection error during the connection setup.
	it("should handle database connection error", async () => {
		// Simulate a database connection that always throws an error.
		const mockConnect = jest.fn(() => {
			throw new Error("Database connection error");
		});

		// Replace the implementation of mongoose.connect with the mockConnect function.
		mongoose.connect = mockConnect;

		try {
			// Call the database connection function and expect it to throw an error.
			await connectToDatabase();
		} catch (error) {
			// Verify that the error message matches the expected one.
			expect(error.message).toBe("Database connection error");
		}
	});
});
