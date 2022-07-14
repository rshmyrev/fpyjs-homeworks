module.exports.createGame = createGame;

function createGame() {
  const n = Math.floor(Math.random() * 100);
  let count = 1;

  function game(guess) {
    guess = parseInt(guess);
    let mes = `Guess #${count}. `;
    if (isNaN(guess)) {
      console.log(mes + "Not a number!");
    } else if (n === guess) {
      console.log(`Correct! Total attempts: ${count}`);
      return true;
    } else if (n < guess) {
      console.log(mes + `Smaller`);
    } else {
      console.log(mes + `Bigger`);
    }
    count++;
    return false;
  }

  return game;
}
