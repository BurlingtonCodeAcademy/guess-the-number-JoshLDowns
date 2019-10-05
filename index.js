const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}



async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  await numInt();
  async function numInt() {
    let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    if (isNaN(parseInt(secretNumber)) || parseFloat(secretNumber) % 1 != 0) {    //Ensures user enters an integer
      console.log("Please enter an integer...\n");
      await numInt();
    } else {
      console.log('You entered: ' + secretNumber);
      await playComp(secretNumber);
    }
  }
}

let max = process.argv[2];
let min = 0;
let guessCount = 0;

function guess(min, max) {
  return Math.floor((parseInt(max)+min)/2); //Every guess is the middle of the remaining range of numbers
}

async function playComp(num) {
  let numGuess = min + Math.floor(Math.random()*(max-min+1)); //First guess should be random to not give away our secret!
  determine();
  async function determine() {
      let yesNo = await ask(`Is the number .... ${numGuess}? Y or N?  `);
      if (yesNo.toUpperCase() === 'Y') {
        guessCount += 1;
        console.log(`Got it! Your number is ${numGuess}! \nIt took me ${guessCount} guesses!`);
        console.log("Let's play another game where I (computer) think of a number and you (human) try to geuss it.");
        max = process.argv[2];
        min = 1;
        guessCount = 0;
        await playHuman();
      } else if (yesNo.toUpperCase() === 'N') {
        if (numGuess === parseInt(num)) {
          console.log(`You think you are tricky don't you, but I know that your number is ${numGuess}!`); //determines if player lies about answer
          guessCount +=1;
          console.log(`It took me ${guessCount} guesses!`)
          process.exit()
        } else {
            let lowHigh = await ask(`Is the number higher or lower than ${numGuess}? H or L?`);
            if (lowHigh.toUpperCase() === 'L') {
              if (numGuess < num) {   //determines if player lies about being lower
                console.log('Hey! No cheating!');
                determine();
              } else {
                max = numGuess;
                numGuess = guess(min, max);
                guessCount += 1;
                determine();
              }
            } else {
              if (numGuess > num) {   //determines if player lies about being higher
                console.log('Hey! No cheating!');
                determine();
              } else {
                min = numGuess;
                numGuess = guess(min, max);
                guessCount += 1;
                determine();
              }
            }
          }
      }
  }

}

async function playHuman () {
  let compSecretNumber = Math.floor(Math.random()*parseInt(max)+1);
  let playerGuess = await ask(`I'm thinking of a number between 1 and ${max}, what do you think it is?  `);
  compDetermine();
  async function compDetermine() {
    if (parseInt(playerGuess) === compSecretNumber) {
      guessCount +=1;
      console.log(`How do you do it!?  Yes, ${playerGuess} is the number I was thinking of!\nYou got it in ${guessCount} guesses!`);
      process.exit();
    }  else if (parseInt(playerGuess) < compSecretNumber) {
      max = playerGuess;
      guessCount += 1;
      playerGuess = await ask(`That is incorrect!  My number is higher than ${playerGuess}, please guess a new number.\n`);
      compDetermine();
    } else {
      min = playerGuess;
      guessCount += 1;
      playerGuess = await ask(`That is incorrect!  My number is lower than ${playerGuess}, please guess a new number.\n`);
      compDetermine();
    }
  }
}

start();
