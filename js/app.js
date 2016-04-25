// Model
// All game related data
// current guess, guessList, playerCount, secretNumber, current player
// var model = new Model();

// View
// passes user input to model via controller
// displays data in model passed from controller
// display feedback dependent on info gatherd (via controller);

// Controller
// takes user input passes to Model
// takes updated info from model and throws it at the view (Angrily Grrrr)
//var controller = new Controller(model,view)

(function() {
    'use strict';
    var game, player1, player2;

    var Model = function() {
        this.activePlayer = 0; // Will increment as needed
        this.secretNumber = Math.floor(Math.random() * (100 - 1)) + 1;
        console.log(this.secretNumber);
        this.playerList = [];
        // this.currentPlayer = player;
    };

    Model.prototype.makePlayer = function(name) {
        var player = {};
        player.name = name;
        player.score = 0;
        player.currentGuess = "";
        player.guessList = [];
        player.distance = 0;
        this.playerList.push(player);
    };

    Model.prototype.incrementPlayer = function(){
        if (this.activePlayer >= this.playerList.length - 1) {
            this.activePlayer = 0;
        }
        else {
            this.activePlayer++;
        }
    };

    // var Game = function(player) {
    //     // set up a new game
    //
    //     $('#count').text(this.totalGuesses);
    //     $('#guessList').html('');
    //     $('#userGuess').val('');
    // };

    // Game.prototype.validateGuess = function(guess) {
    //     var result;
    //     this.totalGuesses++;
    //     this.currentGuess = guess.toString();
    //     // check it's an actual number
    //     if (typeof guess === 'number') {
    //         // if number is between 1 & 100
    //         if (guess >= 1 && guess <= 100) {
    //             //result =
    //             result = this.giveFeedback(guess);
    //             // else say so
    //         } else {
    //             result = "Your guess needs to be between 1 and 100";
    //         }
    //     } else {
    //         result = "That's not even a number";
    //     }
    //     return result;
    // };
    // Game.prototype.addGuess = function() {
    //
    // };
    //
    // Game.prototype.giveFeedback = function(guess) {
    //     var result;
    //     // if it's correct...
    //     if (guess === this.secretNumber) {
    //         result = "You Got It!!! The number was " + this.secretNumber;
    //         addPlayerScore(this.currentPlayer, this.totalGuesses);
    //         startNewRound(this.currentPlayer);
    //     }
    //     // check this isn't the first guess
    //     else if (this.distance > 0) {
    //         // and see if they've already guessed this number before
    //         $('#guessList li').each(function() {
    //             var prevGuess = parseInt($(this).text());
    //             if (prevGuess === guess) {
    //                 result = "You've already had that number";
    //                 return result;
    //             }
    //         });
    //         // if not calculate current guesses distance from the secret number
    //         var currentDistance = Math.abs(guess - this.secretNumber);
    //         // if they're equidistant from the answer to their previous guess
    //         if (currentDistance === this.distance) {
    //             result = "OOOO! Equidistant!!!";
    //             // else if further away...
    //         } else if (currentDistance > this.distance) {
    //             result = "Colder :(";
    //             // or closer...
    //         } else {
    //             result = "Hotter!!!";
    //         }
    //         // store current distance for next round
    //         this.distance = currentDistance;
    //         // if it is the first guess provide some feedback
    //     } else {
    //         this.distance = Math.abs(guess - this.secretNumber);
    //         if (this.distance >= 1 && this.distance <= 10) {
    //             result = "That's damn close!";
    //         } else if (this.distance >= 11 && this.distance <= 20) {
    //             result = "That's kinda close...";
    //         } else {
    //             result = "Yeahhhh...Miles away";
    //         }
    //     }
    //     return result;
    // };
    //
    // function addPlayerScore(player, totalGuesses) {
    //     if (player === player1) {
    //         player1.score += totalGuesses;
    //         $('.player1 p').text(player1.score);
    //     } else {
    //         player2.score += totalGuesses;
    //         $('.player2 p').text(player2.score);
    //     }
    // }
    //
    // function startNewRound(player) {
    //     if (player.number === 1) {
    //         game = new Game(player2);
    //         $('.player1 h3').first().slideUp();
    //         $('.player2 h3').first().slideDown();
    //     } else {
    //         game = new Game(player1);
    //         $('.player1 h3').first().slideDown();
    //         $('.player2 h3').first().slideUp();
    //     }
    //     //$('#feedback').text(" " + game.currentPlayer.name + " you're up!");
    // }

    $(document).ready(function() {
        var model = new Model();
        var player1 = model.makePlayer("Bob");
        var player2 = model.makePlayer("Linda");
        console.log("first log: ", model);
        model.incrementPlayer();

        model.incrementPlayer();
        console.log("second log: ",model);
        var userInput = document.getElementById('userGuess');
        startNewRound(player2);

        $('.player1 h1').text(player1.name);
        $('.player2 h1').text(player2.name);


        /*--- Display information modal box ---*/
        $(".what").click(function() {
            $(".overlay").fadeIn(1000);
        });

        /*--- Hide information modal box ---*/
        $("a.close").click(function() {
            $(".overlay").fadeOut(1000);
        });

        $('.new').click(function() {
            startNewRound(game.currentPlayer);
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
})();
