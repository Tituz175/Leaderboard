const button = document.querySelector("button");
let inputs;
let firstName;
let lastName;
let playerScore;

button.addEventListener("click", () => {
  inputs = document.getElementsByTagName("input");
  firstName = inputs[0].value;
  lastName = inputs[1].value;
  playerScore = inputs[3].value;
});
