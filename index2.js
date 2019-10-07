const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

let max = process.argv[2];
let min = 0;
let guessCount = 0;

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

async function start() {  //Starts the game and allows user to pick which game they are playing
    console.log("Welcome to Guess What??? The incredible guessing game!!\n");
    console.log("Which version would you like to play?\n\nEnter 1 if you would like me (computer) to guess a number you (human) are thinking of.\n\nEnter 2 if you (human) would like to guess a number I'm (computer) thinking of.")

    let gameChoice = await ask("Please enter 1 or 2\n");

    if (parseInt(gameChoice) === 1) {
        playComp();
    } else if (parseInt(gameChoice) === 2) {
        playHuman();
    }
}

async function playAgain() {  //Allows user to play again
    let again = await ask("Would you like to play again? Y or N\n")
    if (await correctLetter(again, 'Y', 'N') === 'Y') {
        await start();
    } else {
        process.exit();
    }
}

async function correctLetter (string, option1, option2) {  //Makes sure user enters correct option
    if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
      return string.toUpperCase();
    } else {
      while (string.toUpperCase() !== option1 || string.toUpperCase() !== option2) {
        string = await ask('Please enter a correct option...\n');
        if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
          return string.toUpperCase();
        }
        }
    }
  }

async function isInteger (num) {  //Makes sure user enters an integer, returns string as integer
    if (!isNaN(parseInt(num)) || !(parseFloat(num) % 1 != 0)) {
        return parseInt(num);
    } else {
        while (isNaN(parseInt(num)) || parseFloat(num) % 1 != 0) {
            num = await ask("Please enter an integer...\n");
            if (!isNaN(parseInt(num)) || !(parseFloat(num) % 1 != 0)) {
                return parseInt(num);
            }
        }
    }
}

function guess(min, max) {
    return Math.floor((parseInt(max) + min) / 2); //Every guess is the middle of the remaining range of numbers
}


async function playComp() {  //computer guesses human number
    console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")

    let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    myNum = await isInteger(secretNumber);
    let numGuess = min + Math.floor(Math.random() * (max - min + 1)); //First guess should be random to not give away our secret
    let yesNo = await ask(`Is the number .... ${numGuess}? Y or N?\n`);

    while (numGuess !== myNum) {
        while (yesNo.toUpperCase() === 'Y' && myNum !== numGuess) {  //makes sure user answers truthfully
            yesNo = await ask(`Please be truthful with you answer, is the number .. ${numGuess}?\n`);
        if (await correctLetter(yesNo, 'Y', 'N') === 'N') {
            if (numGuess === myNum) {
                console.log(`You think you are tricky don't you, but I know that your number is ${numGuess}!`); //determines if player lies about answer
                guessCount += 1;
                console.log(`It took me ${guessCount} guesses!\n`)
                max = process.argv[2];
                min = 1;
                guessCount = 0;
                await playAgain();
            } else {
                let lowHigh = await ask(`Is the number higher or lower than ${numGuess}? H or L?\n`);
                if (await correctLetter(lowHigh, 'H', 'L') === 'L') {
                    if (numGuess < myNum) {   //determines if player lies about being lower
                        console.log('Hey! No cheating!');
                    } else {
                        max = numGuess;
                        numGuess = guess(min, max);
                        guessCount += 1;
                    }
                } else {
                    if (numGuess > myNum) {   //determines if player lies about being higher
                        console.log('Hey! No cheating!');
                    } else {
                        min = numGuess;
                        numGuess = guess(min, max);
                        guessCount += 1;
                    }
                }
            }
        }
        yesNo = await ask(`Is the number .... ${numGuess}? Y or N?\n`);
        }
    }
    guessCount += 1;
    console.log(`Got it! Your number is ${numGuess}! \nIt took me ${guessCount} guesses!\n`);
    max = process.argv[2];
    min = 1;
    guessCount = 0;
    playAgain();
}


async function playHuman() {  //computer guesses human picked number
    console.log("Let's play a game where I (computer) think of a number and you (human) try to geuss it.\n");

    let compSecretNumber = Math.floor(Math.random() * parseInt(max) + 1);
    let playerGuess = await ask(`I'm thinking of a number between 1 and ${max}, what do you think it is?\n`);
    playerGuess = await isInteger(playerGuess);

    while (parseInt(playerGuess) !== compSecretNumber) {
        playerGuess = await isInteger(playerGuess);
        console.log(min + ' , ' + max);
        if (playerGuess < compSecretNumber) {
            if (playerGuess < min) {  //tells player if they are contradicting a previous guess
                guessCount += 1;
                playerGuess = await ask(`I already told you my number is GREATER than ${min}, please guess a new number.\n`);
            } else {
                min = playerGuess;
                guessCount += 1;
                playerGuess = await ask(`That is incorrect!  My number is higher than ${playerGuess}, please guess a new number.\n`);
                }
        } else {
            if (playerGuess > max) {  //tells player if they are contradicting a previous guess
                guessCount += 1;
                playerGuess = await ask(`I already told you my number is LESS than ${max}, please guess a new number.\n`);
            } else {
                max = playerGuess;
                guessCount += 1;
                playerGuess = await ask(`That is incorrect!  My number is lower than ${playerGuess}, please guess a new number.\n`);
            }
        }
    }
    guessCount += 1;
    console.log(`How do you do it!?  Yes, ${playerGuess} is the number I was thinking of!\nYou got it in ${guessCount} guesses!`);
    max = process.argv[2];
    min = 1;
    guessCount = 0;
    playAgain();
}

start();