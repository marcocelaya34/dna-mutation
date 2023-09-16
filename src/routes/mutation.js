const express = require("express");
const router = express.Router();

// Import mutationHandler and mutationStats functions from the specified path.
const { mutationHandler, mutationStats } = require("../controllers/mutation");

// Route for verifying mutation
router.post("/mutation/", async (req, res) => {
	try {
		const { dna } = req.body;

		// Call the mutationHandler function to check for mutations in the provided DNA sequence.
		const isMutation = await mutationHandler(dna);

		// Determine the response message and status code based on whether it's a mutation or not.
		const message = isMutation ? "It's a mutation" : "It's not a mutation";
		const statusCode = isMutation ? 200 : 403;

		// Send the response with the appropriate message and status code.
		res.status(statusCode).json({ message });
	} catch (error) {
		// Handle any errors that occur during mutation checking and respond with a 500 Internal Server Error.
		res.status(500).json({ message: `Internal Server ${error}` });
	}
});

// Route for obtaining statistics
router.get("/stats", async (req, res) => {
	try {
		// Call the mutationStats function to retrieve mutation statistics.
		const stats = await mutationStats();

		// Send the response with the retrieved statistics and a 200 OK status.
		res.status(200).json(stats);
	} catch (error) {
		// Handle any errors that occur during statistics retrieval and respond with a 500 Internal Server Error.
		res.status(500).json({ message: `Internal Server ${error}` });
	}
});

// Export the router to make these routes available for use in the application.
module.exports = router;
