const images = [
    "f9.jpg", "f2.jpg", "f3.jpg", "f4.jpg", 
    "f5.jpg", "f6.jpg", "f7.jpg", "f8.jpg"
];
const items = [...images, ...images];
const result = document.getElementById("Result2");
const restartButton = document.getElementById("RestartButton3");
const movesCountDisplay = document.getElementById("moves-count");
let firstCard = null;
let secondCard = null;
let movesCount = 0;
let winCount = 0;
let lockBoard = false;

restartButton.style.display = "none";
result.style.display = "none";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const board = document.querySelector(".board2");
    shuffle(items);
    board.innerHTML = "";
    items.forEach(image => {
        const card = document.createElement("div");
        card.classList.add("cell2");
        card.dataset.image = image;

        const img = document.createElement("img");
        img.src = image;
        img.alt = "image";
        img.style.display = "none";
        card.appendChild(img);

        card.addEventListener("click", () => handleCardClick(card));
        board.appendChild(card);
    });
}

function handleCardClick(card) {
    if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    const img = card.querySelector("img");
    img.style.display = "block";

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        movesCount++;
        movesCountDisplay.textContent = `Moves: ${movesCount}`;
        lockBoard = true;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        winCount++;
        resetCards();
        if (winCount === items.length / 2) {
            result.textContent = "Player wins!";
            result.classList.add("purpleText");
            result.style.display = "block";
            restartButton.style.display = "block";
        }
    } else {
        setTimeout(() => {
            firstCard.querySelector("img").style.display = "none";
            secondCard.querySelector("img").style.display = "none";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartGame() {
    movesCount = 0;
    winCount = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    movesCountDisplay.textContent = `Moves: ${movesCount}`;
    result.style.display = "none";
    restartButton.style.display = "none";
    createBoard();
}

createBoard();
