var Word = require("./word.js");
var inquirer = require("inquirer");
const chalk = require("chalk");
var remGuessez = 10;

var incorrect = [];
var correct = [];
var letterArray = "abcdefghijklmnopqrstuvwxyz";

var daWordz = [
  "beetlejuice",
  "hocus pocus",
  "halloween",
  "nightmare before christmas",
  "hocus pocus",
  "the addams family",
  "nightmare on elm street",
  "poltergeist",
  "the haunted mansion",
  "carrie"
];

// function generate() {
//   return Math.floor(Math.random() * daWordz.length);

// }

var rando = Math.floor(Math.random() * daWordz.length);
var guessingWord = daWordz[rando];

guessThisShit = new Word(guessingWord);
var newWordtime = false;

function dothething() {
  if (newWordtime) {
    var rando = Math.floor(Math.random() * daWordz.length);
    var guessingWord = daWordz[rando];
    guessThisShit = new Word(guessingWord);

    newWordtime = false;
  }

  var wordisDun = [];
  guessThisShit.objArray.forEach(completeCheck);

  if (wordisDun.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter...if you DARE\n",
          name: "userinput"
        }
      ])
      .then(function(input) {
        if (
          !letterArray.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log(
            chalk.red(
              "\nTry again hombre (or only guess one letter (;)\n~*~*~*~**~*~*~*~*~*~*~\n"
            )
          );
          dothething();
        } else {
          if (
            incorrect.includes(input.userinput) ||
            correct.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log(chalk.red("\nMmmmh...Try another letter bud\n"));
            dothething();
          } else {
            var checkWord = [];
            guessThisShit.userGuess(input.userinput);

            guessThisShit.objArray.forEach(wordCheck);
            if (checkWord.join("") === wordisDun.join("")) {
              console.log(chalk.red("\nYikkkesssss\n"));

              incorrect.push(input.userinput);
              remGuessez--;
            } else {
              console.log(chalk.green("\nYou got this home slice\n"));
              correct.push(input.userinput);
            }
            guessThisShit.log();

            console.log(
              chalk.magenta("You have dis many guesses: ") + remGuessez + "\n"
            );

            console.log(
              chalk.magenta("Youve guessed: ") + incorrect.join(" ") + "\n"
            );

            if (remGuessez > 0) {
              dothething();
            } else {
              console.log(chalk.yellow("You bombed that shit\n"));

              restart();
            }

            function wordCheck(key) {
              checkWord.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log(
      chalk.cyanBright("~*~*~*~*WINNER WINNER CHICKEN DINNER~*~*~*~*~*~*~*\n")
    );
    restart();
  }

  function completeCheck(key) {
    wordisDun.push(key.guessed);
  }
}
function restart() {
  inquirer
    .prompt([
      {
        type: "list",
        message: chalk.green("Whatchu wanna do?:"),
        choices: ["Go again", "go bye bye"],
        name: "restart"
      }
    ])
    .then(function(input) {
      if (input.restart === "Go again") {
        newWordtime = true;
        incorrect = [];
        correct = [];
        remGuessez = 10;
        dothething();
      } else {
        return;
      }
    });
}

dothething();
