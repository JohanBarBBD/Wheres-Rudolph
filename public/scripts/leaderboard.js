async function populateBestTime(){

  try{
    const response = await fetch('https://localhost:8080/score', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      const myJson = await response.json();
    
    if(document.getElementById('scoreValue')){
      document.getElementById('scoreValue').innerText=`Your best time is: ${myJson?.HighScore} seconds`;  
    }
  }catch(err){
    alert("Technical error try again later.")
  }
}



async function populateLeaderboard(){
  try{
    const response = await fetch('https://localhost:8080/leaderboard', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      const myJson = await response.json();
      let list = document.getElementById('leaderList');
      for(let i =0; i< myJson.length && i<5; i++){
        let listItem = document.createElement('li');
        listItem.innerText=`${myJson[i]?.username}: ${myJson[i]?.highscore} seconds`;
        list.appendChild(listItem);
      }
  }catch(err){
    alert("Technical error try again later.")
  }

}

window.addEventListener('load', async() =>{
  if(!sessionStorage.getItem('token')){
    window.location.href='../login.html';
  }else{
    try{
      const response = await fetch('http://localhost:5000/verify', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      if(response.status !== 200){
        window.location.href='../login.html';
      }else{
        populateLeaderboard();
        populateBestTime();
      }
    }catch(error){
      window.location.href='../login.html';  
    }
  }
});