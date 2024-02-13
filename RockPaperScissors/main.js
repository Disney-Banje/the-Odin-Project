// UI elements that we will be interacting with..
const playerPick = document.querySelector('.player_pick');
const computerPick = document.querySelector('.computer_pick');
const playerScoreDisplay = document.querySelector('.player_score');
const computerScoreDisplay = document.querySelector('.computer_score');
const buttons= document.querySelectorAll(".btn");
const roundState = document.querySelector('.round_state');
const roundMessage = document.querySelector('.round_message');
const gameContainer = document.querySelector('.game_board');
const restartContainer = document.querySelector('.restart_game');
const restartButton = document.querySelector('.restart_btn');
const winnerDisplay = document.querySelector('.game_winner');

// computer choice generation
function computerHandChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    
    // give each random number a hand choice..
    switch (randomNumber) {
        case 0:
            return 'rock';
            break;
        case 1:
            return 'paper';
            break;
        case 2:
            return 'scissors';
            break;
    }
}

// Initialize players scores and round winner message...
let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

// Rock paper and scissors round game
function  roundGameplay(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        roundWinner = 'Tie';
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')) {
        roundWinner = 'Player'
        playerScore++;
    } else if (
        (computerSelection === 'rock' && playerSelection === 'scissors') ||
        (computerSelection === 'paper' && playerSelection === 'rock') ||
        (computerSelection === 'scissors' && playerSelection === 'paper')) {
        roundWinner = 'Computer';
        computerScore++;
    } 

    roundDeliberation(roundWinner, playerSelection, computerSelection);
}


// Game deliberation function will be displaying a message about who won the round..
function roundDeliberation(roundWinner, playerSelection, computerSelection) {
    if (roundWinner === 'Tie') {
        roundState.textContent = "It's a tie!";
        roundMessage.textContent = `${playerSelection} ties with ${computerSelection}`;
    } else if (roundWinner === 'Player') {
        roundState.textContent = 'You have won!';
        roundMessage.textContent = `${playerSelection} beats ${computerSelection}`;
    } else if (roundWinner === 'Computer') {
        roundState.textContent = 'You have lost!';
        roundMessage.textContent = `${playerSelection} is beaten by ${computerSelection}`;
    }

    playerScoreDisplay.textContent = `Player: ${playerScore}`;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
}

// function to display both the player and the computer hand selection...
function displayPlayerSelection(playerSelection, computerSelection) {
    // player hand selection...
    switch (playerSelection) {
        case 'rock':
           playerPick.textContent = '✊';
           break;
        case 'paper':
            playerPick.textContent = '✋';
            break;
        case 'scissors':
            playerPick.textContent = '✌';
            break; 
    }

    // Computer hand selection..
    switch (computerSelection) {
        case 'rock':
            computerPick.textContent = '✊';
            break; 
        case 'paper':
            computerPick.textContent = '✋';
            break; 
        case 'scissors':
            computerPick.textContent = '✌';
            break;
    }
}

// Display Game Winner
function gameWinner() {
    if (playerScore === 5) {
        winnerDisplay.textContent = 'You have Won';
    } else if (computerScore === 5) {
         winnerDisplay.textContent = 'You have lost';
    }

}

// Game maximum number of rounds to play.. & restart functionality..
function gameMaxRounds(playerScore, computerScore) {
    if (playerScore === 5 || computerScore === 5) {
        gameContainer.classList.add("blur");
        restartContainer.classList.remove("active");

        // restart game button 
        restartButton.addEventListener("click", () => {
            restartContainer.classList.add("active");
            gameContainer.classList.remove("blur");
            roundState.textContent = "Choose your weapon";
            roundMessage.textContent = "First to score 5 points wins the game";
            playerScoreDisplay.textContent = "Player: 0";
            computerScoreDisplay.textContent = "Computer: 0";
            playerPick.textContent = "❔";
            computerPick.textContent = "❔";

            playerScore = 0;
            computerScore = 0;
            roundWinner = '';
        })
    }
} 


// Commbining all the funcitions to generate the full gameplay...
function fireGame(playerSelection) {
    const computerSelection = computerHandChoice();
    roundGameplay(playerSelection, computerSelection);
    displayPlayerSelection(playerSelection, computerSelection);
    gameMaxRounds(playerScore, computerScore);
}


// Event listeners for the UI buttons..
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('rock')) {
            fireGame('rock');
        } else if (button.classList.contains('paper')) {
            fireGame('paper');
        } else if (button.classList.contains('scissors')) {
            fireGame('scissors');
        }
    })
})

