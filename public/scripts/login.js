
function showInvalidMessage(message) {
  let snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
  snackbar.innerText = message;
  setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); snackbar.innerText = ""; }, 3000);
}

function checkPassword(password) {
  const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const upperCase = /[A-Z]/;
  const characterRepeat = /(.)\1{2,}/;
  const lowerCase = /[a-z]/ ;
  let message = "";

  if (password.length < 10) {
    message = "Input password longer than 10 characters";
  } else if (password.length > 128) {
    message = "Input password less than 128 characters";
  } else if (password.match(/\d/) === null) {
    message = "Include digit in password";
  } else if (!specialCharacters.test(password)) {
    specialCharacters.test(password)
    message = "Include special character in password";
  } else if (!upperCase.test(password)) {
    message = "Include an upper case character in password";
  } else if (!lowerCase.test(password)) {
    message = "Include lower case character in password";
  } else if (password.match(characterRepeat) !== null) {
    message = "Do not consecutively repeat characters more than 3 times"
  }

  return message;
}

function validateInput() {
  let message = "";

  const username = document.getElementById("uname").value;
  const password = document.getElementById("psw").value;

  if (username === "") {
    message = "Input username";
  } else {
    message = checkPassword(password);
  }

  if (message !== "") {
    showInvalidMessage(message);
    return false;
  }

  return true;
}

// This will need to call http://localhost://login
// with the body params of  { name: username, username: username, admin: false }

const { userExists, newUserInfo } = require( "../../Backend/services/databaseHandler" );

async function gitHublogin(){
  try{
    await fetch('https://github.com/login/oauth/authorize?' + new URLSearchParams({
      client_id: '49cb04e7c492a9b174dc',
      redirect_uri: 'http://localhost:3000/authenticateUser',
      scope: 'user'
    }), {
      method: "GET",
      Headers: {
        "Access-Control-Allow-Origin": '*'
      }
    })

  }catch(err){
    console.log(err);
  }
}
async function loginButtonHandler(){
  const username = document.getElementById('uname');
  const password = document.getElementById('psw');
  if(validateInput()){
  try{
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const myJson = await response.json();

    if(response.status === 200){
      const WheresRudolphLogin = await fetch('http://localhost:8080/login', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          username: username.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if(WheresRudolphLogin.status === 200){
        sessionStorage.setItem('token',myJson);
        window.location.href=`./pages/main.html`;
      }
    }
    else{
     alert("Invalid username or password");
   }
  } catch(err){
    alert("Technical error, try again later.")
  }
}
};

