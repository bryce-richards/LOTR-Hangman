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

var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function guess(input, word) {}


var guessedLetters = [];
var blankWord = [];
var usedWords = [];
var word = names[Math.floor(Math.random()*names.length)];
usedWords.push(word);
  // remove selected word from array
  names.splice(names.indexOf(word), 1);


  // display dashes for length of word
  var wordHTML = document.getElementById("word");
  //wordHTML.innerHTML = word;
  var blanks = document.getElementById("blanks");
  var input = document.getElementById("input");
  var incorrectLetters = [];
  var incorrect = document.getElementById("incorrect");
  var livesHTML = document.getElementById("lives");
  var lives = 8;

  for (var i = 0; i < word.length; i++) {
    blankWord.push("_ ");
  };
  blanks.innerHTML = blankWord.join("");

  var wrongGuesses = 0; 
  var correctGuesses = 0;
   livesHTML.innerHTML = lives;
  document.onkeyup = function(event) {
  			userInput = String.fromCharCode(event.keyCode).toUpperCase(); 

  var correctLetters = 0;
   for (var i = 0; i < word.length; i++) {
      if (word.charAt(i) === userInput) {
       correctLetters++;
       blankWord[i] = userInput;
      }
     }
   if (correctLetters === 0) {
       incorrectLetters.push(userInput + " "); 
       guessedLetters.push(userInput);
        lives--;
   }

   blanks.innerHTML = blankWord.join("");
   incorrect.innerHTML = incorrectLetters.join("");
   livesHTML.innerHTML = lives;
  }


