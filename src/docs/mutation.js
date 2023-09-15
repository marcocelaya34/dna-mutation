/**
 * @swagger
 * tags:
 *   name: DNA Mutation
 *   description: Operations related to DNA mutation
 * /mutation/:
 *   post:
 *     summary: Verify DNA Mutation
 *     tags: [DNA Mutation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dna:
 *                 type: array
 *                 description: DNA sequence to be verified
 *                 example: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
 *     responses:
 *       200:
 *         description: Mutation detected
 *         content:
 *           application/json:
 *             example:
 *               message: It's a mutation
 *       403:
 *         description: Mutation not detected
 *         content:
 *           application/json:
 *             example:
 *               message: It's not a mutation
 * /stats:
 *   get:
 *     summary: Get DNA Mutation Stats
 *     tags: [DNA Mutation]
 *     responses:
 *       200:
 *         description: Mutation Stats
 *         content:
 *           application/json:
 *             example:
 *               count_mutations: 40
 *               count_no_mutation: 100
 *               ratio: 0.4
 */
