// This will need to call http://localhost://login
// with the body params of  { name: username, username: username, admin: false }

async function loginButtonHandler(){
  const username = document.getElementById('uname');
  const password = document.getElementById('psw');

  //THIS IS TEMPORARY WILL NEED TO CALL OUR REAL AUTH PROVIDER AND AUTHENTICATE USER FIRST. 
  //THIS JUST JUMPS STRAIGHT TO THE JWT CREATION.
  try{
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
  } catch(err){
    console.log('ITS FUCKED');
  }
};

