"use strict";

/*

TABLE OF CONTENTS:
#DOM Variables
#Gameboard
#Players
#Gameplay
#Test Gameplay
*/

/* ################# #DOM Variables ################ */
const playArea = document.querySelector(".gameboard");
let playSquares = document.querySelectorAll(".play__square");

/* ################# #Gameboard ################ */
const Gameboard = () => {
  let boardValues = ["", "", "", "", "", "", "", "", ""];

  const makeBoard = function () {
    const div = document.createElement("div");
    div.classList.add("play__square");
    playArea.appendChild(div);
  };

  // Create board
  playArea.classList.add("gameboard--specs");

  // Populate board
  for (let i = 0; i < 9; i++) {
    makeBoard();
  }

  playSquares = document.querySelectorAll(".play__square");

  // Add class with square number for later specific access
  for (let i = 0; i < playSquares.length; i++) {
    playSquares[i].classList.add(`square${i}`);
    playSquares[i].textContent = boardValues[i];
  }

  return { boardValues };
};

/* ################# #Players ################ */
const Player = (symbol, number) => {
  let playerSymbol = symbol;
  let playerName = `Player ${number}`;
  let playerTurn;
  playerName === "Player 1" ? (playerTurn = true) : (playerTurn = false);
  return { playerSymbol, playerName, playerTurn };
};

/* ################# #Gameplay ################ */
const GameFlow = (() => {})();

/* ################# #Test Gameplay ################ */
// Generate game board
const newBoard = Gameboard();
let gameOver = false;
let winner;

// Update Board and check for winner
document.addEventListener("mouseup", () => {
  for (let i = 0; i < playSquares.length; i++) {
    playSquares[i].textContent = newBoard.boardValues[i];
  }
});

// Generate Players
const player1 = Player("X", 1);
const player2 = Player("O", 2);

playSquares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    let squareNum = square.classList[1][6];

    if (newBoard.boardValues[squareNum] !== "") return;
    if (gameOver === true) return;

    if (player1.playerTurn === true) {
      newBoard.boardValues[squareNum] = player1.playerSymbol;
    }

    if (player2.playerTurn === true) {
      newBoard.boardValues[squareNum] = player2.playerSymbol;
    }

    player1.playerTurn === true
      ? (player1.playerTurn = false)
      : (player1.playerTurn = true);

    player2.playerTurn === true
      ? (player2.playerTurn = false)
      : (player2.playerTurn = true);
  });
});

document.addEventListener("mouseup", () => {
  // Player 1 victory scenarios
  // Horizontal
  if (
    newBoard.boardValues[0] === "X" &&
    newBoard.boardValues[1] === "X" &&
    newBoard.boardValues[2] === "X"
  ) {
    gameOver = true;
    winner = player1.playerName;
  }
  if (
    newBoard.boardValues[3] === "X" &&
    newBoard.boardValues[4] === "X" &&
    newBoard.boardValues[5] === "X"
  ) {
    gameOver = true;
    winner = player1.playerName;
  }
  if (
    newBoard.boardValues[6] === "X" &&
    newBoard.boardValues[7] === "X" &&
    newBoard.boardValues[8] === "X"
  ) {
    gameOver = true;
    winner = player1.playerName;
  }
  // Vertical
  if (
    newBoard.boardValues[0] === "X" &&
    newBoard.boardValues[3] === "X" &&
    newBoard.boardValues[6] === "X"
  ) {
    gameOver = true;
    winner = player1.playerName;
  }
  if (
    newBoard.boardValues[1] === "X" &&
    newBoard.boardValues[4] === "X" &&
    newBoard.boardValues[7] === "X"
  ) {
    gameOver = true;
    winner = player1.playerName;
  }
  if (
    newBoard.boardValues[2] === "X" &&
    newBoard.boardValues[5] === "X" &&
    newBoard.boardValues[8] === "X"
  ) {
    gameOver = true;
    winner = player1.playerName;
  }
  // Diagonal
  if (
    newBoard.boardValues[0] === "X" &&
    newBoard.boardValues[4] === "X" &&
    newBoard.boardValues[8] === "X"
  ) {
    gameOver = true;
    winner = player1.playerName;
  }
  if (
    newBoard.boardValues[2] === "X" &&
    newBoard.boardValues[4] === "X" &&
    newBoard.boardValues[6] === "X"
  ) {
    gameOver = true;
    winner = player1.playerName;
  }

  // Player 2 victory scenarios
  // Horizontal
  if (
    newBoard.boardValues[0] === "O" &&
    newBoard.boardValues[1] === "O" &&
    newBoard.boardValues[2] === "O"
  ) {
    gameOver = true;
    winner = player2.playerName;
  }
  if (
    newBoard.boardValues[3] === "O" &&
    newBoard.boardValues[4] === "O" &&
    newBoard.boardValues[5] === "O"
  ) {
    gameOver = true;
    winner = player2.playerName;
  }
  if (
    newBoard.boardValues[6] === "O" &&
    newBoard.boardValues[7] === "O" &&
    newBoard.boardValues[8] === "O"
  ) {
    gameOver = true;
    winner = player2.playerName;
  }

  // Vertical
  if (
    newBoard.boardValues[0] === "O" &&
    newBoard.boardValues[3] === "O" &&
    newBoard.boardValues[6] === "O"
  ) {
    gameOver = true;
    winner = player2.playerName;
  }
  if (
    newBoard.boardValues[1] === "O" &&
    newBoard.boardValues[4] === "O" &&
    newBoard.boardValues[7] === "O"
  ) {
    gameOver = true;
    winner = player2.playerName;
  }
  if (
    newBoard.boardValues[2] === "O" &&
    newBoard.boardValues[5] === "O" &&
    newBoard.boardValues[8] === "O"
  ) {
    gameOver = true;
    winner = player2.playerName;
  }

  // Player 2 diagonal victory scenarios
  if (
    newBoard.boardValues[0] === "O" &&
    newBoard.boardValues[4] === "O" &&
    newBoard.boardValues[8] === "O"
  ) {
    gameOver = true;
    winner = player2.playerName;
  }
  if (
    newBoard.boardValues[2] === "O" &&
    newBoard.boardValues[4] === "O" &&
    newBoard.boardValues[6] === "O"
  ) {
    gameOver = true;
    winner = player2.playerName;
  }
});
