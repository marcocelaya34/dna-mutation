const express = require('express');
const router = express.Router();

const hasMutation = require('../controllers/mutationDetector'); // Ajusta la ruta según la ubicación de mutationDetector.js


router.post('/mutation/', (req, res) => {
    const dna = req.body.dna;
  
    const isMutation = hasMutation(dna);
  
    if (isMutation) {
      res.status(200).json({ message: 'Es una mutación' });
    } else {
      res.status(403).json({ message: 'No es una mutación' });
    }
  });

// Exporta el enrutador
module.exports = router;
