
async function loginButtonHandler(){
  const username = document.getElementById('uname');
  const password = document.getElementById('psw');

  try{
    const response = await fetch(`${apiUrl}:8080/login`, {
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
      const WheresRudolphLogin = await fetch(`${apiUrl}:8080/login`, {
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

