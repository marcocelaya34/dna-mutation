/**
 * @swagger
 * tags:
 *   name: Mutación de ADN
 *   description: Operaciones relacionadas con la mutación de ADN
 * /mutation/:
 *   post:
 *     summary: Verificar mutación de ADN
 *     tags: [Mutación de ADN]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dna:
 *                 type: array
 *                 description: Secuencia de ADN a verificar
 *                 example: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
 *     responses:
 *       200:
 *         description: Mutación detectada
 *         content:
 *           application/json:
 *             example:
 *               message: Es una mutación
 *       403:
 *         description: Mutación no detectada
 *         content:
 *           application/json:
 *             example:
 *               message: No es una mutación
 */