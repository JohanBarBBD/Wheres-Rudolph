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

  return true;
}

async function RegisterNewUser(){
  const UserName = document.getElementById('uname');
  const Password = document.getElementById('psw');
  const FirstName = document.getElementById('fname');
  const LastName = document.getElementById('lname');

  if(validatePassword()){
    try{
      const response = await fetch('https://ec2-13-246-95-10.af-south-1.compute.amazonaws.com:5000/register', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          username: UserName.value,
          password: Password.value,
          firstName: FirstName.value,
          lastName: LastName.value
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if(response.status === 200){
        window.location.href=`../login.html`;
      }
      if(response.status === 400){
        alert("Bad request: Invalid input");
      }
      if(response.status === 409){
        alert("User exists");
      }
    } catch(err){
      alert("Technical error");
    }
  }
}