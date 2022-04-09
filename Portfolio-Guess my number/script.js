"use strict";
console.log(document.querySelector(".message").textContent);
document.querySelector(".message").textContent = "Start Guessing...";
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
let score = 20;
let highScore = 0;
const displayMessage = function(message) {
  document.querySelector(".message").textContent = message;
}
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    // IF PLAYER DO NOT INPUT HIS NUMBER---------------------------------------
    displayMessage("📩 Enter a some number!");
  } else if (guess === secretNumber) {
    if (score > highScore) {
      highScore = score
      document.querySelector(".highscore").textContent = highScore;
    };
    // PLAYER WINS THE GAME----------------------------------
    document.querySelector(".number").textContent = secretNumber;
    displayMessage("🎖️ Correct Number!");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("😓 You lost the game!")
      document.querySelector(".score").textContent = 0;
    }
  }
});
// AGAING BUTTON-------------------------------------------------------->
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("📩 Start Guessing...");
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";
});
