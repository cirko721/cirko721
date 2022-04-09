"use strict";
// Selecting Elements...
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const playerScore0 = document.querySelector("#score--0");
const playerScore1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const dice = document.querySelector(".dice");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");
//  When game starting...
playerScore0.textContent = 0;
playerScore1.textContent = 0;
dice.classList.add("hidden");
//  Rolling dices...
let scores = [0, 0];
let currentScore = 0;
let playerActive = 0;
let playing = true;
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${playerActive}`).textContent =
    currentScore;
  playerActive = playerActive === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};
roll.addEventListener("click", function () {
  if (playing) {
    let i = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${i}.png`;
    dice.classList.remove("hidden");
    if (i !== 1) {
      currentScore += i;
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
hold.addEventListener("click", function () {
  if (playing) {
    scores[`${playerActive}`] += currentScore;
    document.querySelector(`#score--${playerActive}`).textContent =
      scores[`${playerActive}`];
    currentScore = 0;
    document.getElementById(`current--${playerActive}`).textContent =
      currentScore;
    if (scores[`${playerActive}`] >= 20) {
      playing = false;
      dice.classList.add("hidden");
      document.querySelector(`#score--${playerActive}`).textContent = "WIN";
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${playerActive}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});
newGame.addEventListener("click", function () {
  playing = true;
  playerActive = 0;
  document
    .querySelector(`.player--${playerActive}`)
    .classList.add("player--active");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  playerScore0.textContent = 0;
  playerScore1.textContent = 0;
  dice.classList.add("hidden");
  currentScore = 0;
  scores = [0, 0];
});
