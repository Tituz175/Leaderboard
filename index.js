const button = document.querySelector("button");
const response = document.querySelector("#response");
const playerMother = document.querySelector("#playerMother");
let inputs;
let firstName;
let lastName;
let playerCountry;
let playerScore;
let allfields = true;

let createDiv = (divName) => {
  let className = divName;
  divName = document.createElement("div");
  divName.setAttribute("class", className);
  return divName;
};

let name,
  date,
  country,
  score,
  playerContainer,
  playerDetails,
  playerNametime,
  playerScorecontroller,
  iconDel,
  iconPlus5,
  iconMinus5;

let elementCreates = () => {
  name = createDiv("name");
  date = createDiv("date");
  country = createDiv("country");
  score = createDiv("score");
  playerContainer = createDiv("playerContainer");
  playerDetails = createDiv("playerDetails");
  playerNametime = createDiv("playerNametime");
  playerScorecontroller = createDiv("playerScorecontroller");
  iconDel = createDiv("iconDel");
  iconPlus5 = createDiv("iconPlus5");
  iconMinus5 = createDiv("iconMinus5");
};

let arrangePlayerdetails = (myfirstName, mylastName, myCountry, myScore) => {
  elementCreates();
  name.textContent = `${myfirstName} ${mylastName}`;
  playerNametime.appendChild(name);
  playerNametime.appendChild(date);
  iconDel.textContent = "🗑️";
  playerScorecontroller.appendChild(iconDel);
  iconPlus5.textContent = "+5";
  playerScorecontroller.appendChild(iconPlus5);
  iconMinus5.textContent = "-5";
  playerScorecontroller.appendChild(iconMinus5);
  playerDetails.appendChild(playerNametime);
  country.textContent = myCountry;
  playerDetails.appendChild(country);
  score.textContent = myScore;
  playerDetails.appendChild(score);
  playerDetails.appendChild(playerScorecontroller);
  playerContainer.appendChild(playerDetails);
  playerMother.append(playerContainer);
};

// arrangePlayerdetails();
// arrangePlayerdetails();
// arrangePlayerdetails();
// arrangePlayerdetails();
// arrangePlayerdetails();

// console.log(elements.length)
// for (let index = 0; index < myElements.length; index++) {
//   myElements[index] = document.createElement("div");
//   let className = myElements[index]
//   console.log(className)
//   myElements[index].setAttribute("class", `${className}`);
//   // console.log(myElements[index])
// }

// 11
let players = [];
// const playerObj = {
//   details: {
//     firstName: "",
//     lastName: "",
//     playerCountry: "",
//     playerScore: 0,
//   },
//   detailsUpdate(firstName, lastName, playerCountry, playerScore) {
//     this.details.firstName = firstName;
//     this.details.lastName = lastName;
//     this.details.playerCountry = playerCountry;
//     this.details.playerScore = playerScore;
//     players.push(this.details);
//   },
//   displayDetails() {
//     this.players.forEach((element) => {
//       // console.log(element)
//       name.textContent = `${this.firstName} ${lastName}`;
//       country.textContent = `${this.playerCountry}`;
//       score.textContent = `${this.playerScore}`;
//     });
//   },
// };

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
    return true;
  } else {
    return false;
  }
};

let playerObj;

let saveDetails = () => {
  playerObj = {};

  playerObj.firstName = firstName;
  playerObj.lastName = lastName;
  playerObj.playerCountry = playerCountry;
  playerObj.playerScore = parseInt(playerScore);
  players.push(playerObj);
  playerObj = undefined;
};

let clearResponse = () => {
  setTimeout(() => {
    response.style.display = "none";
  }, 3000);
};

let sameDetails = false;

button.addEventListener("click", () => {
  response.style.display = "none";
  inputs = document.querySelectorAll("input");
  if (checkAllinput(inputs)) {
    assignValues(inputs);
    if (!playerScoretypeCheck()) {
      if (!(players.length >= 1)) {
        saveDetails();
        playerMother.textContent = "";
        players.forEach((element) => {
          arrangePlayerdetails(
            element.firstName,
            element.lastName,
            element.playerCountry,
            element.playerScore
          );
        });
      } else {
        players.forEach((element) => {
          if (element.firstName == firstName && element.lastName == lastName) {
            sameDetails = true;
            clearResponse();
          }
        });
        if (!sameDetails) {
          saveDetails();
          playerMother.textContent = "";
          players.forEach((element) => {
            arrangePlayerdetails(
              element.firstName,
              element.lastName,
              element.playerCountry,
              element.playerScore
            );
          });
        } else {
          response.textContent = "Player details exist already";
          response.style.display = "block";
          clearResponse();
          sameDetails = false;
        }
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
