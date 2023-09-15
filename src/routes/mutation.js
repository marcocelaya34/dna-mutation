const express = require("express");
const router = express.Router();
const { mutationHandler, mutationStats } = require("../controllers/mutation");

// Ruta para verificar mutación
router.post("/mutation/", async (req, res) => {
	try {
		const { dna } = req.body;
		const isMutation = await mutationHandler(dna);

		const message = isMutation ? "It's a mutation" : "It's not a mutation";
		const statusCode = isMutation ? 200 : 403;

		res.status(statusCode).json({ message });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Ruta para obtener estadísticas
router.get("/stats", async (req, res) => {
	try {
		const stats = await mutationStats();
		res.status(200).json(stats);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
