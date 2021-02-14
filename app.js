const Cell = require('./utils/cell')
const fs = require('fs')
const checkForPatterns = require('./utils/patterns')

// READ INPUT FILE
const fileBuffer = fs.readFileSync('./utils/input.json')
var fileString = fileBuffer.toString()
const input = JSON.parse(fileString)
//***************

// EXTRACT INITIAL VALUES
const gridSize = input.gridSize
const generations = input.generations
//**********************

// FILL GRID WITH INITIAL VALUES
var grid = new Array(gridSize).fill(0)

for (var i = 0; i < gridSize; i++)
    grid[i] = new Array(gridSize).fill(0)

    input.startingCells.forEach(coordinates => {
    grid[coordinates[1]][coordinates[0]] = '1'
});
//*******************************

for (var i = 0; i < generations; i++) {
    // CHECK IN THE GRID FOR PATTERNS
}

console.table(grid)
checkForPatterns(grid, gridSize, input)
