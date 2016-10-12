// set up HTML shortcuts
var displayHTML = document.getElementById("display");

var incorrectHTML = document.getElementById("incorrect");

var scoreHTML = document.getElementById("score");

var livesHTML = document.getElementById("lives");

var alertHTML = document.getElementById("alert");

var smallPhotoHTML = document.getElementById("smallPhoto");

var largePhotoHTML = document.getElementById("largePhoto");

var names =[

  "ARAGORN",
  "LEGOLAS",
  "GIMLI",
  "FRODO",
  "SAMWISE",
  "PIPPIN",
  "GANDALF",
  "MERRY",
  "BOROMIR",
  "SAURON",
  "GOLLUM",
  "HALDIR",
  "BILBO",
  "ELROND",
  "ARWEN",
  "GALADRIEL",
  "SARUMAN",
  "EOMER",
  "THEODEN",
  "EOWYN",
  "TREEBEARD",
  "FARAMIR",
  "DENETHOR",
  "WORMTONGUE",
  "CELEBORN",
  "BALROG"
  ];

// initialize score
var score = 0;

// guesses left until player loses
var lives = 8;

// letters player can guess from (letters player hasn't yet guessed)
var available = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// letters the player has guessed
var guessed = [];

// letters player guessed that aren't in the word
var incorrect = [];

// on-screen blanks/letters
var display = [];

// used words array
var usedWords = [];

// player guess
var userInput;

// current word being guessed
var currentWord;

// boolean variables
var isAvailable = false;
var isCorrect = false;
var alreadyGuessed = false;
var isGuessed = true;
var playing = true;

// RESET
// display score
scoreHTML.innerHTML = score;

/* function for game win
*/
function winGame() {
  playing = false;
}

function resetLives() {
  lives = 9;
  for (var i = 1; i < lives.length + 1; i++) {
    document.getElementById("icon-" + i).style.opacity = "1";
  }
}

function wrongGuess() {
  lives--;
  document.getElementById("icon-" + lives).style.opacity =
  "0";
}

/* function to start a new game
*/
function newGame() {

}
/*
*/

/* function to select a random word from the names array
*/
function newWord() {
  // initialize available letters array
  available = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  // initialize incorrect letters array
  incorrect = [];
  incorrectHTML.innerHTML = incorrect.join(" ");

  // initialize guessed letters array
  guessed = [];

  // initialize word display array
  display = [];
  displayHTML.innerHTML = display.join(" ");

  lives = 8;

  // select a random word from the names array
  currentWord = names[Math.floor(Math.random()*names.length)];
  // remove name from array
  names.splice(names.indexOf(currentWord), 1);
  // display initial blank dashes
  for (var i = 0; i < currentWord.length; i++) {
    display.push("_");
  }

  displayHTML.innerHTML = display.join(" ");
  //
}
/*
*/

/* create first word
*/
newWord();
/*
*/

// player makes a guess
document.onkeyup = function(event) {
  // reset button and alert display
  alertHTML.innerHTML = "";
  livesHTML.innerHTML = lives;
  // assign user guess to variable
  userInput = String.fromCharCode(event.keyCode).toUpperCase();


  // check if guess has already been guessed
  isAvailable = false;
  for (var i = 0; i < available.length; i++) {
    if (available[i] === userInput)
      isAvailable = true;
  }

  // if letter has not been guessed / is available
  if (isAvailable) {

    // remove from available letters array
    available.splice(available.indexOf(userInput), 1);

    // keep track of how many letters that match the player's selection
    isCorrect = false;

    // check if selection is in the word
    for (var j = 0; j < currentWord.length; j++) {

      // if one of the letters match a guess, isCorrect is true and replace blank with guess
      if (currentWord.charAt(j) === userInput) {
        isCorrect = true;
        display[j] = userInput;
      }
    }

    // if still no matches, add to incorrect list and subtract lives
    if (!isCorrect) {
      incorrect.push(userInput);
      lives--;
    }

    // add player guess to gussed letters list
    guessed.push(userInput);
  }

  // else if letter is not available
  else {
    alreadyGuessed = false;

    // check if letter has already been guessed
    for (var k = 0; k < guessed.length; k++) {
      if (guessed[k] === userInput) {
        alreadyGuessed = true;

        // if already guessed, let player know
        alertHTML.innerHTML = "Already guessed this letter!";
        // alert("Already guessed this letter!");
      }
    }
    if (!alreadyGuessed) {
      // if not already guessed, tell player to guess a letter
      alertHTML.innerHTML = "Please guess a letter!";
    }
  }

  // if no lives left, game over
  if (lives === 0) {
    loseHTML.innerHTML = "Game Over!";
  }

  // check if word is guessed
  isGuessed = true;
  for (var l = 0; l < display.length; l++) {
    if (display[l] === "_") {
      isGuessed = false;
    }
  }

  // if no blanks / word is completely guessed
  if (isGuessed) {
    smallPhotoHTML.style.display = "block";
    largePhotoHTML.style.display = "block";
    smallPhotoHTML.innerHTML = "<img src='assets/images/gifs/245px/" + currentWord + ".gif' alt =" + currentWord + ">";
    largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/" + currentWord + ".gif' alt =" + currentWord + ">";
    alertHTML.innerHTML = "Way to go!";
    score++;
  }

  if (names.length === 0) {
    // function winGame(){};
    alertHTML.innerHTML = "You guessed all the names!";

  }

  // display stats
  incorrectHTML.innerHTML = incorrect.join(" ");
  displayHTML.innerHTML = display.join(" ");
  scoreHTML.innerHTML = score;
};
