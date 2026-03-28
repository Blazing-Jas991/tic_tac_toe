// Player Object to Create the game Players:
const gamePlayers = (player, marker) => {
    return { 
    player, 
    marker
    };
};

// Board object responsible for displaying the board
const gameBoard = {
    board: [
    "", "", "", 
    "", "", "",
    "", "", ""
    ], 
};

let playerOne;
let playerTwo;

function gameController() {
    let turn = 1; // set turn to 1
    let gameOver = false; // 
    let start = false;
    const resetButton = document.createElement('button');
    resetButton.id = 'reset-button';
    resetButton.textContent = 'Reset Game';
    const body = document.querySelector('.body');
    const gameSquares = document.querySelector('.game-board');

    const player1name = document.querySelector("#player-one-name");
    const player1marker = document.querySelector("#player-one-marker");
    const player2name = document.querySelector("#player-two-name");
    const player2marker = document.querySelector("#player-two-marker");
    const submitBtn = document.querySelector(".submit-button");
    const selectionInstruction = document.querySelector(".instruction");
    const playerTurns = document.querySelector(".turns");
    const form = document.querySelector("form");
    
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if(player1name.value === "" || player1marker.value === "" || player2name.value === "" || player2marker.value === "" ) return;
        start = true;
        const playerOneName = player1name.value.toUpperCase(); // collect the text input and convert it to upper case letters
        const playerOneMarker = player1marker.value.toUpperCase(); // collect the text input from the marker input field and convert it to upper case letters
        const playerTwoName = player2name.value.toUpperCase(); 
        const playerTwoMarker = player2marker.value.toUpperCase();
        const player1 = gamePlayers(playerOneName, playerOneMarker); // call the gameplayers object and create a new player with the values obtained from the input field
        playerOne = player1;
        const player2 = gamePlayers(playerTwoName, playerTwoMarker);   // create another player
        playerTwo = player2;
        form.reset(); // when button is clicked, reset the form(delete all data)
        form.style.display = 'none'; // when clicked, hide the form
        submitBtn.style.display = 'none'; // when clicked, hide the button
        playerTurns.textContent = `It's ${playerOne.player}'s Turn To Play`;
        selectionInstruction.textContent = "";
    });

    gameSquares.addEventListener('click', (e) => {
        if(!start) return; // if the game hasn't started yet, don't allow any clicks to be registered.
            const square = e.target.closest('.squares'); 
            if (!square || gameOver) return; // If the game is not over and there is a winner, don't allow any clicks to be registered.

        const index = square.dataset.index; // another alternative to write this same line of code: const index = +square.dataset.index;

        if (gameBoard.board[index] !== '') return; // if a spot that already has a marker is clicked, do nothing.
        
        // Below code alternates between the turns of the players, if the turn is 1, playerOne's input is registered, and if turn is 2, then playerTwo's marker is registered
        if(turn === 1 && e.target.textContent === "") {
                e.target.textContent = playerOne.marker; 
                playerTurns.textContent = `It's ${playerTwo.player}'s Turn To Play`;
                gameBoard.board.splice(index, 1, playerOne.marker);
                turn = 2; 
        } else if(turn === 2 && e.target.textContent === "") {
                e.target.textContent = playerTwo.marker;
                playerTurns.textContent = `It's ${playerOne.player}'s Turn To Play`;
                gameBoard.board.splice(index, 1, playerTwo.marker); 
                turn = 1;
        } else {
                return;
        };

        // Below code checks for the Winning combination on the board, if the combination is occupied by a particular marker, the player with that marker is declared the winner, and the game is reported to be over
        if (
            (gameBoard.board[0] === playerOne.marker && gameBoard.board[3] === playerOne.marker && gameBoard.board[6] === playerOne.marker) ||
            (gameBoard.board[1] === playerOne.marker && gameBoard.board[4] === playerOne.marker && gameBoard.board[7] === playerOne.marker) ||
            (gameBoard.board[2] === playerOne.marker && gameBoard.board[5] === playerOne.marker && gameBoard.board[8] === playerOne.marker) ||
            (gameBoard.board[0] === playerOne.marker && gameBoard.board[1] === playerOne.marker && gameBoard.board[2] === playerOne.marker) ||
            (gameBoard.board[3] === playerOne.marker && gameBoard.board[4] === playerOne.marker && gameBoard.board[5] === playerOne.marker) ||
            (gameBoard.board[6] === playerOne.marker && gameBoard.board[7] === playerOne.marker && gameBoard.board[8] === playerOne.marker) ||
            (gameBoard.board[2] === playerOne.marker && gameBoard.board[4] === playerOne.marker && gameBoard.board[6] === playerOne.marker) ||
            (gameBoard.board[0] === playerOne.marker && gameBoard.board[4] === playerOne.marker && gameBoard.board[8] === playerOne.marker)
            ) {
                gameOver = true;
                playerTurns.textContent = ` ${playerOne.player} won the game`;
                return;
        } else if (
            (gameBoard.board[0] === playerTwo.marker && gameBoard.board[3] === playerTwo.marker && gameBoard.board[6] === playerTwo.marker) ||
            (gameBoard.board[1] === playerTwo.marker && gameBoard.board[4] === playerTwo.marker && gameBoard.board[7] === playerTwo.marker) ||
            (gameBoard.board[2] === playerTwo.marker && gameBoard.board[5] === playerTwo.marker && gameBoard.board[8] === playerTwo.marker) ||
            (gameBoard.board[0] === playerTwo.marker && gameBoard.board[1] === playerTwo.marker && gameBoard.board[2] === playerTwo.marker) ||
            (gameBoard.board[3] === playerTwo.marker && gameBoard.board[4] === playerTwo.marker && gameBoard.board[5] === playerTwo.marker) ||
            (gameBoard.board[6] === playerTwo.marker && gameBoard.board[7] === playerTwo.marker && gameBoard.board[8] === playerTwo.marker) ||
            (gameBoard.board[2] === playerTwo.marker && gameBoard.board[4] === playerTwo.marker && gameBoard.board[6] === playerTwo.marker) ||
            (gameBoard.board[0] === playerTwo.marker && gameBoard.board[4] === playerTwo.marker && gameBoard.board[8] === playerTwo.marker)
            ) {
                gameOver = true;
                playerTurns.textContent = ` ${playerTwo.player} won the game`;
                return;
        };

        // The code below checks for a draw in the game, if all the spots are filled and a winner was declared earlier, the game is over and it's a tie
        if (gameBoard.board.every(cell => cell !== '')) {
            gameOver = true;
            body.appendChild(resetButton);
            playerTurns.textContent = "It's A Tie";
            return;
        };

        // The below code checks if the game is over, if the game is over, it appends the reset button so that players can play another round of the game
        if(gameOver === true) {
            body.appendChild(resetButton);
            return;
        };

    });

    // Each time the reset button is clicked, reset the entire game, including the board, player inputs and markers, reset the gameover state and the start state and then hide the reset button
    resetButton.addEventListener('click', (e) => {
        e.preventDefault();
        for(let child of gameSquares.children) {
            child.textContent = "";
        };
        playerTurns.textContent = "";
        start = false;
        gameBoard.board.splice(0, gameBoard.board.length, "", "","","","","","","","");
        gameOver = false;
        turn = 1;
        resetButton.remove();
        form.style.display = 'block';
        submitBtn.style.display = 'block';
    });

    return {gameBoard, playerOne, playerTwo};
};

gameController(); // run the game.