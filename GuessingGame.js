function generateWinningNumber () {
  return Math.floor(Math.random() * 100 + 1)
}


function shuffle(arr) {
    var m = arr.length,
        t,
        i;  
    while (m) {     // While there remain elements to shuffle…
                    // Pick a remaining element…
      i = Math.floor(Math.random() * m--); // a random number between 0 and arr.length
      t = arr[m];            // And swap it with the current element.
      arr[m] = arr[i];
      arr[i] = t;
    }
    return arr;
  }

  function Game () {
      this.playersGuess = null;
      this.pastGuesses = [];
      this.winningNumber = generateWinningNumber();
  }

  Game.prototype.difference = function () {
      return Math.abs(this.playersGuess - this.winningNumber);
  }

  Game.prototype.isLower = function () {
      if (this.playersGuess < this.winningNumber) {
          return true;
      }
      else {
          return false;
      }
  }

  Game.prototype.playersGuessSubmission = function (num) {
        this.playersGuess = num;
        if (num < 1 || num > 100 || isNaN(num)) {
            throw "That is an invalid guess.";
        }
        return this.checkGuess();
  }

  Game.prototype.checkGuess = function () {
      if (this.winningNumber === this.playersGuess) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
          return "You Win!";
      }
      else {
          if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
          return "You have already guessed that number.";
      }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            
      }
      if (this.pastGuesses.length === 5) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
          return "You Lose.";
      }
      else {
        if(this.isLower()) {
        $('#subtitle').text("Guess Higher!")
        } 
        else {
        $('#subtitle').text("Guess Lower!")
      }
        if (Math.abs(this.playersGuess - this.winningNumber) < 10) {
          return "You're burning up!";
      }
        else if (Math.abs(this.playersGuess - this.winningNumber) < 25) {
        return "You're lukewarm.";
      }
       else if (Math.abs(this.playersGuess - this.winningNumber) < 50) {
        return "You're a bit chilly.";
      }
        else if (Math.abs(this.playersGuess - this.winningNumber) < 100) {
        return "You're ice cold!";
      }
  }
      }
    }
function newGame () {
    return new Game();
}

Game.prototype.provideHint = function() {
    var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()]
    shuffle(hintArray);
    return hintArray;
}



function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

$(document).ready(function() {
    var game = new Game();

    $('#submit').click(function() {
       makeAGuess(game);
    })

    $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })

$('#hint').click(function() {
    var hints = game.provideHint();
    $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
});

$('#reset').click(function() {
    game = newGame();
    $('#title').text('Play the Guessing Game!');
    $('#subtitle').text('Guess a number between 1-100!')
    $('.guess').text('-');
    $('#hint, #submit').prop("disabled",false);
})
})

//make hints a random number between guessed values and the correct answer
//provide only one hint per guess and not on the final guess
//add animations
//re-focus cursor on player-input after pressing hint or go
//return "Please enter a number between 1-100" if a number between 1-100 is not entered