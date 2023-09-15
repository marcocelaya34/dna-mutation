/* eslint-disable no-undef */
const mongoose = require("mongoose");
const { addDNA, getDNA } = require("../../services/dbService");
const DNA = require("../../models/dna");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// Configuración inicial antes de las pruebas
beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();

	// Conectar a la base de datos temporal de prueba
	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}, 10000);

// Cierre de la conexión después de las pruebas
afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe("addDNA", () => {
	it("should add new DNA record to the database if it does not exist", async () => {
		// Configura una función espía para DNA.prototype.save
		const saveSpy = jest.spyOn(DNA.prototype, "save");

		// Call the addDNA function with test data
		await addDNA("AAATTT", true);

		// Verifica que DNA.prototype.save se haya llamado
		expect(saveSpy).toHaveBeenCalled();

		// Limpia la función espía después de la prueba
		saveSpy.mockRestore();
	});

	it("shouldn't add new DNA record to the database if it does exist", async () => {
		const dna = "ATCGAA";
		const mutation = true;

		// Agregar un registro inicial
		await addDNA(dna, mutation);

		// Intentar agregar el mismo registro nuevamente
		await addDNA(dna, mutation);

		// Usar await para esperar a que se complete la operación en la base de datos
		await mongoose.connection.collection("dnas").findOne({ dna }); // Obtener el registro

		// Verifica que no se haya agregado un nuevo registro
		const count = await mongoose.connection
			.collection("dnas")
			.countDocuments({ dna });
		expect(count).toBe(1); // Debería seguir siendo 1
	});

	it("should throw an error if DNA.findOne throws an error", async () => {
		// Mockear DNA.findOne para que lance una excepción
		DNA.findOne = jest.fn(() => {
			throw new Error("Simulated error");
		});

		try {
			await addDNA("AAATTT", true);
		} catch (error) {
			// Verificar que se haya lanzado una excepción y que su mensaje sea el esperado
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Error: Simulated error");
		}
	});
});

describe("getDNA", () => {
	it("should return the correct count of DNA records with mutation", async () => {
		// Valor simulado que deseas que retorne countDocuments().exec()
		const countResult = 2;

		// Crear un espía para la función exec() de countDocuments
		const execSpy = jest
			.spyOn(mongoose.Query.prototype, "exec")
			.mockResolvedValue(countResult);

		// Crear un espía para la función countDocuments()
		const countDocumentsSpy = jest
			.spyOn(DNA, "countDocuments")
			.mockReturnValue({
				exec: execSpy,
			});

		// Llamar a la función que deseas probar
		const count = await getDNA(true);

		// Verificar que la función countDocuments() se llamó con los argumentos correctos
		expect(countDocumentsSpy).toHaveBeenCalledWith({ mutation: true });

		// Verificar que la función exec() se llamó
		expect(execSpy).toHaveBeenCalled();

		// Verificar que el resultado es el esperado
		expect(count).toBe(countResult);

		// Restaurar las funciones originales después de la prueba
		countDocumentsSpy.mockRestore();
		execSpy.mockRestore();
	});

	it("should return the correct count of DNA records without mutation", async () => {
		// Valor simulado que deseas que retorne countDocuments().exec()
		const countResult = 1;

		// Crear un espía para la función exec() de countDocuments
		const execSpy = jest
			.spyOn(mongoose.Query.prototype, "exec")
			.mockResolvedValue(countResult);

		// Crear un espía para la función countDocuments()
		const countDocumentsSpy = jest
			.spyOn(DNA, "countDocuments")
			.mockReturnValue({
				exec: execSpy,
			});

		// Llamar a la función que deseas probar
		const count = await getDNA(false);

		// Verificar que la función countDocuments() se llamó con los argumentos correctos
		expect(countDocumentsSpy).toHaveBeenCalledWith({ mutation: false });

		// Verificar que la función exec() se llamó
		expect(execSpy).toHaveBeenCalled();

		// Verificar que el resultado es el esperado
		expect(count).toBe(countResult);

		// Restaurar las funciones originales después de la prueba
		countDocumentsSpy.mockRestore();
		execSpy.mockRestore();
	});

	it("should throw an error if DNA.countDocuments throws an error", async () => {
		// Mockear DNA.countDocuments para que lance una excepción
		DNA.countDocuments = jest.fn(() => {
			throw new Error("Simulated error");
		});

		try {
			await getDNA(true);
		} catch (error) {
			// Verificar que se haya lanzado una excepción y que su mensaje sea el esperado
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Error: Simulated error");
		}
	});


});
