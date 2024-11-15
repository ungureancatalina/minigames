const choice =["rock", "paper", "scissors"];
const Player= document.getElementById("Player");
const Computer= document.getElementById("Computer");
const Result= document.getElementById("Result");
const PlayerScore= document.getElementById("PlayerScore");
const ComputerScore= document.getElementById("ComputerScore");
const WinnerButton = document.getElementById("WinnerButton");
const RestartButton = document.getElementById("RestartButton");
WinnerButton.style.display = "none";
RestartButton.style.display = "none";
let score_player=0;
let score_computer=0;
let gameOver =false;


function play(player_choice)
{
    if(gameOver)
        return;

    const computer_choice=choice[Math.floor(Math.random()*3)];
    let result="";
    if(computer_choice===player_choice)
    {
        result="It's a tie!";
    }
    else
    {
        switch(player_choice)
        {
            case "rock":
                result= (computer_choice==="scissors") ? "You win!" : "You lose!";
                break;
            case "paper":
                result= (computer_choice==="rock") ? "You win!" : "You lose!";
                break;
            case "scissors":
                result= (computer_choice==="paper") ? "You win!" : "You lose!";
                break;
        }
    }
    Player.textContent= `Player: ${player_choice}`;
    Computer.textContent= `Computer: ${computer_choice}`;
    Result.textContent=result;

    Result.classList.remove("greenText", "redText");
    switch(result)
    {
        case"You win!":
            Result.classList.add("greenText");
            score_player++;
            PlayerScore.textContent=score_player;
            break;
        case"You lose!":
            Result.classList.add("redText");
            score_computer++;
            ComputerScore.textContent=score_computer;
            break;
    }

    if(score_computer==5 || score_player==5)
    {
        gameOver=true;
        const winner=score_player == 5 ? "Player" : "Computer"
        Result.textContent=`${winner} wins the game!`;
        Result.classList.add("purpleText");
    }

    if (score_player === 5) {
        WinnerButton.style.display = "block";  
        RestartButton.style.display = "none";  
    } else if (score_computer === 5) {
        WinnerButton.style.display = "none";  
        RestartButton.style.display = "block";  
    } else {
        WinnerButton.style.display = "none";  
        RestartButton.style.display = "none";
    }
}

function restartGame() {
    score_player = 0;
    score_computer = 0;
    gameOver = false;
    PlayerScore.textContent = score_player;
    ComputerScore.textContent = score_computer;
    Result.textContent = "";
    Player.textContent = "Player:";
    Computer.textContent = "Computer:";
    WinnerButton.style.display = "none";
    RestartButton.style.display = "none";
}