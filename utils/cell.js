

class Cell {
    constructor() {
        this.isAlive = true
        this.numberNeighbours = 0
    }

    addNeighbour() {
        this.numberNeighbours += 1
    }
}

module.exports = Cell