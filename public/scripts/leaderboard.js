async function populateBestTime(){

  const response = await fetch('http://localhost:8080/score', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    const myJson = await response.json();
  
  document.getElementById('scoreValue').innerText=`Your best time is: ${myJson.HighScore} seconds`;
}

populateBestTime();