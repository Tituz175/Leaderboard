const button = document.querySelector("button");
const response = document.querySelector("#response");
let inputs;
let firstName;
let lastName;
let playerCountry;
let playerScore;
let allfields = true;
const playerObj = {
  firstName: "",
  lastName: "",
  playerCountry: "",
  playerScore: 0,
  players: [],
};

// class Player {
//   constructor(firstName, lastName, playerCountry, playerScore) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.playerCountry = playerCountry;
//     this.playerScore = playerScore;
//   }
//   getName() {
//    return(this.firstName + " " + this.lastName);
//   }
// }

// sola = new Player("Sola","Aye","Ghana","0")
// console.log(sola.getName())

let checkAllinput = (array) => {
  array.forEach((element) => {
    if (element.value == "") {
      allfields = false;
    }
  });
  return allfields;
};

let assignValues = (array) => {
  firstName = array[0].value;
  lastName = array[1].value;
  playerCountry = array[2].value;
  playerScore = array[3].value;
};

let playerScoretypeCheck = () => {
  if (isNaN(parseInt(playerScore))) {
    console.log(true);
    return true;
  } else {
    console.log(false);
    return false;
  }
};

let saveDetails = (array) => {
  playerObj.firstName = firstName;
  playerObj.lastName = lastName;
  playerObj.playerCountry = playerCountry;
  playerObj.playerScore = parseInt(playerScore);
  array.push(playerObj);
  console.log(playerObj);
  console.log(array);
};

let clearResponse = () => {
  setTimeout(() => {
    response.style.display = "none";
  }, 3000);
};



button.addEventListener("click", () => {
  response.style.display = "none";
  inputs = document.querySelectorAll("input");
  if (checkAllinput(inputs)) {
    assignValues(inputs);
    if (!playerScoretypeCheck()) {
      if (playerObj.players.length > 0) {
        playerObj.players.forEach(({ firstName, lastName }) => {
          if (firstName == firstName && lastName == lastName) {
            response.textContent = "Player details exist already";
            response.style.display = "block";
            clearResponse();
          } else {
            saveDetails(playerObj.players);
          }
        });
      } else {
        saveDetails(playerObj.players);
      }
    } else {
      response.textContent = "Player score must be a numerical value";
      response.style.display = "block";
      clearResponse();
    }
  } else {
    response.textContent = "Kindly fill all the fields";
    response.style.display = "block";
    clearResponse();
    allfields = true;
  }
});
