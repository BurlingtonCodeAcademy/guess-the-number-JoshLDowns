const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
      rl.question(questionText, resolve);
    });
  }

  async function isInteger (num) {  //Makes sure user enters an integer, returns string as integer
    if (parseFloat(num) % 1 === 0) {
      if (!isNaN(parseInt(num))) {
        return parseInt(num);
      }
    } else {
        while (parseFloat(num) % 1 !== 0 || isNaN(parseInt(num))) {
            num = await ask("Please enter an integer...\n");
            if (!(parseFloat(num) % 1 !== 0) || !isNaN(parseInt(num))) {
                return parseInt(num);
            }
        }
    }
}


 // async function correctLetter (string, option1, option2) {
 //   if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
 //     return Promise.resolve(string.toUpperCase());
 //   } else {
 //     while (string.toUpperCase() !== option1 || string.toUpperCase() !== option2) {
 //       string = await ask('Please enter a correct option...\n');
 //       if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
 //           console.log(Promise.resolve(string.toUpperCase()));
 //         return Promise.resolve(string.toUpperCase());
 //       }
 //       }
 //   }
 // }
//
/*async function correctLetter (string, option1, option2,) {
  if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
    return Promise.resolve(string.toUpperCase());
  } else {
    let correctEntry = await ask('Please enter a correct option...\n');
    let opt1 = option1;
    let opt2 = option2;
    correctLetter(correctEntry, opt1, opt2);
  }
  return Promise.resolve(string.toUpperCase());
}
*/

/*async function correctLetter (string, option1, option2) {
  if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
    return Promise.resolve(string.toUpperCase());
  } else {
    while (string.toUpperCase() !== option1 || string.toUpperCase() !== option2) {
      string = await ask('Please enter a correct option...\n');
      if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
        return Promise.resolve(string.toUpperCase());
      }
      }
  }
}
*/

/*async function correctLetter (string, option1, option2) {
  if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
    return Promise.resolve(string.toUpperCase());
  } else {
    do {
      string = await ask('Please enter a correct option...\n');
      if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
        return Promise.resolve(string.toUpperCase());
      }} while (string.toUpperCase() !== option1 || string.toUpperCase() !== option2);
    }
  }
*/

console.log(isInteger('3.14'));