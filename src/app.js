const express = require('express')
const hbs = require('hbs')
const path = require('path')

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
//const partialsPath = path.join(__dirname, '../templates/partials')

// SERVER
const app = express()
const port = 3000

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

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
    grid[coordinates[1]][coordinates[0]] = 1
});
//*******************************

for (var i = 0; i < generations; i++) {
    // CHECK IN THE GRID FOR PATTERNS
    checkForPatterns(grid, gridSize, input)

    // UPDATE CELLS
    grid = changeCells(grid, gridSize)
    //console.table(grid)
}

app.get('', (req, res) => {
    res.render('index', {
        title: 'Game of Life',
        content: grid
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})