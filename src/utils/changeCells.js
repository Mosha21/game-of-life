// RULES:
// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

const changeCells = (grid, gridSize) => {
    var neighbours = 0
    var newGrid = grid.map((array) => {
        return array.slice()
    })

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            const alive = grid[i][j] === 1

            // LEFT
            if (j > 0) {
                if (grid[i][j - 1] === 1) neighbours += 1
            }
            // UPPER LEFT
            if (i > 0 && j > 0) {
                if (grid[i - 1][j - 1] === 1) neighbours += 1
            }
            // UP
            if (i > 0) {
                if (grid[i - 1][j] === 1) neighbours += 1
            }
            // UPPER RIGHT
            if (i > 0 && j < gridSize - 1) {
                if (grid[i - 1][j + 1] === 1) neighbours += 1
            }
            // RIGHT
            if (j < gridSize - 1) {
                if (grid[i][j + 1] === 1) neighbours += 1
            }
            // LOWER RIGHT
            if (i < gridSize - 1 && j < gridSize - 1) {
                if (grid[i + 1][j + 1] === 1) neighbours += 1
            }
            // DOWN
            if (i < gridSize - 1) {
                if (grid[i + 1][j] === 1) neighbours += 1
            }
            // LOWER LEFT
            if (i < gridSize - 1 && j > 0) {
                if (grid[i + 1][j - 1] === 1) neighbours += 1
            }

            if (alive) {
                if (neighbours < 2) newGrid[i][j] = 0
                else if ( neighbours > 3) newGrid[i][j] = 0
            } else {
                if (neighbours === 3) newGrid[i][j] = 1
            }
            
            //console.log('(' + j + ', ' + i + ') ' + neighbours)

            neighbours = 0
        }
    }

    return newGrid
}

module.exports = changeCells