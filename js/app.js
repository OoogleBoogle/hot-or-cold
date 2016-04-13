'use strict'
var game, player1, player2;

function Game(player) {
    // set up a new game
    this.secretNumber = Math.floor(Math.random() * (100 - 1)) + 1;
    console.log(this.secretNumber);
    this.currentPlayer = player;
    this.currentGuess = 0;
    this.totalGuesses = 0;
    this.distance = 0;
    $('#feedback').text('Make your Guess!');
    $('#count').text(this.totalGuesses);
    $('#guessList').html('');
    $('#userGuess').val('');
}

function Player(name, number) {
    this.name = name;
    this.score = 0;
    this.number = number;
}

var gameWon = function(game) { //maybe pass in the players?
    console.log("the game at the end: ", game)
    if (game.currentPlayer === player1) {
        game.currentPlayer = player2
    }
    if (game.currentPlayer === player2) {
        game.currentPlayer = player1
    }
    console.log("the second game: ", game)
}

Game.prototype.validateGuess = function(guess, game) {
    var result;
    // provided we have an actual number continue
    if (typeof guess === 'number') {
        console.log(game);
        console.log(this);
        // check if it's a correct guess early, and if so congratulate
        if (guess === this.secretNumber) {
            console.log("HELlOOOOO");
            result = "You Got It!!! The number was " + this.secretNumber;
            // gameWon(game);
            if (this.currentPlayer.number === 1) {
                game = new Game(player2);
                console.log(game.currentPlayer);
                console.log(game);
            } else {
                game = new Game(player1);
                console.log(game.currentPlayer);
            }
            // if (this.currentPlayer === player1) {
            //     game = new Game()
            // }
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
    var userInput = document.getElementById('userGuess');
    player1 = new Player("Bob", 1);
    player2 = new Player("Jane", 2);
    game = new Game(player1);
    console.log("the game at the start: ", game)

    console.log("here are the players: ", player1.name + " " + player2.name);

    /*--- Display information modal box ---*/
    $(".what").click(function() {
        $(".overlay").fadeIn(1000);
    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });

    $('.new').click(function() {
        game = new Game(player1);
    });

    $('#guessButton').click(function(e) {
        e.preventDefault();
        var userGuess = parseInt(userInput.value);
        var result = game.validateGuess(userGuess, game);
        $('#feedback').text(result);
        $('#guessList').append('<li>' + game.currentGuess + '</li>');
        $('#count').text(game.totalGuesses);
        $('#userGuess').focus().val('');
    });
});
