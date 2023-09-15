const mongoose = require("mongoose");

const connectToDatabase = async () => {
	try {
		const dbURI = process.env.MONGO_URI;

		await mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Connected to MongoDB Atlas");

		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
		});

		mongoose.connection.on("disconnected", () => {
			console.log("Disconnected from MongoDB Atlas");
		});
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};

module.exports = connectToDatabase;
