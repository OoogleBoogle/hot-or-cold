
$(document).ready(function(){
  var userInput = document.getElementById('userGuess');
  var game = new Game();
  console.log("The number to guess is: " + game.secretNumber);

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
    $('#userGuess').val('');
    console.log("The number to guess is: " + game.secretNumber);
  });

  $('#guessButton').click(function(e) {
    e.preventDefault();
    var userGuess = parseInt(userInput.value);
    var result = game.guess(userGuess);
    $('#feedback').text(result);
    $('#guessList').prepend('<li>' + game.currentGuess + '</li>');
    $('#count').text(game.totalGuesses);
    $('#userGuess').val('');
    console.log(game.distance);
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
  // provided we have an actual number continue
  if (typeof guess === 'number') {
    // if its a correct guess, congratulate
    if (guess === this.secretNumber) {
      result = "You Got It!!! The number was " + this.secretNumber;
    // check its between 1 and 100 and if so process number
    } else if (guess >= 1 && guess <= 100) {      
      result = this.findDistance(guess);
    // else provide feedback
    } else {
      result = "Your guess needs to be between 1 and 100";
    }
  // else say it's not a number
  } else {
    result = "That's not even a number";
  }
  // set current guess
  this.currentGuess = guess.toString();
  // update amount of guesses
  this.totalGuesses++;
  return result;
}

Game.prototype.findDistance = function(guess) {
  var result;
  // check this isn't the first guess
  if (this.distance > 0) {
    var currentDistance = Math.abs(guess - this.secretNumber);
    if (currentDistance > this.distance) {
      result = "Colder :(";
    } else {
      result = "Hotter!!!"
    }
    // set the main distance to currentDistance
    this.distance = currentDistance;
  // if it is the first guess provide some feedback
  } else {
    this.distance = Math.abs(guess - this.secretNumber);
    if (this.distance >= 1 && this.distance <= 20) {
      result = "That's pretty close!";
    } else if (this.distance >= 21 && this.distance <= 40) {
      result = "That's kinda close..."
    } else {
      result = "Meh...could be closer..."
    }
  }
  return result;
}



// if current distance is greater than previous distance then colder
// else hotter