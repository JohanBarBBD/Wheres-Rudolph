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
};


