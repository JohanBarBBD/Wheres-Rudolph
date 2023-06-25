
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

// This will need to call http://localhost://login
// with the body params of  { name: username, username: username, admin: false }

async function loginButtonHandler() {
  if (validatePassword()) {
    const username = document.getElementById('uname');
    const password = document.getElementById('psw');

    //THIS IS TEMPORARY WILL NEED TO CALL OUR REAL AUTH PROVIDER AND AUTHENTICATE USER FIRST. 
    //THIS JUST JUMPS STRAIGHT TO THE JWT CREATION.
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          name: username.value,
          username: username.value,
          admin: false
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const myJson = await response.json();

    sessionStorage.setItem('token',myJson);
    window.location.href=`./pages/main.html`;
  } catch(err){
    console.log(`${err} ITS FUCKED`);
  }
};

}
