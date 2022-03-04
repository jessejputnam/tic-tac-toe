"use strict";

/*

TABLE OF CONTENTS:
#DOM Variables
#DRY Variables
#Gameboard
#Players
#Win conditions
#Restart
#Gameplay
#Run Program
*/

/* ################# #DOM Variables ################ */
const playArea = document.querySelector(".gameboard");
let playSquares = document.querySelectorAll(".play__square");
const startModal = document.getElementById("start__modal");
const inputNameX = document.getElementById("player1__name");
const inputNameO = document.getElementById("player2__name");
const btnStart = document.getElementById("btn__start");
const hideForRestart = document.querySelectorAll(".hide-restart");
const modalMessage = document.querySelector(".start__title");

/* ################# #DRY Variables ################ */
const player1Win = function () {
  gameOver = true;
  winner = player1.playerName;
};
const player2Win = function () {
  gameOver = true;
  winner = player2.playerName;
};
const playerTie = function () {
  gameOver = true;
  winner = "It's a tie! No one";
};

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
const Player = (symbol, number, name) => {
  let playerSymbol = symbol;
  let playerNumber = `Player ${number}`;
  let playerName = name;
  let playerTurn;
  playerNumber === "Player 1" ? (playerTurn = true) : (playerTurn = false);
  return { playerSymbol, playerNumber, playerTurn, playerName };
};

/* ################# #Win Conditions ################ */
const winScenarios = () => {
  document.addEventListener("mouseup", () => {
    // Tie Scenario
    let tieCheck = newBoard.boardValues.some((value) => {
      return value === "";
    });
    if (tieCheck === false) playerTie();

    // Player 1 victory scenarios
    // Horizontal
    if (
      newBoard.boardValues[0] === "X" &&
      newBoard.boardValues[1] === "X" &&
      newBoard.boardValues[2] === "X"
    )
      player1Win();
    if (
      newBoard.boardValues[3] === "X" &&
      newBoard.boardValues[4] === "X" &&
      newBoard.boardValues[5] === "X"
    )
      player1Win();
    if (
      newBoard.boardValues[6] === "X" &&
      newBoard.boardValues[7] === "X" &&
      newBoard.boardValues[8] === "X"
    )
      player1Win();
    // Vertical
    if (
      newBoard.boardValues[0] === "X" &&
      newBoard.boardValues[3] === "X" &&
      newBoard.boardValues[6] === "X"
    )
      player1Win();
    if (
      newBoard.boardValues[1] === "X" &&
      newBoard.boardValues[4] === "X" &&
      newBoard.boardValues[7] === "X"
    )
      player1Win();
    if (
      newBoard.boardValues[2] === "X" &&
      newBoard.boardValues[5] === "X" &&
      newBoard.boardValues[8] === "X"
    )
      player1Win();
    // Diagonal
    if (
      newBoard.boardValues[0] === "X" &&
      newBoard.boardValues[4] === "X" &&
      newBoard.boardValues[8] === "X"
    )
      player1Win();
    if (
      newBoard.boardValues[2] === "X" &&
      newBoard.boardValues[4] === "X" &&
      newBoard.boardValues[6] === "X"
    )
      player1Win();

    // Player 2 victory scenarios
    // Horizontal
    if (
      newBoard.boardValues[0] === "O" &&
      newBoard.boardValues[1] === "O" &&
      newBoard.boardValues[2] === "O"
    )
      player2Win();
    if (
      newBoard.boardValues[3] === "O" &&
      newBoard.boardValues[4] === "O" &&
      newBoard.boardValues[5] === "O"
    )
      player2Win();
    if (
      newBoard.boardValues[6] === "O" &&
      newBoard.boardValues[7] === "O" &&
      newBoard.boardValues[8] === "O"
    )
      player2Win();
    // Vertical
    if (
      newBoard.boardValues[0] === "O" &&
      newBoard.boardValues[3] === "O" &&
      newBoard.boardValues[6] === "O"
    )
      player2Win();
    if (
      newBoard.boardValues[1] === "O" &&
      newBoard.boardValues[4] === "O" &&
      newBoard.boardValues[7] === "O"
    )
      player2Win();
    if (
      newBoard.boardValues[2] === "O" &&
      newBoard.boardValues[5] === "O" &&
      newBoard.boardValues[8] === "O"
    )
      player2Win();
    // Player 2 diagonal victory scenarios
    if (
      newBoard.boardValues[0] === "O" &&
      newBoard.boardValues[4] === "O" &&
      newBoard.boardValues[8] === "O"
    )
      player2Win();
    if (
      newBoard.boardValues[2] === "O" &&
      newBoard.boardValues[4] === "O" &&
      newBoard.boardValues[6] === "O"
    )
      player2Win();
  });
};

/* ################# #Restart ################ */
const winCheck = () => {
  if (winner !== undefined) {
    hideForRestart.forEach((item) => {
      item.classList.add("hidden");
    });

    modalMessage.textContent = `${winner} wins!`;

    startModal.classList.remove("hidden");

    btnStart.addEventListener("click", () => {
      window.location.reload(true);
    });
  }
};

setInterval(winCheck, 200);

/* ################# #Gameplay ################ */
let newBoard, gameOver, winner, player1, player2, name1, name2;

const GameFlow = () => {
  // Generate game board
  newBoard = Gameboard();
  gameOver = false;
  winner;

  // Update Board and check for winner
  document.addEventListener("mouseup", () => {
    for (let i = 0; i < playSquares.length; i++) {
      playSquares[i].textContent = newBoard.boardValues[i];
    }
  });

  // Generate Players
  player1 = Player("X", 1, name1);
  player2 = Player("O", 2, name2);

  // Play Turn Logic
  playSquares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      let squareNum = square.classList[1][6];

      // Disallow selecting filled box
      if (newBoard.boardValues[squareNum] !== "") return;
      // Disallow play once game over
      if (gameOver === true) return;

      if (player1.playerTurn === true) {
        newBoard.boardValues[squareNum] = player1.playerSymbol;
      }

      if (player2.playerTurn === true) {
        newBoard.boardValues[squareNum] = player2.playerSymbol;
      }

      // Player turn switch logic
      player1.playerTurn === true
        ? (player1.playerTurn = false)
        : (player1.playerTurn = true);

      player2.playerTurn === true
        ? (player2.playerTurn = false)
        : (player2.playerTurn = true);
    });
  });

  winScenarios();
};

const newGame = GameFlow;

/* ############### #Run Program ################## */
btnStart.addEventListener("mouseup", () => {
  inputNameX.value === "" ? (name1 = "Player 1") : (name1 = inputNameX.value);
  inputNameO.value === "" ? (name2 = "Player 2") : (name2 = inputNameO.value);

  startModal.classList.add("hidden");

  if (winner !== undefined) return;
  newGame();
});
