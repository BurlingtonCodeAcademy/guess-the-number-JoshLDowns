const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
      rl.question(questionText, resolve);
    });
  }



  async function correctLetter (string, option1, option2) {
    if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
      return Promise.resolve(string.toUpperCase());
    } else {
      while (string.toUpperCase() !== option1 || string.toUpperCase() !== option2) {
        string = await ask('Please enter a correct option...\n');
        if (string.toUpperCase() === option1 || string.toUpperCase() === option2) {
            console.log(Promise.resolve(string.toUpperCase()));
          return Promise.resolve(string.toUpperCase());
        }
        }
    }
  }

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

console.log(correctLetter('j', 'Y', 'N'));