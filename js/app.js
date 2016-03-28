
$(document).ready(function(){
  var userInput = document.getElementById('userGuess');
  var game = new Game();
  console.log(game.secretNumber);

/*--- Display information modal box ---*/
  $(".what").click(function(){
    $(".overlay").fadeIn(1000);
  });

  /*--- Hide information modal box ---*/
  $("a.close").click(function(){
    $(".overlay").fadeOut(1000);
  });

  $('.new').click(function() {
    game = new Game();
    $('#feedback').text('Make your Guess!');
    $('#count').text(game.totalGuesses);
    $('#guessList').html('');
  });

  $('#guessButton').click(function(e) {
    e.preventDefault();
    var userGuess = parseInt(userInput.value);
    var result = game.guess(userGuess);
    $('#feedback').text(result);
    $('#guessList').prepend('<li>' + game.currentGuess + '</li>');
    $('#count').text(game.totalGuesses);
  });
});

function Game() {
  this.secretNumber = Math.floor(Math.random() * (100 - 1)) + 1;
  this.currentGuess = 0;
  this.totalGuesses = 0;
  this.distance = 0;
}

Game.prototype.guess = function(guess) {
  var result;
  if (typeof guess === 'number') {
    if (guess === this.secretNumber) {
      result = "You Got It!!! The number was " + this.secretNumber;
    } else if (guess >= 1 && guess <= 100) {      
      result = findDistance(guess);
    } else {
      result = "Your guess needs to be between 1 and 100";
    }
  } else {
    result = "That's not even a number";
  }
  this.currentGuess = guess.toString();
  this.totalGuesses++
  return result;
}

Game.prototype.findDistance = function(num) {
  
}

// if (guess === this.secretNumber) {
//   result = "You got it!";
// } else if (guess < this.secretNumber && guess < ) {
//   result = "Guess higher";
// } else if (guess > this.secretNumber) {
//   result = "Guess lower";
// }