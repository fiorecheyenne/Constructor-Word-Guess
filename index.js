var Word = require(".word.js");
var inquirer = require("inquirer");


var remGuessez = 10;
var newWordtime = false;
var incorrect = [];
var correct = [];
var letterArray = "abcdefghijklmnopqrstuvwxyz";

const daWordz = [
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

function generate() {
    var new = Math.floor(Math.random() * daWordz.length);
    var guessingWord = daWordz[new];
    // var disWord = daWordz[index];
}

guessThisShit = new Word(guessingWord); 
console.log(guessThisShit);

function dothething() {
    if (newWordtime) {
        generate();
        guessThisShit = new Word(guessingWord);

        newWordtime = false;

    }

    var wordisDun [];
    guessThisShit.objArray.forEach(completeCheck);

    if wordisDun.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter...if you DARE",
                    name: "userinput"
                }
            ])
        then.(function (input) {
            if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                console.log("\nTry again hombre\n~*~*~*~**~*~*~*~*~*~*~\n");
                dothething();
            }
            else {
                if (incorrect.includes(input.userinput) || correct.inclues(input.userinput) || input.userinput === "") {
                    console.log("\nMmmmh...Try another letter bud\n");
                    dothething();
                }
                else {
                    var checkWord = [];
                    guessThisShit.userGuess(input.userinput);

                    guessThisShit.objArray.forEach(wordCheck);
                    if (checkWord.join('') === wordisDun.join('')) {
                        console.log("\nYikkkesssss\n");

                        incorrect.push(input.userinput);
                        remGuessez--;

                    }
                    else {
                        console.log("\nRock on bud\n");
                        correct.push(input.userinput)
                    }
                    guessThisShit.log();

                    console.log("You have dis many guesses:" + remGuessez + "\n~*~*~*~*~*~*~*\n");

                    console.log("Youve guessed: " + incorrect.join(" ") + "\n`*~*~*~*~*~\n");

                    if (remGuessez > 0) {
                        dothething();
                        
                    } else {
                        console.log("You bombed that shit\n");
                    
                        restart();
                    }

                    function wordCheck(key) {
                        checkWord.push(key.guessed);
                    }
                }
            }
            
        })
    } else {
        console.log("WINNER WINNER CHICKEN DINNER\n");
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
                    message: "Whatchu wanna do?:",
                    choices: ["Go again", "go bye bye"],
                    name: "restart"
                }
            ])
            .then(function (input) {
                if (input.restart === "Go again") {
                    newWordtime = true;
                    incorrect = [];
                    correct = [];
                    remGuessez = 10;
                    dothething();
                } else {
                    return
                }
            })
    }

dothething();
