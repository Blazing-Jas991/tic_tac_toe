const gamePlayers = (player, marker) => {
    return { 
    player, 
    marker
    };
};

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
    let turn = 1;
    let gameOver = false;
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
//   const announceWinner = document.querySelector(".result");
  const form = document.querySelector("form");
  
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(player1name.value === "" || player1marker.value === "" || player2name.value === "" || player2marker.value === "" ) return;
    start = true;
    const playerOneName = player1name.value.toUpperCase();
    const playerOneMarker = player1marker.value.toUpperCase();
    const playerTwoName = player2name.value.toUpperCase();
    const playerTwoMarker = player2marker.value.toUpperCase();
    const player1 = gamePlayers(playerOneName, playerOneMarker);
    playerOne = player1;
    const player2 = gamePlayers(playerTwoName, playerTwoMarker);   
    playerTwo = player2;
    form.reset();
    form.style.display = 'none';
    submitBtn.style.display = 'none';
    playerTurns.textContent = `It's ${playerOne.player}'s Turn To Play`;
    selectionInstruction.textContent = "";
    });
  
    gameSquares.addEventListener('click', (e) => {
      if(!start) return;
        const square = e.target.closest('.squares'); 
        if (!square || gameOver) return;

      const index = square.dataset.index; // const index = +square.dataset.index;
      
      if (gameBoard.board[index] !== '') return;
        
      if(turn === 1 && e.target.textContent === "") {
          e.target.textContent = playerOne.marker;
          // playerTurns.textContent = `It's ${playerOne.player}'s Turn To Play`;
        playerTurns.textContent = `It's ${playerTwo.player}'s Turn To Play`;
          gameBoard.board.splice(index, 1, playerOne.marker);
          turn = 2; 
      } else if(turn === 2 && e.target.textContent === "") {
          e.target.textContent = playerTwo.marker;
          // playerTurns.textContent = `It's ${playerTwo.player}'s Turn To Play`;
        playerTurns.textContent = `It's ${playerOne.player}'s Turn To Play`;
          gameBoard.board.splice(index, 1, playerTwo.marker); 
          turn = 1;
      } else {
          return;
      };

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
        //   announceWinner.textContent = ` ${playerOne.player} won the game`;
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
        //   announceWinner.textContent =` ${playerTwo.player} won the game`;
      };

    if (gameBoard.board.every(cell => cell !== '')) {
        console.log('Draw');
        gameOver = true;
        body.appendChild(resetButton)
        playerTurns.textContent = "It's A Tie";
        // announceWinner.textContent = "It's A Tie";
        return;
    };

    if(gameOver === true) {
        body.appendChild(resetButton);
    };
  });

  resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    playerTurns.textContent = "";
    // announceWinner.textContent = "";
    start = false;
    for(let child of gameSquares.children) {
     child.textContent = "";
    }
    gameBoard.board.splice(0, gameBoard.board.length, "", "","","","","","","","");
    gameOver = false;
    turn = 1;
    resetButton.remove();
    form.style.display = 'block';
    submitBtn.style.display = 'block';
  });
  
 return {gameBoard, playerOne, playerTwo};
};

gameController();