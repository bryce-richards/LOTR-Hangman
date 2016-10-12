// set up HTML shortcuts
var displayHTML = document.getElementById("display");
var incorrectHTML = document.getElementById("incorrect");
var scoreHTML = document.getElementById("score");
var alertBoxHTML = document.getElementById("alert-box");
var alertHTML = document.getElementById("alert");
var smallPhotoHTML = document.getElementById("smallPhoto");
var largePhotoHTML = document.getElementById("largePhoto");
var newNameHTML = document.getElementById("newName");

var task = new Audio("assets/audio/task.wav");

var names;
var score;

/* GAME OBJECT */
function newGame() {
  task.play();
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
  ];

  // initialize score
  score = 0;

  // reset displays
  smallPhotoHTML.style.visibility = "hidden";
  largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/start.gif' alt ='start'>";
  scoreHTML.innerHTML = score;
  alertBoxHTML.className = "";
  alertHTML.innerHTML = "";
  newNameHTML.disabled = true;

  var name;
  var lives;
  var available = [];
  var guessed = [];
  var incorrect = [];

  newName();
}

function newName() {
  newNameHTML.disabled = true;
  smallPhotoHTML.style.visibility = "hidden";
  largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/start.gif' alt ='start'>";
  alertBoxHTML.className = "";
  alertHTML.innerHTML = "";
  incorrectHTML.innerHTML = "";
  // reset lives display
  lives = 9;
  for (var i = 1; i < lives + 1; i++) {
    document.getElementById("icon-" + i).style.visibility = "visible";
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
    alertBoxHTML.className = "";
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
        document.getElementById("icon-" + lives).style.visibility =
        "hidden";
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
    // check if name is guessed
    isGuessed = true;
    for (var m = 0; m < display.length; m++) {
      if (display[m] === "_") {
        isGuessed = false;
      }
    }
    // if no blanks / name is completely guessed
    if (isGuessed) {
      largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/" + name + ".gif' alt =" + name + ">";
      smallPhotoHTML.style.visibility = "visible";
      smallPhotoHTML.innerHTML = "<img src='assets/images/gifs/shire-win.gif' alt ='shire-win'>";
      alertBoxHTML.className = "alert alert-dismissible alert-success";
      alertHTML.innerHTML = "Nice!";
      score++;
      scoreHTML.innerHTML = score;
      newNameHTML.disabled = false;
    }
    if (names.length === 0) {
      alertBoxHTML.className = "alert alert-dismissible alert-info";
      alertHTML.innerHTML = "You guessed all the names!";
      largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/win.gif' alt ='win'>";
    }
    // if no lives left, game over
    if (lives === 0) {
      alertBoxHTML.className = "alert alert-dismissible alert-danger";
      alertHTML.innerHTML = "Game Over!";
      smallPhotoHTML.style.visibility = "visible";
      smallPhotoHTML.innerHTML = "<img src='assets/images/gifs/sauron.gif' alt ='shire-win'>";
      largePhotoHTML.innerHTML = "<img src='assets/images/gifs/500px/lose.gif' alt ='win'>";
      for (var l = 0; l < name.length; l++) {
        display[l] = name.charAt(l);
      }
      displayHTML.innerHTML = display.join(" ");
    }
  };
}

newGame();
