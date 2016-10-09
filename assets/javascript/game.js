//game object

var availableHTML = document.getElementById("available");
var livesHTML = document.getElementById("lives");
var incorrectHTML = document.getElementById("incorrect");
var wordHTML = document.getElementById("word")
var blanksHTML = document.getElementById("blanks");

var game = {
  lives: 8,
  names:
    ["ARAGORN",
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
    "WORMTONGUE"],
  
  blankArray: function(word) {
    var blankWord = [];
    for (var i = 0; i < word.length; i++) {
      blankWord.push("_");
    };
    return blankWord.join(" ")
  },
  
  newWord: function() {
    return this.names[Math.floor(Math.random()*this.names.length)];
  },
  
  removeWord: function(word) {
    this.names.splice(this.names.indexOf(word), 1);
  },
  availableLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  guessedLetters: [],
  incorrectLetters: [],
  isCorrect: function(word, array) {
    var correctLetters = 0;
    document.onkeyup = function(event) {
      var userInput = String.fromCharCode(event.keyCode).toUpperCase(); 
      for (var j = 0; j < word.length; j++) {
        if (word.charAt(j) === userInput) {
          correctLetters++;
          array[j] = userInput;
        }
      }
      if (correctLetters === 0) {
        this.incorrectLetters.push(userInput); 
        this.availableLetters.splice(this.names.indexOf(word), 1);
        this.guessedLetters.push(userInput);
        this.lives--;
        incorrectHTML.innerHTML = this.incorrectLetters.join(" ");
      }
    }
  }

}



var currentWord = game.newWord();
var currentBlanks = game.blankArray(currentWord);
blanksHTML. innerHTML = currentBlanks;
availableHTML.innerHTML = game.availableLetters.join(" ");

game.isCorrect(currentWord, currentBlanks);




