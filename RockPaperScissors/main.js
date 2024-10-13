document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');
    const container = document.querySelector('#container');

    let playerName;
    let playerScore = 0;
    const computerName = 'The Crusher';
    let computerScore = 0;
    let roundWinner = '';


    // Creating the Game Ui components

    // Creating a form to register the player custom made name.
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


        // Adding A delay time before displaying the game board..
        form.addEventListener('submit', (event) => {
            if (input.value == '') {
                alert('Please enter your name');
            } else {
                event.preventDefault();
                input.focus();
                playerName = input.value;
                input.value = '';
                container.removeChild(form);
                createWelcomeMessage();
                setTimeout(() => {
                    container.appendChild(createGameBoard());
                }, 4909);
            }
        })

        return form;
    }


    // Creating a Welcome message after the user has entered his name, before playing the game...
    function createWelcomeMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
        <p>Hello, <strong>${playerName}</strong> ! Will you outsmart the rock, outwit the paper, or outmaneuver the scissors? Let the games begin!</p>

        <div class="beat-container">  
            <div class="beat-bubble beat-bubble-1"></div>
            <div class="beat-bubble beat-bubble-2"></div>
            <div class="beat-bubble beat-bubble-3"></div>
        </div>
        `;
        container.appendChild(message);

        setTimeout(() => {
            container.removeChild(message); // A timeout function to make the message disappear
        }, 4900);
    }
    container.appendChild(createForm());


    // Create the game board Ui design. This all the component present inside the game and will be used to react to the change of the game state.
    function createGameBoard() {
        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game_container');

        const main = document.createElement('main');
        main.classList.add('game_board');


        const gameTitle = document.createElement('section');
        gameTitle.classList.add('game_title');
        const header = document.createElement('h1');
        header.textContent = 'rock paper scissors';
        gameTitle.appendChild(header);
        main.appendChild(gameTitle);


        const introMessage = document.createElement('section');
        introMessage.classList.add('intro_message');
        const roundState = document.createElement('h2');
        roundState.classList.add('round_state');
        roundState.textContent = 'Choose your weapon';
        const roundMessage = document.createElement('p');
        roundMessage.classList.add('round_message');
        roundMessage.textContent = 'First to score 5 points wins the game';
        introMessage.appendChild(roundState);
        introMessage.appendChild(roundMessage);
        main.appendChild(introMessage);


        const scoreBoard = document.createElement('section');
        scoreBoard.classList.add('score_board');

        const playerSelection = document.createElement('div');
        playerSelection.classList.add('players_selection');
        const playerPick = document.createElement('p');
        playerPick.classList.add('player_pick');
        playerPick.textContent = '❔';
        const computerPick = document.createElement('p');
        computerPick.classList.add('computer_pick');
        computerPick.textContent = '❔';
        const playerScoreDisplay  = document.createElement('p');
        playerScoreDisplay.classList.add('player_score');
        playerScoreDisplay.textContent = `${playerName}: 0`;
        const computerScoreDisplay = document.createElement('p');
        computerScoreDisplay.classList.add('computer_score');
        computerScoreDisplay.textContent = `${computerName}: 0`;

        playerSelection.appendChild(playerPick);
        playerSelection.appendChild(computerPick);
        playerSelection.appendChild(playerScoreDisplay);
        playerSelection.appendChild(computerScoreDisplay);

        scoreBoard.appendChild(playerSelection);
        main.appendChild(scoreBoard);


        const handSelection = document.createElement('section');
        handSelection.classList.add('hand_selection');

        const handIcons = [
            {
                signTitle: 'rock',
                signIcon: '✊'
            },
            {
                signTitle: 'paper',
                signIcon: '✋'
            },
            {
                signTitle: 'scissors',
                signIcon: '✌'
            }
        ];
        
        // Directly adding the event listeners on to the buttons to start the game...
        handIcons.forEach(item => {
            const button = document.createElement('button');
            button.addEventListener('click', (event) => {
                if (event.target.classList.contains('rock')) {
                    fireGame('rock');
                } else if (event.target.classList.contains('paper')) {
                    fireGame('paper');
                } else if (event.target.classList.contains('scissors')) {
                    fireGame('scissors');
                }
            });
            button.classList.add('btn', item.signTitle);
            button.textContent = item.signIcon;
            handSelection.appendChild(button);
        });

        main.appendChild(handSelection);
        gameContainer.appendChild(main);

        const restartGame = document.createElement('div');
        restartGame.classList.add('restart_game', 'active');
        const gameWinner = document.createElement('p');
        gameWinner.classList.add('game_winner');
        gameWinner.textContent = 'Play again';
        const button = document.createElement('button');
        button.classList.add('restart_btn');
        button.textContent = 'Restart';
        button.addEventListener('click', resetGame);

        restartGame.appendChild(gameWinner);
        restartGame.appendChild(button);    
        document.body.appendChild(restartGame);
        return gameContainer;

    }





    // THIS SECTION BELOW IS THE BEHIND THE SCENE, THE FUNCTIONAL OPERATION THAT ALLOW THE USER TO PLAY AGAINST THE COMPUTER...


    // General function to start the game....
    function fireGame(playerSelection) {
        const computerSelection = computerHandChoice();
        gameRound(playerSelection, computerSelection);
        displayHandSelection(playerSelection, computerSelection);
        gameOver();
    }


    // Computer selection choice
    function computerHandChoice() {
        const choice = Math.floor(Math.random() * 3);
        
        switch (choice) {
            case 0:
                return 'rock';
                break;
            case 1:
                return 'paper';
                break;
            case 2:
                return 'scissors';
                break;
            default:
                return 'Unknown choice';
                break;
        }
    }



    // Function used to display the players hand pick on the user interface...
    function displayHandSelection(playerSelection, computerSelection) {
        const playerPick = document.querySelector('.player_pick');
        const computerPick = document.querySelector('.computer_pick');
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



    // Function that takes care of each game round player descision, to define who has won and who has lost...
    function gameRound(playerSelection, computerSelection) {
        if (playerSelection === computerSelection) {
            roundWinner = 'Tie';
        } else if (
            (playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'scissors' && computerSelection === 'paper') ||
            (playerSelection === 'paper' && computerSelection === 'rock')
        ) {
            roundWinner = "Player";
            playerScore++;
        } else if (
            (computerSelection === 'rock' && playerSelection === 'scissors') ||
            (computerSelection === 'scissors' && playerSelection === 'paper') ||
            (computerSelection === 'paper' && playerSelection === 'rock') 
        ) {
            roundWinner = 'Computer';
            computerScore++;
        }

        const playerScoreDisplay = document.querySelector('.player_score');
        const computerScoreDisplay = document.querySelector('.computer_score');
        playerScoreDisplay.textContent = `${playerName}: ${playerScore}`;
        computerScoreDisplay.textContent = `${computerName}: ${computerScore}`;
        roundDeliberation(roundWinner);
    }


    // Function to display on the user interface a deliberation message of whose the previous round winner...
    function roundDeliberation(roundWinner) {
        const roundState = document.querySelector('.round_state');
        const roundMessage = document.querySelector('.round_message');
        if (roundWinner === 'Tie') {
            roundState.textContent = "It's a tie!";
            roundState.style.color = 'white';
            roundMessage.textContent = `Ouuf  ${playerName}, are matching with ${computerName}`;
        } else if (roundWinner === 'Player') {
            roundState.textContent = 'Yeaahhh! You got this one.';
            roundState.style.color = '#177b4d';
            roundMessage.textContent = `${playerName}, keep it up you are almost there.`;
        } else if (roundWinner === 'Computer') {
            roundState.textContent = `OOhhhh, it's a loss`;
            roundState.style.color = '#c44e4f';
            roundMessage.textContent = `${playerName}, do not let ${computerName} win this batle.`;
        }
    }


    // Function Checking if the players have reached the limit of 5 rounds..
    function roundLimit() {
        return playerScore === 5 || computerScore === 5;
    }


    // Function displaying a floating message of the game outcome....
    function gameWinner() {
        const gameWinner = document.querySelector('.game_winner');
        playerScore === 5 ? gameWinner.textContent = 'You have won!!' : gameWinner.textContent = 'You have lost';
    }



    // Function used to restart the user interface components to their initial state once the game has been completed...
    function gameOver() {
        const restartGame = document.querySelector('.restart_game');
        const restartButton = document.querySelector('.restart_btn');
        if (roundLimit()) {
            restartGame.classList.remove('active');
            app.classList.add('blur');
            gameWinner();
        }
    }



    // Function to reset the game state...
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        const playerPick = document.querySelector('.player_pick');
        const computerPick = document.querySelector('.computer_pick');
        const playerScoreDisplay = document.querySelector('.player_score');
        const computerScoreDisplay = document.querySelector('.computer_score');
        const roundState = document.querySelector('.round_state');
        const roundMessage = document.querySelector('.round_message');
        playerPick.textContent = '❔';
        computerPick.textContent = '❔';
        playerScoreDisplay.textContent = `${playerName}: 0`;
        computerScoreDisplay.textContent = `${computerName}: 0`;
        roundState.textContent = 'Choose your weapon';
        roundState.style.color = 'white';
        roundMessage.textContent = 'First to score 5 points wins the game';
        const restartGame = document.querySelector('.restart_game');
        restartGame.classList.add('active');
        app.classList.remove('blur');
    }


} );