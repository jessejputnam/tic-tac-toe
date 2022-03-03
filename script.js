"use strict";

/*

TABLE OF CONTENTS:
#DOM Variables
#Gameboard
#Players
#Gameplay

*/

/* ################# #DOM Variables ################ */
const playArea = document.querySelector(".gameboard");
let playSquare = document.querySelectorAll(".play__square");

/* ################# #Gameboard ################ */
const Gameboard = () => {
  let boardValues = ["X", "", "O", "", "", "", "", "", ""];

  const makeBoard = function () {
    const div = document.createElement("div");
    div.classList.add("play__square");
    playArea.appendChild(div);
  };

  playArea.classList.add("gameboard--specs");

  for (let i = 0; i < 9; i++) {
    makeBoard();
    console.log();
  }

  playSquare = document.querySelectorAll(".play__square");

  for (let i = 0; i < playSquare.length; i++) {
    playSquare[i].classList.add(`square${i}`);
    playSquare[i].textContent = boardValues[i];
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
const newBoard = Gameboard();

const player1 = Player("X", 1);
const player2 = Player("O", 2);

//update gameboard to match boardValues array
document.addEventListener("mouseup", () => {
  for (let i = 0; i < playSquare.length; i++) {
    playSquare[i].textContent = newBoard.boardValues[i];
  }
});
