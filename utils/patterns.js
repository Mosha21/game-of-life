const fs = require('fs')
require('./array')

// READ INPUT FILE
const fileBuffer = fs.readFileSync('utils/patterns.json')
var fileString = fileBuffer.toString()
const { patterns } = JSON.parse(fileString)
//***************

const checkForPatterns = (grid = [], gridSize = 0, input) => {
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            input = checkForStillLifes(grid, gridSize, i, j, input)
        }
    }

    var inputString = JSON.stringify(input)
    fs.writeFileSync('utils/input.json', inputString)
}

//console.log([1, 2, 3].equals([1, 2, 3]))
const checkForStillLifes = (grid = [], gridSize = 0, row = 0, column = 0, input) => {
    const { block, beehive, loaf, boat, tub } = patterns.stillLifes
    
    // BLOCK
    if (verifyPattern(block, grid, gridSize, row, column)) {
        input.patterns.stillLifes.block += 1
    }
    // ************************

    // BEEHIVE
    if (verifyPattern(beehive, grid, gridSize, row, column)) {
        input.patterns.stillLifes.beehive += 1
    }
    // ************************

    // LOAF
    if (verifyPattern(loaf, grid, gridSize, row, column)) {
        input.patterns.stillLifes.loaf += 1
    }
    // ************************

    // BOAT
    if (verifyPattern(boat, grid, gridSize, row, column)) {
        input.patterns.stillLifes.boat += 1
    }
    // ************************

    // TUB
    if (verifyPattern(tub, grid, gridSize, row, column)) {
        input.patterns.stillLifes.tub += 1
    }
    // ************************

    return input
}

const verifyPattern = (pattern, grid = [], gridSize = 0, row = 0, column = 0) => {
    cellsBlock = []
    var cellsBlockHeight = pattern.length // NUMBER OF ROWS
    var cellsBlockWidth = pattern[0].length // NUMBER OF COLUMNS
    if (row + cellsBlockHeight <= gridSize && column + cellsBlockWidth <= gridSize) {
        for (var i = row; i < row + cellsBlockHeight; i++) { // FILL CELLS BLOCK WITH VALUES FROM THE GRID STARTING IN COORDINATE (X, Y)
            cellsBlock.push(grid[i].slice(column, column + cellsBlockWidth))
        }
        
        if (cellsBlock.equals(pattern)) {
            // DELETE ONES ALREADY FOUND IN CASE THERE ARE PASTED PATTERNS
            return true
        }
    }

    return false
}

module.exports = checkForPatterns