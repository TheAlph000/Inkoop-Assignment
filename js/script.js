"use strict";

let roundNumber = 0;
let HP1Value = 100;
let HP2Value = 100;
let activePlayer = 0;
let HP1wins = 0;
let HP2wins = 0;
let reset = false;

let roundNum = document.getElementById("roundNum");
let HP1winsText = document.querySelector("#HP1wins");
let HP2winsText = document.querySelector("#HP2wins");
let HP1 = document.getElementById("HP1");
let HP2 = document.getElementById("HP2");
let result = document.getElementById("result");
let heading = document.querySelector(".heading");
let roundButton = document.getElementById("startRound");
let fightImage = document.querySelector(".fight_image");

function resetForNewRound() {
  HP1Value = 100;
  HP2Value = 100;
}

//Rematch
function resetGame() {
  roundNumber = 0;
  HP1Value = 100;
  HP2Value = 100;
  activePlayer = 0;
  HP1wins = 0;
  HP2wins = 0;
  HP1.innerText = HP1Value;
  HP2.innerText = HP2Value;
  heading.innerText = "Fight!";
  result.innerText = "";
  roundNum.innerText = "0";
  fightImage.src = "images/fight.gif";
  updateFrontValues();
  reset = false;
}

function updateFrontValues() {
  HP1winsText.innerText = HP1wins;
  HP2winsText.innerText = HP2wins;
  roundButton.innerText = `Start round ${roundNumber + 1}`;
}

//Check if we have winner
function checkFinalResult() {
  if (HP1wins >= 3) {
    heading.innerText = "Player 1 won!!";
    fightImage.src = "images/final1.gif";
    roundButton.innerText = "Replay";
    reset = true;
    console.log("Player 1 won The tournament");
  }
  if (HP2wins >= 3) {
    heading.innerText = "Player 2 won!!";
    fightImage.src = "images/final2.gif";
    roundButton.innerText = "Replay";
    reset = true;
    console.log("Player 2 won The tournament");
  }
}

//Main Function
function startRound() {
  //Detecting reset behaviour
  if (reset) {
    resetGame();
  } else {
    //new round
    resetForNewRound();
    roundNumber++;
    roundNum.innerText = roundNumber;
    roundButton.innerText = `Start round ${roundNumber}`;
    console.log(`------round: ${roundNumber}------`);

    //Start the fight
    while (HP1Value > 0 && HP2Value > 0) {
      let dmg = Math.ceil(Math.random() * 5);
      if (activePlayer === 0) {
        HP1Value -= dmg;
        console.log("hp1: " + HP1Value);
        HP1.innerText = HP1Value;
      }
      if (activePlayer === 1) {
        HP2Value = HP2Value - dmg;
        HP2.innerText = HP2Value;
        console.log("hp2: " + HP2Value);
      }
      activePlayer = 1 - activePlayer; //switch player
    }

    //Results
    if (activePlayer + 1 === 1) HP1wins++;
    else HP2wins++;
    result.innerHTML = `player ${activePlayer + 1} won round ${roundNumber}`;
    fightImage.src = `images/${activePlayer + 1}wins.gif`;
    console.log(
      `player ${
        activePlayer + 1
      } won round ${roundNumber} \nPlayer1 = ${HP1wins}/5 \nPlayer2 = ${HP2wins}/5`
    );
    updateFrontValues();
    checkFinalResult();
  }
}

roundButton.addEventListener("click", startRound);
