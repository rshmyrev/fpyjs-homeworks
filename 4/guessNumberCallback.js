const { createGame } = require("./guessNumberGame.js");
const game = createGame();

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

function ask(msg) {
  rl.question(msg, guess => {
    if (game(guess)) rl.close();
    else ask(msg);
  });
}

ask("Type your number (from 0 to 99): ");
