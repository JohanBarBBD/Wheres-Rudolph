
let startTime, endtime, timeElapsed;

function startTimer() {
    startTime = new Date();
}

function endTimer() {
    endTime = new Date();
    timeElapsed = (endTime - startTime) / 1000; //getting time elapsed in seconds
    timeElapsed = Math.round(timeElapsed);
}
function setGame() {
    rudolphBtn = document.getElementById("rudolph-btn");
    randomNum = Math.random() * 90;
    rudolphBtn.style.top = randomNum + "%";
    rudolphBtn.style.left = randomNum + "%";
    rudolphBtn.style.display = "block";
    startTimer();
}

async function endGame() {
    endTimer();
    try{
      const response = await fetch(`${apiUrl}/score`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        score: timeElapsed
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
      if(response.status === 403 || response.status === 401){
        window.location.href = "../login.html";
      }
      sessionStorage.setItem('result', timeElapsed)
      window.location.href="result.html";
    }catch (err){
      alert("Technical error, try again later.")
    }
}

window.addEventListener('load',async () =>{

  if(!sessionStorage.getItem('token')){
    window.location.href='../login.html';
  }else{
    try{
      const response = await fetch(`${authUrl}/verify`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      if(response.status !== 200){
        window.location.href='../login.html';
      }
    }catch(error){
      window.location.href='../login.html';  
    }
  }
});

