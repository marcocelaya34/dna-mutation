function hasMutation(dna) {
    const n = dna.length;
  
    function checkSequenceInDirection(row, col, dx, dy) {
      const base = dna[row][col];
      let count = 1;
  
      // Verificar en la dirección especificada
      for (let i = 1; i < 4; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;
  
        if (
          newRow >= 0 &&
          newRow < n &&
          newCol >= 0 &&
          newCol < n &&
          dna[newRow][newCol] === base
        ) {
          count++;
        } else {
          break; // La secuencia se rompe, detener la verificación
        }
      }
  
      return count === 4;
    }
  
    // Verificar mutación en todas las direcciones: horizontal, vertical y diagonal
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (checkSequenceInDirection(row, col, 0, 1)) return true; // Horizontal
        if (checkSequenceInDirection(row, col, 1, 0)) return true; // Vertical
        if (checkSequenceInDirection(row, col, 1, 1)) return true; // Diagonal derecha
        if (checkSequenceInDirection(row, col, 1, -1)) return true; // Diagonal izquierda
      }
    }
  
    return false; // No se encontró mutación
  }
  
  module.exports = hasMutation