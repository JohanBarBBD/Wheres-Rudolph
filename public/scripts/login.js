
function showInvalidMessage(message) {
  let snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
  snackbar.innerText = message;
  setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); snackbar.innerText = ""; }, 3000);
}


function validatePassword() {
  let message = "";
  const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const upperCase = /[A-Z]/
  const characterRepeat = /(.)\1{2,}/
  const lowerCase = /[a-z]/ 
  const username = document.getElementById("uname").value;
  const password = document.getElementById("psw").value;

 
  if (username === "") {
    message = "Input username";
  } else if (password.length < 10) {
    message = "Input password longer than 10 characters";
  } else if (password.length > 128) {
    message = "Input password less than 128 characters";
  } else if(password.match(/\d/)===null){
    message = "Include digit in password";
  } else if(!specialCharacters.test(password)){
    specialCharacters.test(password)
    message = "Include special character in password";
  } else if(!upperCase.test(password)){
    message = "Include an upper case character in password";
  } else if(!lowerCase.test(password)){
    message = "Include lower case character in password";
  }else if(password.match(characterRepeat)!==null){
    message = "Do not consecutively repeat characters more than 3 times"
  }

  if (message != "") {
    showInvalidMessage(message);
    return false;
  }

  return false;
}

async function loginButtonHandler(){
  const username = document.getElementById('uname');
  const password = document.getElementById('psw');

  try{
    const response = await fetch('https://localhost:5000/login', {
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
      const WheresRudolphLogin = await fetch('https://localhost:8080/login', {
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
};

