
async function loginButtonHandler(){
  const username = document.getElementById('uname');
  const password = document.getElementById('psw');

  try{
    showLoadingAnimation()
    const response = await fetch(`${authUrl}/login`, {
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
      const WheresRudolphLogin = await fetch(`${apiUrl}/login`, {
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
        hideLoadingAnimation()
        window.location.href=`./pages/main.html`;
      }
      hideLoadingAnimation()
    }
    else{
      hideLoadingAnimation()
     alert("Invalid username or password");
   }
  } catch(err){
    hideLoadingAnimation()
    alert("Technical error, try again later.")
  }
};


