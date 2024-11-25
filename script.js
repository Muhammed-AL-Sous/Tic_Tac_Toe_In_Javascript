// Select Elements
let gridItems = document.getElementsByClassName("square");
let resetButton = document.querySelector(".game-footer .reset-btn");

// ========================================================================= //

// Setting Game
let currentTurn = "X";
let gameIsFinished = false;
let boardArray = ["", "", "", "", "", "", "", "", ""];
let playerSymbol = "";
let computerSymbol = "";

// ========================================================================= //

// Player chooses X or O
function playerChooses() {
  document.getElementById("choose-x").addEventListener("click", () => {
    playerSymbol = "X";
    computerSymbol = "O";
    startGame();
  });

  document.getElementById("choose-o").addEventListener("click", () => {
    playerSymbol = "O";
    computerSymbol = "X";
    startGame();
  });
}

playerChooses();

// ========================================================================= //

function startGame() {
  // Hide the choice screen
  document.getElementById("player-choice").style.display = "none";

  // Show game board and reset button
  document.getElementById("game-header").style.display = "block";
  document.getElementById("game-board").style.display = "grid";
  document.getElementById("game-footer").style.display = "block";

  currentTurn = playerSymbol; // Set player symbol to current turn
  document.querySelector(".game-header > h2").innerHTML = `${currentTurn} Turn`;
  boardArray = ["", "", "", "", "", "", "", "", ""];
  gameIsFinished = false;
  resetGame();
}

for (const item of gridItems) {
  item.addEventListener("click", () => {
    // Check If The Game Is Finished or if the cell is already filled
    if (gameIsFinished || boardArray[item.getAttribute("data-index")] !== "")
      return;

    // Mark the current player's symbol
    let index = item.getAttribute("data-index");
    boardArray[index] = currentTurn;

    // Update the UI
    item.querySelector("h3").innerHTML = currentTurn;
    item
      .querySelector("h3")
      .classList.add("animate__animated", "animate__bounceIn");

    // Check for winner or draw after each move
    evaluateBoard();

    // Switch turn to the other player
    currentTurn = currentTurn === playerSymbol ? computerSymbol : playerSymbol;
    document.querySelector(
      ".game-header > h2"
    ).innerHTML = `${currentTurn} Turn`;

    // If it's computer's turn, make a move
    if (currentTurn === computerSymbol && !gameIsFinished) {
      setTimeout(computerMove, 500);
    }
  });
}

// ========================================================================= //

function evaluateBoard() {
  // Check for winning combinations
  if (
    // Row
    (boardArray[0] == boardArray[1] &&
      boardArray[1] == boardArray[2] &&
      boardArray[0] !== "") ||
    (boardArray[3] == boardArray[4] &&
      boardArray[4] == boardArray[5] &&
      boardArray[3] !== "") ||
    (boardArray[6] == boardArray[7] &&
      boardArray[7] == boardArray[8] &&
      boardArray[6] !== "") ||
    // Column
    (boardArray[0] == boardArray[3] &&
      boardArray[3] == boardArray[6] &&
      boardArray[0] !== "") ||
    (boardArray[1] == boardArray[4] &&
      boardArray[4] == boardArray[7] &&
      boardArray[1] !== "") ||
    (boardArray[2] == boardArray[5] &&
      boardArray[5] == boardArray[8] &&
      boardArray[2] !== "") ||
    // Diagonal
    (boardArray[0] == boardArray[4] &&
      boardArray[4] == boardArray[8] &&
      boardArray[0] !== "") ||
    (boardArray[2] == boardArray[4] &&
      boardArray[4] == boardArray[6] &&
      boardArray[2] !== "")
  ) {
    // Determine the winner based on currentTurn
    let winner = currentTurn; // currentTurn is the actual winner
    Swal.fire({
      title: `THE WINNER IS ${winner}`,
      icon: "success",
      confirmButtonText: "Ok",
    });
    gameIsFinished = true;
    return;
  }

  // Check for draw
  if (!boardArray.includes("")) {
    Swal.fire({
      title: "It's a draw!",
      icon: "info",
      confirmButtonText: "Ok",
    });
    gameIsFinished = true;
    return;
  }
}

// ========================================================================= //

function resetGame() {
  let cells = document.querySelectorAll(".square > h3");
  currentTurn = playerSymbol;
  gameIsFinished = false;
  boardArray = ["", "", "", "", "", "", "", "", ""];

  // Add The Instructions About The Current Turn
  document.querySelector(".game-header > h2").innerHTML = `${currentTurn} Turn`;

  cells.forEach((cell) => {
    cell.classList.remove("animate__animated", "animate__bounceIn");
    cell.innerHTML = "";
  });
}

resetButton.addEventListener("click", resetGame);

// ========================================================================= //

let chooseBtn = document.querySelector(".choose-btn");

function chooseIconAgain() {
  // Display the player choice screen after reset
  document.getElementById("player-choice").style.display = "block";
  document.getElementById("game-header").style.display = "none";
  document.getElementById("game-board").style.display = "none";
  document.getElementById("game-footer").style.display = "none";

  playerChooses(); // Re-enable the player choice functionality
}

chooseBtn.addEventListener("click", chooseIconAgain);

// ========================================================================= //

function computerMove() {
  let availableMoves = boardArray
    .map((value, index) => (value === "" ? index : -1))
    .filter((index) => index !== -1);

  if (availableMoves.length === 0) return;

  // Pick a random move from available moves
  let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

  // Perform the move
  boardArray[move] = computerSymbol;
  document.querySelector(`.square[data-index='${move}'] > h3`).innerHTML =
    computerSymbol;
  document
    .querySelector(`.square[data-index='${move}'] > h3`)
    .classList.add("animate__animated", "animate__bounceIn");

  // Check if the game is over after the computer's move
  evaluateBoard();

  // Switch the turn back to player
  currentTurn = playerSymbol;
  document.querySelector(".game-header > h2").innerHTML = `${currentTurn} Turn`;
}

// ========================================================================= //
