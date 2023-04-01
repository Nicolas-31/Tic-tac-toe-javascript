const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')
const startCells = ['', '', '', '', '', '', '', '', ''] // 9 cells

let go = 'circle'
infoDisplay.textContent = 'Circle goes first'

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement) // add to DOM
    })
}

createBoard()

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === 'circle' ? 'cross' : 'circle'
    infoDisplay.textContent = 'it is now' + go + "'s go."
    e.target.removeEventListener('click', addGo) // to make sure the same cell can't be clicked twice
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll('.square');
    console.log(allSquares)
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ]
    
    winningCombos.forEach(combo => {
        const circleWins = combo.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))
        if (circleWins) {
            infoDisplay.textContent = 'Circle wins!'
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })


    winningCombos.forEach(combo => {
        const crossWins = combo.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))
        if (crossWins) {
            infoDisplay.textContent = 'Cross wins!'
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })
}