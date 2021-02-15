const fs = require('fs')
require('./array')

// READ INPUT FILE
const fileBuffer = fs.readFileSync('src/utils/patterns.json')
var fileString = fileBuffer.toString()
const { patterns } = JSON.parse(fileString)
//***************

const checkForPatterns = (grid = [], gridSize = 0, input) => {
    var newGrid = grid.map((array) => {
        return array.slice()
    })

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            input = checkForStillLifes(newGrid, gridSize, i, j, input)
            input = checkForOscilators(newGrid, gridSize, i, j, input)
            input = checkForSpaceships(newGrid, gridSize, i, j, input)
        }
    }

    var inputString = JSON.stringify(input)
    fs.writeFileSync('src/utils/input.json', inputString)
}

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

const checkForOscilators = (grid = [], gridSize = 0, row = 0, column = 0, input) => {
    const { blinker, toad, beacon } = patterns.oscilators
    
    for (var i = 0; i < blinker.length; i++) {
        // BLINKER
        if (verifyPattern(blinker[i], grid, gridSize, row, column)) {
            input.patterns.oscilators.blinker += 1
        }
        // ************************

        // TOAD
        if (verifyPattern(toad[i], grid, gridSize, row, column)) {
            input.patterns.oscilators.toad += 1
        }
        // ************************

        // BEACON
        if (verifyPattern(beacon[i], grid, gridSize, row, column)) {
            input.patterns.oscilators.beacon += 1
        }
        // ************************
    }

    return input
}

const checkForSpaceships = (grid = [], gridSize = 0, row = 0, column = 0, input) => {
    const { glider, lightWeightSpaceship } = patterns.spaceships
    
    for (var i = 0; i < glider.length; i++) {
        // GLIDER
        if (verifyPattern(glider[i], grid, gridSize, row, column)) {
            input.patterns.spaceships.glider += 1
        }
        // ************************

        // SPACESHIP
        if (verifyPattern(lightWeightSpaceship[i], grid, gridSize, row, column)) {
            input.patterns.spaceships.lightWeightSpaceship += 1
        }
        // ************************
    }

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
            for (var i = row; i < row + cellsBlockHeight; i++) {
                for (var j = column; j < column + cellsBlockWidth; j++) {
                    grid[i][j] = '0'
                }
            }
            return true
        }
    }

    return false
}

module.exports = checkForPatterns