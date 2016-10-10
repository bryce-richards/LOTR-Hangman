// set up HTML shortcuts
var wordDisplayHTML = document.getElementById("wordDisplay");

var incorrectLettersHTML = document.getElementById("incorrect");

var guessesLeftHTML = document.getElementById("lives");

var scoreHTML = document.getElementById("score");

var alertHTML = document.getElementById("alert");

var winHTML = document.getElementById("win");

var loseHTML = document.getElementById("lose");

var newWordHTML = document.getElementById("newWord");

var usedWordsHTML = document.getElementById("usedWords");

var wordPhotoHTML = document.getElementById("wordPhoto");

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

// initialize score
var score = 0;

// guesses left until player loses
var guessesLeft = 8;

// letters player can guess from (letters player hasn't yet guessed)
var availableLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// letters the player has guessed
var guessedLetters = [];

// letters player guessed that aren't in the word
var incorrectLetters = [];

// on-screen blanks/letters
var wordDisplay = [];

// words already selected from main names array
var usedWords = [];

// current word being guessed
var currentWord;

// boolean variables
var isAvailable = false;
var isCorrect = false;
var alreadyGuessed = false;
var isGuessed = true;
var playing = true;

// display guesses left
guessesLeftHTML.innerHTML = guessesLeft;

// display score
scoreHTML.innerHTML = score;

/* function for game win
*/
function winGame() {
  playing = false;
}


/* function to select a random word from the names array
*/
function newWord() {
  // initialize available letters array
  availableLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  // initialize incorrect letters array
  incorrectLetters = [];
  incorrectLettersHTML.innerHTML = incorrectLetters.join(" ")

  // initialize guessed letters array
  guessedLetters = [];

  // initialize word display array
  wordDisplay = [];
  wordDisplayHTML.innerHTML = wordDisplay.join(" ");

  // remove new word button
  newWordHTML.style.display = "none";

  // select a random word from the names array
  currentWord = names[Math.floor(Math.random()*names.length)];
  usedWords.push(currentWord);

  // remove name from array
  names.splice(names.indexOf(currentWord), 1);

  // display initial blank dashes
  for (var i = 0; i < currentWord.length; i++) {
    wordDisplay.push("_");
  };

  wordDisplayHTML.innerHTML = wordDisplay.join(" ");
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
  newWordHTML.style.display="none";
  alertHTML.innerHTML = "";

  // assign user guess to variable
  userInput = String.fromCharCode(event.keyCode).toUpperCase();


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
    for (var j = 0; j < currentWord.length; j++) {

      // if one of the letters match a guess, isCorrect is true and replace blank with guess
      if (currentWord.charAt(j) === userInput) {
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
    wordPhotoHTML.style.display = "block";
    wordPhotoHTML.innerHTML = "<img src='assets/images/" + currentWord + ".jpg' alt =" + currentWord + ">";
    alertHTML.innerHTML = "Way to go!";
    score++;
    newWordHTML.style.display="block";
    usedWordsHTML.style.display="block";
  }

  if (usedWords.length === 0) {
    // function winGame(){};
    alertHTML.innerHTML = "You guessed all the names!";

  }

  // display stats
  incorrectLettersHTML.innerHTML = incorrectLetters.join(" ")
  wordDisplayHTML.innerHTML = wordDisplay.join(" ");
  guessesLeftHTML.innerHTML = guessesLeft;
  scoreHTML.innerHTML = score;
}
