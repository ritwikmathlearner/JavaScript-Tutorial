/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dice, finalScore;
init();
var x = document.querySelector("#score-" + activePlayer).textContent;
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    dice[0] = Math.floor(Math.random() * 6 + 1);
    dice[1] = Math.floor(Math.random() * 6 + 1);
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice[0] + ".png";
    document.getElementById("dice-2").src = "dice-" + dice[1] + ".png";
    if (dice[0] === 6 && dice[1] === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (dice[0] !== 1 && dice[1] !== 1) {
      roundScore += dice[0] + dice[1];
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    if (!finalScore) {
      finalScore = 50;
    }
    if (scores[activePlayer] >= finalScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});
if (!gamePlaying) {
  document.querySelector("#finalScore").addEventListener("input", function() {
    finalScore = document.querySelector("#finalScore").value;
  });
}

function nextPlayer() {
  setFinalScore = false;
  roundScore = 0;
  dice = [0, 0];
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  hideDice();
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  hideDice();
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
}

document.querySelector(".btn-new").addEventListener("click", init);
function init() {
  gamePlaying = true;
  document.querySelector("#finalScore").value = "";
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  dice = [0, 0];
  hideDice();
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector("#name-0").textContent = "Player 0";
  document.querySelector("#name-1").textContent = "Player 1";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
function hideDice() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}
