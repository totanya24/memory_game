let currentCard = null;
let previousCard = null;
const gameContainer = document.getElementById("game");
let previousCardColor = "grey";
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const clickElement = document.getElementById("click_id");
//const scoreElement = document.getElementById("score_id");
const bestScoreElement = document.getElementById("best_score_id");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

startButton.addEventListener("click", function (e) {
  e.preventDefault();

  // when the DOM loads
  createDivsForColors();
  startButton.remove();
  restartButton.style.display = "block";
});

restartButton.addEventListener("click", function (e) {
  e.preventDefault();
  removeDivForColors();
  createDivsForColors();
  score = 0;
  clicks = 0;
  // scoreElement.innerHTML = "Score: " + score;
  clickElement.innerHTML = "Total Number of Clicks: " + clicks;
});

function removeDivForColors() {
  const divs = document.querySelectorAll("div");

  for (let div of divs) {
    if (div.id !== "game") {
      div.remove();
    }
  }
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors() {
  const colorArray = shuffle(COLORS);
  let index = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    //newDiv.classList.add(color);
    newDiv.id = color + "_" + index;
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    index++;
  }
}

let score = 0;
let clicks = 0;

// TODO: Implement this function!
let clicked = false;
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  event.preventDefault();
  //if (!clicked) return
  currentCard = event.target;
  clicked = true;
  clicks++;
  clickElement.innerHTML = "Total Number of Clicks: " + clicks;

  const currentColor = currentCard.classList[0];
  currentCard.style.backgroundColor = currentColor;
  currentCard.classList.add("flipped");

  if (
    previousCard !== null &&
    currentCard.classList[0] === previousCard.classList[0]
  ) {
    // console.log("matched", previousCardColor, hiddenCardColor);
    score += 2;
    previousCard.removeEventListener("click", handleCardClick);
    currentCard.removeEventListener("click", handleCardClick);
    currentCard.style.cursor = "default";
    previousCard.classList.add("flipped");
    previousCard.style.backgroundColor = currentColor;
    previousCard.style.cursor = "default";
    previousCard = null;
    currentCard = null;
    //scoreElement.innerHTML = "Score: " + score;
    //currentCard.classList.add(hiddenCardColor);
  } else {
    if (clicked) {
      if (previousCard) {
        previousCard.classList.remove("flipped");
        previousCard.style.backgroundColor = "";
      }
      previousCard = currentCard;
    }
    clicked = false;
    let timer = setInterval(function () {
      if (clicked) {
        currentCard.classList.remove("flipped");
        currentCard.style.backgroundColor = ""
        console.log("updating prev color with current color");
      }
    }, 1000);
  }

  clicked = false;

  //console.log(score);
  if (score >= 10) {
    console.log("Game Over");
    if (bestScore === "0") {
      localStorage.setItem("memory_game_clicks", clicks);
      bestScore = clicks;
    } else {
      if (clicks < bestScore) {
        localStorage.setItem("memory_game_clicks", clicks);
        bestScore = clicks;
      }
    }
    bestScoreElement.innerHTML = "Best Score: " + bestScore;
  }
}
let bestScore = 0;
function getBestScore() {
  const prevClicks = localStorage.getItem("memory_game_clicks");
  if (prevClicks !== null) {
    bestScoreElement.innerHTML = "Best Score: " + prevClicks;
    bestScore = prevClicks;
  } else {
    bestScoreElement.innerHTML = "Best Score: 0";
    localStorage.setItem("memory_game_clicks", 0);
  }
}

getBestScore();
