(function() {

    'use strict'
    var game, player1, player2;

    function Game(player) {
        // set up a new game
        this.secretNumber = Math.floor(Math.random() * (100 - 1)) + 1;
        console.log(this.secretNumber);
        this.currentPlayer = player;
        this.currentGuess = "";
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
    
    Game.prototype.validateGuess = function(guess) {
        var result;
        this.totalGuesses++;
        this.currentGuess = guess.toString();
        // check it's an actual number
        if (typeof guess === 'number') {
            // if number is between 1 & 100
            if (guess >= 1 && guess <= 100) {
                //result = 
                result = this.giveFeedback(guess);
            // else say so
            } else {
                result = "Your guess needs to be between 1 and 100";
            }
        } else {
            result = "That's not even a number";
        }
        return result;
    }


    // Game.prototype.validateGuess = function(guess) {
    //     var result;
    //         // check if it's a correct guess early, and if so congratulate
    //         else 
    //         // else say it's not a number
        
    //     // set current guess
    //     
    //     // update amount of guesses
    //     
    //     return result;
    // }

    Game.prototype.giveFeedback = function(guess) {
        var result;
        // if it's correct...
        if (guess === this.secretNumber) {
            result = "You Got It!!! The number was " + this.secretNumber;
            addPlayerScore(this.currentPlayer, this.totalGuesses);
            startNewRound(this);
        } 
        // check this isn't the first guess
        else if (this.distance > 0) {
            // and see if they've already guessed this number before
            $('#guessList li').each(function() {
                var prevGuess = parseInt($(this).text());
                if (prevGuess === guess) {
                    result = "You've already had that number";
                    return result;
                }
            });
            // if not calculate current guesses distance from the secret number
            var currentDistance = Math.abs(guess - this.secretNumber);
            // if they're equidistant from the answer to their previous guess
            if (currentDistance === this.distance) {
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
            if (this.distance >= 1 && this.distance <= 10) {
                result = "That's damn close!";
            } else if (this.distance >= 11 && this.distance <= 20) {
                result = "That's kinda close..."
            } else {
                result = "Yeahhhh...Miles away"
            }
        }
        return result;
    }

    function addPlayerScore(player, totalGuesses) {
        if (player === player1) {
            player1.score += totalGuesses;
        } else {
            player2.score += totalGuesses;
        }
    }

    function startNewRound(gameObj) {
        if (gameObj.currentPlayer.number === 1) {
            game = new Game(player2);
        } else {
            game = new Game(player1);
        }
    }

    $(document).ready(function() {
        var userInput = document.getElementById('userGuess');
        player1 = new Player("Bob", 1);
        player2 = new Player("Jane", 2);
        game = new Game(player1);

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
            var result = game.validateGuess(userGuess);
            $('#feedback').text(result);
            $('#guessList').append('<li>' + game.currentGuess + '</li>');
            $('#count').text(game.totalGuesses);
            $('#userGuess').focus().val('');
            console.log('player: ', game.currentPlayer);
            console.log('player1 score: ', player1.score);
            console.log('player2 score: ', player2.score);
        });
    });
})();