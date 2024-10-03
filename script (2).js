const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const message = document.getElementById('message');
const playerVsPlayerBtn = document.getElementById('playerVsPlayerBtn');
const playerVsAIBtn = document.getElementById('playerVsAIBtn');
const notification = document.getElementById('notification');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let aiPlayer = null;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        message.textContent = 'Game is a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (aiPlayer && currentPlayer === aiPlayer) {
        setTimeout(makeAIMove, 500); // Add a slight delay for AI move
    }
}

function makeAIMove() {
    const emptyCells = gameState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = aiPlayer;

    const aiCell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    aiCell.textContent = aiPlayer;

    if (checkWin()) {
        message.textContent = `Player ${aiPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        message.textContent = 'Game is a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    message.textContent = '';
    notification.textContent = ''; // Clear notification on restart
}

function startPlayerVsPlayer() {
    aiPlayer = null;
    notification.textContent = 'Player vs Player mode selected!';
    restartGame();
}

function startPlayerVsAI() {
    aiPlayer = 'O';
    notification.textContent = 'Player vs AI mode selected!';
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
playerVsPlayerBtn.addEventListener('click', startPlayerVsPlayer);
playerVsAIBtn.addEventListener('click', startPlayerVsAI);
