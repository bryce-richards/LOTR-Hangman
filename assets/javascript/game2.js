var playing = true;

var score = 0;

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
  "SMEAGOL",
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
  "WORMTONGUE"
  ];

// letters player can guess from (letters player hasn't yet guessed)
var availableLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// guesses left until player loses
var guessesLeft = 8;

// letters the player has guessed
var guessedLetters = [];

// letters player guessed that aren't in the word
var incorrectLetters = [];

// on-screen blanks/letters
var wordDisplay = [];

// words already selected from main names array
var usedWords = [];

// boolean variables
var isAvailable = false;
var isCorrect = false;
var alreadyGuessed = false;
var isGuessed = true;

/* Function to select a random word from the names array
*/
function pickWord(array) {
// select a random word from the names array
  array[Math.floor(Math.random()*array.length)];
  usedWords.push(word);
  names.splice(names.indexOf(word), 1);

  // displays initial blank dashes
  for (var i = 0; i < word.length; i++) {
    wordDisplay.push("_");
  };
  wordDisplayHTML.innerHTML = wordDisplay.join(" ");
  //
}
/*
*/

// set up HTML shortcuts
var wordDisplayHTML = document.getElementById("blanks");

var incorrectLettersHTML = document.getElementById("incorrect");

var guessesLeftHTML = document.getElementById("lives");

var scoreHTML = document.getElementById("score");

var alertHTML = document.getElementById("alert");

var winHTML = document.getElementById("win");

var loseHTML = document.getElementById("lose");

var newWordHTML = document.getElementById("newWord");

// display guesses left
guessesLeftHTML.innerHTML = guessesLeft;

// display score
scoreHTML.innerHTML = score;

// player makes a guess
document.onkeyup = function(event) {
  userInput = String.fromCharCode(event.keyCode).toUpperCase();
  newWordHTML.style.display="none";
  alertHTML.innerHTML = "";
  // check if guess has already been guessed
  isAvailable = false;

  for (var i = 0; i < availableLetters.length; i++) {
    if (availableLetters[i] === userInput)
      isAvailable = true;
  }

  // if letter has not been guessed / is available
  if (isAvailable) {

    // remove from available letters array
    availableLetters.splice(availableLetters.indexOf(userInput), 1)

    // keep track of how many letters that match the player's selection
    isCorrect = false;

    // check if selection is in the word
    for (var j = 0; j < word.length; j++) {

      // if one of the letters match a guess, isCorrect is true and replace blank with guess
      if (word.charAt(j) === userInput) {
        isCorrect = true;
        wordDisplay[j] = userInput;
      }
    }

    // if still no matches, add to incorrect list and subtract lives
    if (!isCorrect) {
      incorrectLetters.push(userInput);
      guessesLeft--;
    }

    // add player guess to gussed letters list
    guessedLetters.push(userInput);
  }

  // else if letter is not available
  else {
    alreadyGuessed = false;

    // check if letter has already been guessed
    for (var k = 0; k < guessedLetters.length; k++) {
      if (guessedLetters[k] === userInput) {
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
  if (guessesLeft === 0) {
    loseHTML.innerHTML = "Game Over!";
  }

  // check if word is guessed
  isGuessed = true;
  for (var l = 0; l < wordDisplay.length; l++) {
    if (wordDisplay[l] === "_") {
      isGuessed = false;
    }
  }

  // if no blanks / word is completely guessed
  if (isGuessed) {
    alertHTML.innerHTML = "You Win!";
    score++;
    newWordHTML.style.display="block";
  }



  // display stats
  incorrectLettersHTML.innerHTML = incorrectLetters.join(" ")
  wordDisplayHTML.innerHTML = wordDisplay.join(" ");
  guessesLeftHTML.innerHTML = guessesLeft;
  scoreHTML.innerHTML = score;
}



