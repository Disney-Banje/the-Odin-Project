// // UI elements that we will be interacting with..
// const playerPick = document.querySelector('.player_pick');
// const computerPick = document.querySelector('.computer_pick');
// const playerScoreDisplay = document.querySelector('.player_score');
// const computerScoreDisplay = document.querySelector('.computer_score');
// const buttons= document.querySelectorAll(".btn");
// const roundState = document.querySelector('.round_state');
// const roundMessage = document.querySelector('.round_message');
// const gameContainer = document.querySelector('.game_board');
// const restartContainer = document.querySelector('.restart_game');
// const restartButton = document.querySelector('.restart_btn');
// const winnerDisplay = document.querySelector('.game_winner');

// // computer choice generation
// function computerHandChoice() {
//     const randomNumber = Math.floor(Math.random() * 3);
    
//     // give each random number a hand choice..
//     switch (randomNumber) {
//         case 0:
//             return 'rock';
//             break;
//         case 1:
//             return 'paper';
//             break;
//         case 2:
//             return 'scissors';
//             break;
//     }
// }

// // Initialize players scores and round winner message...
// let playerScore = 0;
// let computerScore = 0;
// let roundWinner = "";

// // Rock paper and scissors round game
// function  roundGameplay(playerSelection, computerSelection) {
//     if (playerSelection === computerSelection) {
//         roundWinner = 'Tie';
//     } else if (
//         (playerSelection === 'rock' && computerSelection === 'scissors') ||
//         (playerSelection === 'paper' && computerSelection === 'rock') ||
//         (playerSelection === 'scissors' && computerSelection === 'paper')) {
//         roundWinner = 'Player'
//         playerScore++;
//     } else if (
//         (computerSelection === 'rock' && playerSelection === 'scissors') ||
//         (computerSelection === 'paper' && playerSelection === 'rock') ||
//         (computerSelection === 'scissors' && playerSelection === 'paper')) {
//         roundWinner = 'Computer';
//         computerScore++;
//     } 

//     roundDeliberation(roundWinner, playerSelection, computerSelection);
// }


// // Game deliberation function will be displaying a message about who won the round..
// function roundDeliberation(roundWinner, playerSelection, computerSelection) {
//     if (roundWinner === 'Tie') {
//         roundState.textContent = "It's a tie!";
//         roundMessage.textContent = `${playerSelection} ties with ${computerSelection}`;
//     } else if (roundWinner === 'Player') {
//         roundState.textContent = 'You have won!';
//         roundMessage.textContent = `${playerSelection} beats ${computerSelection}`;
//     } else if (roundWinner === 'Computer') {
//         roundState.textContent = 'You have lost!';
//         roundMessage.textContent = `${playerSelection} is beaten by ${computerSelection}`;
//     }

//     playerScoreDisplay.textContent = `Player: ${playerScore}`;
//     computerScoreDisplay.textContent = `Computer: ${computerScore}`;
// }

// // function to display both the player and the computer hand selection...
// function displayPlayerSelection(playerSelection, computerSelection) {
//     // player hand selection...
//     switch (playerSelection) {
//         case 'rock':
//            playerPick.textContent = '✊';
//            break;
//         case 'paper':
//             playerPick.textContent = '✋';
//             break;
//         case 'scissors':
//             playerPick.textContent = '✌';
//             break; 
//     }

//     // Computer hand selection..
//     switch (computerSelection) {
//         case 'rock':
//             computerPick.textContent = '✊';
//             break; 
//         case 'paper':
//             computerPick.textContent = '✋';
//             break; 
//         case 'scissors':
//             computerPick.textContent = '✌';
//             break;
//     }
// }

// function gameWinner(playerScore) {
//     return playerScore === 5 ? winnerDisplay.textContent = "You have won!" : winnerDisplay.textContent = "You have lost!";
// }

// // Game over 
// function gameOver() {
//     return playerScore === 5 || computerScore === 5;
// }

// function restartGame() {
//     if (gameOver()) {
//         gameContainer.classList.add("blur");
//         restartContainer.classList.remove("active");
//         gameWinner(playerScore);
//     }
// }


// // Commbining all the funcitions to generate the full gameplay...
// function fireGame(playerSelection) {
//     const computerSelection = computerHandChoice();
//     roundGameplay(playerSelection, computerSelection);
//     displayPlayerSelection(playerSelection, computerSelection);
//     restartGame();
//     // Restart game
//     restartButton.addEventListener("click", () => {
//         playerScore = 0;
//         computerScore = 0;
//         roundWinner = "";
//         roundState.textContent = 'Choose you weapon';
//         roundMessage.textContent = 'First to score 5 points wins the game';
//         playerPick.textContent = '❔';
//         computerPick.textContent = '❔';
//         playerScoreDisplay.textContent = 'Player: 0';
//         computerScoreDisplay.textContent = 'Computer: 0';
//         gameContainer.classList.remove('blur');
//         restartContainer.classList.add('active');
//     })
// }


// // Event listeners for the UI buttons..
// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         if (button.classList.contains('rock')) {
//             fireGame('rock');
//         } else if (button.classList.contains('paper')) {
//             fireGame('paper');
//         } else if (button.classList.contains('scissors')) {
//             fireGame('scissors');
//         }
//     })
// })

document.addEventListener('DOMContentLoaded', () => {
    let playerName;
    const computerName = 'The Crusher';
    function createForm() {
        const form = document.createElement('form');
        const message = document.createElement('p');
        message.textContent = `Enter your name to join the epic battle and prove your skills!.`;
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter your name';
        label.appendChild(input);
        const button = document.createElement('button');
        button.classList.add('btn-save')
        button.type = 'submit';
        button.textContent = 'Save';
        
        form.appendChild(message);
        form.appendChild(label);
        form.appendChild(button);

        console.log(form);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            input.focus();
            playerName = input.value;
            input.value = '';
            document.body.removeChild(form);
            createWelcomeMessage();
            console.log(playerName);
        })

        return form;
    }

    function createWelcomeMessage() {
        const message = document.createElement('p');
        message.innerHTML = `
        Hello, <strong>${playerName}</strong>! Will you outsmart the rock, outwit the paper, or outmaneuver the scissors? Let the games begin!
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            document.body.removeChild(message);
        }, 4900);
    }
    document.body.appendChild(createForm());


    // Create Game design..
    function createGameBoard() {
        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game_container');
        gameContainer.innerHTML = 
    }

} );