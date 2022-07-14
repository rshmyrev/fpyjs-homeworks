const { createGame } = require("./guessNumberGame.js");
const game = createGame();

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

class WrongGuess extends Error {
  constructor(guess) {
    super(guess);
    this.name = "WrongGuess";
  }
}

function ask(msg) {
  const promise = new Promise((resolve, reject) => {
    rl.question(msg, guess => {
      if (!game(guess)) reject(new WrongGuess(guess));
      else resolve(guess);
    });
  });

  promise.then(() => rl.close())
    .catch(() => ask(msg));
}

ask("Type your number (from 0 to 99): ");
