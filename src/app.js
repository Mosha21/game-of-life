const express = require('express')

const fs = require('fs')
const checkForPatterns = require('./utils/patterns')
const changeCells = require('./utils/changeCells')

// READ INPUT FILE
const fileBuffer = fs.readFileSync('src/utils/input.json')
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
changeCells(grid, gridSize)

console.table(grid)
//checkForPatterns(grid, gridSize, input)

// SERVER
const app = express()
const port = 3000

app.get('', (req, res) => {
    res.send(input)
})

// app.listen(port, () => {
//     console.log('Server is up on port ' + port)
// })