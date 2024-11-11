let Player = "X";
const winnerText = document.getElementById("Winner");
const restartButton2 = document.getElementById("RestartButton2");
restartButton2.style.display = "none";

function makeMove(cell) {
    if (cell.textContent === "" && Player === "X") {
        cell.textContent = "X";
        Player = "O";
        if (!checkWin("X")) {
            setTimeout(computerMove, 200);
        }
    }
}

function computerMove() {
    const emptyCells = Array.from(document.querySelectorAll(".cell")).filter(cell => cell.textContent === "");
    if (emptyCells.length === 0) return;

    if (tryToWinOrBlock("O")) {
        Player = "X";
        return;
    }

    if (tryToWinOrBlock("X")) {
        Player = "X";
        return;
    }

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = "O";
    Player = "X";
    checkWin("O");
}

function tryToWinOrBlock(symbol) {
    const cells = Array.from(document.querySelectorAll(".cell"));
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent === symbol && cells[b].textContent === symbol && cells[c].textContent === "") {
            cells[c].textContent = "O";
            checkWin("O");
            return true;
        }
        if (cells[a].textContent === symbol && cells[c].textContent === symbol && cells[b].textContent === "") {
            cells[b].textContent = "O";
            checkWin("O");
            return true;
        }
        if (cells[b].textContent === symbol && cells[c].textContent === symbol && cells[a].textContent === "") {
            cells[a].textContent = "O";
            checkWin("O");
            return true;
        }
    }
    return false;
}

function checkWin(player) {
    const cells = Array.from(document.querySelectorAll(".cell"));
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const isWin = winPatterns.some(pattern => 
        pattern.every(index => cells[index].textContent === player)
    );

    if (isWin) {
        winnerText.textContent = `${player === "X" ? "Player" : "Computer"} wins!`;
        winnerText.classList.add("purpleText");
        restartButton2.style.display = "block";
        return true;
    } else if (cells.every(cell => cell.textContent !== "")) {
        winnerText.textContent = "It's a tie!";
        winnerText.classList.add("purpleText");
        restartButton2.style.display = "block";
        return true;
    }
    return false;
}

function restartGame() {
    const cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach(cell => cell.textContent = "");
    winnerText.textContent = "";
    restartButton2.style.display = "none"; 
    Player = "X";
}