// Function to check if a DNA sequence has mutations.
const hasMutation = (dna) => {
	const n = dna.length; // Get the length of the DNA sequence.

	// Function to check for a sequence in a specific direction (horizontal, vertical, or diagonal).
	function checkSequenceInDirection(row, col, dx, dy) {
		const base = dna[row][col]; // Get the base at the current position.
		let count = 1; // Initialize a count to track the length of the sequence.

		// Iterate through the next 3 positions in the specified direction.
		for (let i = 1; i < 4; i++) {
			const newRow = row + i * dx; // Calculate the new row position.
			const newCol = col + i * dy; // Calculate the new column position.

			// Check if the new position is within the bounds of the DNA matrix and has the same base.
			if (
				newRow >= 0 &&
				newRow < n &&
				newCol >= 0 &&
				newCol < n &&
				dna[newRow][newCol] === base
			) {
				count++; // Increment the count if the base matches.
			} else {
				break; // Break the loop if the sequence is interrupted.
			}
		}

		// Return true if the sequence has a length of 4 (indicating a mutation).
		return count === 4;
	}

	// Iterate through the entire DNA matrix to check for mutations in all directions.
	for (let row = 0; row < n; row++) {
		for (let col = 0; col < n; col++) {
			if (checkSequenceInDirection(row, col, 0, 1)) return true; // Check horizontally.
			if (checkSequenceInDirection(row, col, 1, 0)) return true; // Check vertically.
			if (checkSequenceInDirection(row, col, 1, 1)) return true; // Check diagonally right.
			if (checkSequenceInDirection(row, col, 1, -1)) return true; // Check diagonally left.
		}
	}

	return false; // Return false if no mutations are found.
};

module.exports = hasMutation;
