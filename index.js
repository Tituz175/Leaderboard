const button = document.querySelector("button");
const response = document.querySelector("#response");
const playerMother = document.querySelector("#playerMother");
let name,
  time,
  country,
  score,
  effect,
  playerContainer,
  playerDetails,
  playerNametime,
  playerScorecontroller,
  iconDel,
  iconPlus5,
  iconMinus5,
  inputs,
  firstName,
  lastName,
  playerCountry,
  playerScore;
let allfields = true;

let createElem = (name, element) => {
  let className = name;
  name = document.createElement(element);
  name.setAttribute("class", className);
  return name;
};

let elementCreates = () => {
  name = createElem("name", "div");
  time = createElem("time", "div");
  country = createElem("country", "div");
  score = createElem("score", "div");
  effect = createElem("effect", "span");
  playerContainer = createElem("playerContainer", "div");
  playerDetails = createElem("playerDetails", "div");
  playerNametime = createElem("playerNametime", "div");
  playerScorecontroller = createElem("playerScorecontroller", "div");
  iconDel = createElem("iconDel", "div");
  iconPlus5 = createElem("iconPlus5", "div");
  iconMinus5 = createElem("iconMinus5", "div");
};

const showDateTime = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();
  const year = now.getFullYear();
  const month = months[now.getMonth()];
  const date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  const dateMonthYear = `${month} ${date}, ${year}`;

  const time = hours + ":" + minutes;
  const fullTime = dateMonthYear + " " + time;
  return fullTime;
};

let count = 0;

let arrangePlayerdetails = (
  myfirstName,
  mylastName,
  myDate,
  myCountry,
  myScore
) => {
  elementCreates();
  name.textContent = `${myfirstName} ${mylastName}`;
  playerNametime.appendChild(name);
  time.textContent = myDate;
  playerNametime.appendChild(time);
  iconDel.textContent = "🗑️";
  iconDel.setAttribute("onClick", `del(${count})`);
  playerScorecontroller.appendChild(iconDel);
  iconPlus5.textContent = "+5";
  iconPlus5.setAttribute("onClick", `add(${count})`);
  iconPlus5.setAttribute("id", `+5${count}`);
  playerScorecontroller.appendChild(iconPlus5);
  iconMinus5.textContent = "-5";
  iconMinus5.setAttribute("onClick", `minus(${count})`);
  iconMinus5.setAttribute("id", `-5${count}`);
  playerScorecontroller.appendChild(iconMinus5);
  playerDetails.appendChild(playerNametime);
  country.textContent = myCountry;
  playerDetails.appendChild(country);
  effect.textContent = "5";
  score.textContent = myScore;
  score.appendChild(effect);
  playerDetails.appendChild(score);
  playerDetails.appendChild(playerScorecontroller);
  playerContainer.appendChild(playerDetails);
  playerMother.append(playerContainer);
  count++;
};

let players = [];

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
  playerObj.creationTime = showDateTime();
  players.push(playerObj);
};

let clearResponse = () => {
  setTimeout(() => {
    response.style.display = "none";
  }, 3000);
};

let sameDetails = false;

let display = () => {
  playerMother.textContent = "";
  players.forEach((element) => {
    arrangePlayerdetails(
      element.firstName,
      element.lastName,
      element.creationTime,
      element.playerCountry,
      element.playerScore
    );
  });
  count = 0;
};

button.addEventListener("click", () => {
  response.style.display = "none";
  inputs = document.querySelectorAll("input");
  if (checkAllinput(inputs)) {
    assignValues(inputs);
    if (!playerScoretypeCheck()) {
      if (!(players.length >= 1)) {
        saveDetails();
        display();
      } else {
        players.forEach((element) => {
          if (element.firstName == firstName && element.lastName == lastName) {
            sameDetails = true;
          }
        });
        if (!sameDetails) {
          saveDetails();
          display();
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

let del = (id) => {
  players.forEach((element, i) => {
    if (id == i) {
      players.splice(id, 1);
      let the = document.querySelectorAll(".playerContainer")[i]
      the.style.animation = "del 2s ease 0s 1"
    }
  });
  
  setTimeout(() => {
    display();
  }, 2000);

  // animation: del 2s ease 0s infinite;
};

let add = (id) => {
  players.forEach((element, i) => {
    if (id == i) {
      element.playerScore += 5;
    }
  });
  effect.textContent = "+5";
  effect.setAttribute("id", "plus5");
  setTimeout(() => {
    display();
  }, 2500);
};

let minus = (id) => {
  players.forEach((element, i) => {
    if (id == i) {
      if (!(element.playerScore < 1)) {
        element.playerScore -= 5;
        effect.textContent = "-5";
        effect.setAttribute("id", "minus5");
        setTimeout(() => {
          display();
        }, 2500);
      }
    }
  });
};
