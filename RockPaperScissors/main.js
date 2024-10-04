document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#container');

    let playerName;
    let playerScore = 0;
    const computerName = 'The Crusher';
    let computerScore = 0;
    let roundWinner = '';


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

        // console.log(form);

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
            // console.log(playerName);
        })

        return form;
    }

    function createWelcomeMessage() {
        const message = document.createElement('p');
        message.innerHTML = `
        Hello, <strong>${playerName}</strong> ! Will you outsmart the rock, outwit the paper, or outmaneuver the scissors? Let the games begin!
        `;
        container.appendChild(message);

        setTimeout(() => {
            container.removeChild(message);
        }, 4900);
    }
    // container.appendChild(createForm());
    container.appendChild(createGameBoard());


    // Create Game design..
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
        
        handIcons.forEach(item => {
            const button = document.createElement('button');
            button.addEventListener('click', (event) => {
                // console.log(event.target.innerHTML);
                if (event.target.classList.contains('rock')) {
                    console.log('rock element clicked');
                } else if (event.target.classList.contains('paper')) {
                    console.log('paper element clicked');
                } else if (event.target.classList.contains('scissors')) {
                    console.log('scissors element clicked');
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
        restartGame.appendChild(gameWinner);
        restartGame.appendChild(button);    
        gameContainer.appendChild(restartGame);

        return gameContainer;

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
    }

    function roundDeliberation(roundWinner, roundState, roundMessage) {
        if (roundWinner === 'Tie') {
            roundState.textContent = "It's a tie!";
            roundMessage.textContent = `Ouuf  ${playerName}, are matching with ${computerName}`;
        } else if (roundWinner === 'Player') {
            roundState.textContent = 'Yeaahhh! You got this one.';
            roundMessage.textContent = `${playerName}, keep it up you are almost there.`;
        } else if (roundWinner === 'Computer') {
            roundState.textContent = `OOhhhh, it's a loss`;
            roundMessage.textContent = `${playerName}, do not let ${computerName} win this batle.`;
        }
    }

    function roundLimit(playerScore, computerScore) {
        return playerScore === 5 || computerScore === 5;
    }

    function gameOver() {
        if (roundLimit()) {
            restartGame.classList.toggle('active');
        }
    }


} );