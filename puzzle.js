const gridSize = 4;
const imageURLs = [
    "p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", 
    "p5.jpg", "p6.jpg", "p7.jpg", "p8.jpg"
];
const puzzleContainer = document.getElementById("puzzle");
const movesCountDisplay = document.getElementById("moves-count");
const resultDisplay = document.getElementById("Result2");
const restartButton = document.getElementById("RestartButton3");

let tiles = [];
let movesCount = 0;
let firstSelected = null;
let secondSelected = null;
let imageURL = ""; // Variable to hold the chosen image URL

function initPuzzle() {
    // Randomly select an image from the available options
    imageURL = imageURLs[Math.floor(Math.random() * imageURLs.length)];
    
    movesCount = 0;
    movesCountDisplay.textContent = `Moves: ${movesCount}`;
    resultDisplay.textContent = "";
    resultDisplay.style.display = "none";
    restartButton.style.display = "none";
    tiles = [...Array(gridSize * gridSize).keys()].map(n => n + 1);
    shuffle(tiles);
    renderPuzzle();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderPuzzle() {
    puzzleContainer.innerHTML = "";
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement("div");
        tileElement.classList.add("cell2");
        const x = (tile - 1) % gridSize;
        const y = Math.floor((tile - 1) / gridSize);
        tileElement.style.backgroundImage = `url(${imageURL})`;
        tileElement.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
        tileElement.style.backgroundSize = `${gridSize * 100}px ${gridSize * 100}px`;
        tileElement.dataset.index = index;
        tileElement.addEventListener("click", () => handleTileClick(index));
        puzzleContainer.appendChild(tileElement);
    });
}

function handleTileClick(index) {
    if (firstSelected === null) {
        firstSelected = index;
        highlightTile(index);
    } else if (secondSelected === null) {
        secondSelected = index;
        highlightTile(index);

        if (isValidSwap(firstSelected, secondSelected)) {
            swapTiles(firstSelected, secondSelected);
            movesCount++;
            movesCountDisplay.textContent = `Moves: ${movesCount}`;
        }

        firstSelected = null;
        secondSelected = null;

        if (checkWin()) {
            resultDisplay.textContent = "You Win!";
            resultDisplay.classList.add("purpleText");
            resultDisplay.style.display = "block";
            restartButton.style.display = "block";
        }
    }
}

function isValidSwap(index1, index2) {
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;
    return (
        (row1 === row2 && Math.abs(col1 - col2) === 1) || 
        (col1 === col2 && Math.abs(row1 - row2) === 1)
    );
}

function swapTiles(index1, index2) {
    [tiles[index1], tiles[index2]] = [tiles[index2], tiles[index1]];
    renderPuzzle();
}

function highlightTile(index) {
    const tileElements = puzzleContainer.querySelectorAll(".cell2");
    tileElements[index].style.border = "3px solid #372a7d";
}

function checkWin() {
    const winState = [...Array(gridSize * gridSize).keys()].map(n => n + 1);
    return JSON.stringify(tiles) === JSON.stringify(winState);
}

function restartGame() {
    initPuzzle();
}

initPuzzle();
