const mongoose = require("mongoose");

// Function to connect to the MongoDB database.
const connectToDatabase = async () => {
	try {
		const dbURI = process.env.MONGO_URI; // Get the MongoDB URI from environment variables.

		// Connect to MongoDB using Mongoose with specified options.
		await mongoose.connect(dbURI, {
			useNewUrlParser: true, // Use the new URL parser.
			useUnifiedTopology: true, // Use the new server discovery and monitoring engine.
		});

		console.log("Connected to MongoDB Atlas"); // Log a successful connection message.

		// Handle MongoDB connection errors.
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
		});

		// Handle MongoDB disconnection.
		mongoose.connection.on("disconnected", () => {
			console.log("Disconnected from MongoDB Atlas");
		});
	} catch (error) {
		// Handle any errors that occur during the database connection process.
		console.error("Error connecting to MongoDB:", error);
	}
};

// Export the 'connectToDatabase' function to make it available for use in other parts of the application.
module.exports = connectToDatabase;
