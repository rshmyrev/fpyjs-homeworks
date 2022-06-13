let n = Math.floor(Math.random() * 1000);
console.log(n);
while (true) {
  guess = parseInt(prompt("Type your number (from 0 to 999): "));
  if (isNaN(guess)) {
    alert("Not a number!");
  } else if (n === guess) {
    alert("Correct!");
    break;
  } else if (n < guess) {
    alert("Smaller");
  } else {
    alert("Bigger");
  }
}
