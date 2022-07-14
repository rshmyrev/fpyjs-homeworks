function getPasswordChecker(password) {
  function passwordChecker(verifiablePassword) {
    return verifiablePassword === password;
  }

  return passwordChecker;
}

// Check
let checker;

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

rl.question("Input your password: ", (password) => {
  checker = getPasswordChecker(password);
  rl.question("Verify your password: ", (password) => {
    const verified = checker(password);
    if (verified) console.log(`Correct!`);
    else console.log(`Wrong!`);
    rl.close();
  });
});
