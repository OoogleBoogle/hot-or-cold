'use strict'

function Game(player1, player2) {
    // set up a new game
    this.secretNumber = Math.floor(Math.random() * (100 - 1)) + 1;
    console.log(this.secretNumber);
    this.currentPlayer = player1;
    this.currentGuess = 0;
    this.totalGuesses = 0;
    this.distance = 0;
    $('#feedback').text('Make your Guess!');
    $('#count').text(this.totalGuesses);
    $('#guessList').html('');
    $('#userGuess').val('');
}

function Player(name) {
    this.name = name;
    this.score = 0;
    this.numGuesses;
    this.guessHistory;
}

var gameWon = function(game){
    if(this.currentPlayer === player1) {
        this.currentPlayer === player2
    }
    if(this.currentPlayer === player2) {
        this.currentPlayer === player1
    }
    console.log("the game at the end: ", game)
}

Game.prototype.validateGuess = function(guess) {
    var result;
    // provided we have an actual number continue
    if (typeof guess === 'number') {
        // check if it's a correct guess early, and if so congratulate
        if (guess === this.secretNumber) {
            result = "You Got It!!! The number was " + this.secretNumber;
            // check its between 1 and 100 and if so process number
        } else if (guess >= 1 && guess <= 100) {
            result = this.giveFeedback(guess);
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

Game.prototype.giveFeedback = function(guess) {
    var result;
    // check this isn't the first guess
    if (this.distance > 0) {
        var currentDistance = Math.abs(guess - this.secretNumber);
        // see if they've already guessed this
        $('#guessList li').each(function() {
            var prevGuess = parseInt($(this).text());
            if (prevGuess === guess) {
                result = "You've already had that number";
                return;
            }
        });
        // if they've already had this number
        if (result === "You've already had that number") {
            return result;
            // if there equidistant from the answer to their previous guess
        } else if (currentDistance === this.distance) {
            result = "OOOO! Equidistant!!!"
                // else if further away...
        } else if (currentDistance > this.distance) {
            result = "Colder :(";
            // or closer...
        } else {
            result = "Hotter!!!"
        }
        // store current distance for next round
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

$(document).ready(function() {
    var player1 = new Player("Bob");
    var player2 = new Player("Jane");
    var userInput = document.getElementById('userGuess');
    var game = new Game(player1, player2);
    console.log("the game at the start: ", game)

    console.log("here are the players: ", player1.name + " "+ player2.name);

    /*--- Display information modal box ---*/
    $(".what").click(function() {
        $(".overlay").fadeIn(1000);
    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });

    $('.new').click(function() {
        game = new Game();
    });

    $('#guessButton').click(function(e) {
        e.preventDefault();
        var userGuess = parseInt(userInput.value);
        var result = game.validateGuess(userGuess);
        $('#feedback').text(result);
        $('#guessList').append('<li>' + game.currentGuess + '</li>');
        $('#count').text(game.totalGuesses);
        $('#userGuess').focus().val('');
    });
});
