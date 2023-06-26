async function RegisterNewUser(){
  const UserName = document.getElementById('uname');
  const Password = document.getElementById('psw');
  const FirstName = document.getElementById('fname');
  const LastName = document.getElementById('lname');

  try{
    const response = await fetch('https://localhost:5000/register', {
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