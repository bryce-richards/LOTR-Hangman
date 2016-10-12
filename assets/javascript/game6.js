// set up HTML shortcuts
var displayHTML = document.getElementById("display");
var incorrectHTML = document.getElementById("incorrect");
var scoreHTML = document.getElementById("score");
var alertBoxHTML = document.getElementById("alert-box");
var alertHTML = document.getElementById("alert");
var largePhotoHTML = document.getElementById("largePhoto");
var newNameHTML = document.getElementById("newName");

var names;
var score;

/* GAME OBJECT */
function newGame() {
  // list of name names
  names = [
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
  score = 0;

  // reset displays
  scoreHTML.innerHTML = score;
  alertHTML.innerHTML = "";
  newNameHTML.disabled = true;

  var name;
  var lives;
  var available = [];
  var guessed = [];
  var incorrect = [];
}

function newName() {
  largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/start.gif' alt ='win'>";
  newNameHTML.disabled = false;
  alertBoxHTML.className = "";
  // reset lives display
  lives = 9;
  for (var i = 1; i < lives.length + 1; i++) {
    document.getElementById("icon").style.opacity = "1";
  }
  // assign new name
  name = names[Math.floor(Math.random() * names.length)];
  //remove from names array
  names.splice(names.indexOf(name), 1);
  // on-screen blanks/letters
  display = [];
  // display initial blanks
  for (var j = 0; j < name.length; j++) {
    display.push("_");
  }
  displayHTML.innerHTML = display.join(" ");
  // letters player can guess from (letters player hasn't yet guessed)
  available =
    ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  // letters the player has guessed
  guessed = [];
  // letters player guessed that aren't in the name
  incorrect = [];
  // boolean variables
  var isAvailable = false;
  var isCorrect = false;
  var alreadyGuessed = false;
  var isGuessed = true;
  var playing = true;
  // player guess
  var userInput;
  /* player makes a guess */
  document.onkeyup = function(event) {
    alertHTML.innerHTML = "";
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
      // check if selection is in the name
      for (var j = 0; j < name.length; j++) {
        // if one of the letters match a guess, isCorrect is true and replace blank with guess
        if (name.charAt(j) === userInput) {
          isCorrect = true;
          display[j] = userInput;
          displayHTML.innerHTML = display.join(" ");
        }
      }
      // if still no matches, add to incorrect list and subtract lives
      if (!isCorrect) {
        document.getElementById("icon-" + lives).style.opacity =
        "0";
        lives--;
        incorrect.push(userInput);
        incorrectHTML.innerHTML = incorrect.join(" ");
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
          alertBoxHTML.className = "alert alert-dismissible alert-warning";
          alertHTML.innerHTML = "Already guessed this letter!";
        }
      }
      // if not already guessed, tell player to guess a letter
      if (!alreadyGuessed) {
        alertBoxHTML.className = "alert alert-dismissible alert-danger";
        alertHTML.innerHTML = "Please guess a letter!";
      }
    }
    // if no lives left, game over
    if (lives === 0) {
      alertBoxHTML.className = "alert alert-dismissible alert-danger";
      alertHTML.innerHTML = "Game Over!";
      largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/lose.gif' alt ='win'>";
    }
    // check if name is guessed
    isGuessed = true;
    for (var l = 0; l < display.length; l++) {
      if (display[l] === "_") {
        isGuessed = false;
      }
    }
    // if no blanks / name is completely guessed
    if (isGuessed) {
      largePhotoHTML.style.opacity = "1";
      largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/" + name + ".gif' alt =" + name + ">";
      alertBoxHTML.className = "alert alert-dismissible alert-success";
      alertHTML.innerHTML = "Nice!";
      score++;
      scoreHTML.innerHTML = score;
      newNameHTML.disabled = true;
    }
    if (names.length === 0) {
      alertBoxHTML.className = "alert alert-dismissible alert-info";
      alertHTML.innerHTML = "You guessed all the names!";
      largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/win.gif' alt ='win'>";
    }
  };
}

newGame();
newName();
