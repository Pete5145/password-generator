// Select all Elements of interest
const decrementBtn = document.querySelector("#decrement");
const incrementBtn = document.querySelector("#increment");
const lengthInput = document.querySelector("#password-length");
const generateBtn = document.querySelector("#btn");
const firstNameInput = document.querySelector("#fname");
const lastNameInput = document.querySelector("#lname");
const displayPassword = document.querySelector("#display");

//Initialize
let passwordLength = 15;
lengthInput.value = passwordLength;

// Bind elements of interest to an event listener
displayPassword.addEventListener("click", autoCopy);
decrementBtn.addEventListener("click", inputStepper);
incrementBtn.addEventListener("click", inputStepper);
lengthInput.addEventListener("blur", updateLength);
generateBtn.addEventListener("click", generatePassword);

// Event Handlers
function inputStepper(event) {
  if (event.target.id === "decrement") {
    lengthInput.stepDown();
  }
  if (event.target.id === "increment") {
    lengthInput.stepUp();
  }
  passwordLength = lengthInput.value;
}

function updateLength(event) {
  const number = Math.floor(event.target.value);

  if (number >= 8 && number <= 20) {
    passwordLength = number;
  } else {
    alert("Password length must be between 8 and 20 characters.");
  }
  event.target.value = passwordLength;
}

function generatePassword() {
  const fnameValue = firstNameInput.value;
  const lnameValue = lastNameInput.value.toUpperCase();
  const numbers = "0123456789";
  const symbols = "@!#$%&~";

  let characters = fnameValue + lnameValue + numbers + symbols;
  characters = characters.split("");

  if (firstNameInput.value == "" || lastNameInput.value == "") {
    alert("Fill in the empty fields!");
  } else {
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      let randNum = Math.floor(Math.random() * characters.length);
      password += characters[randNum];
    }
    displayPassword.innerText = password;
    displayPassword.style.display = "block";
  }
}

// Copy and Paste Event Handlers
function autoCopy(ev) {
  let div = ev.target;
  // select the content of the div
  let select = document.getSelection();
  select.removeAllRanges();
  let range = document.createRange();
  range.selectNode(div.firstChild);
  select.addRange(range);

  // Tell the browser to do a copy;
  document.execCommand("copy");

  div.innerText = "copied!";

  setTimeout(() => {
    div.style.display = "none";
    firstNameInput.value = "";
    lastNameInput.value = "";
  }, 1500);
}
