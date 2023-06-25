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

window.addEventListener('load',() =>{
  if(!sessionStorage.getItem('token')){
    window.location.href='../login.html';
  }
});

async function populateLeaderboard(){
  try{
    const response = await fetch('http://localhost:8080/leaderboard', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      const myJson = await response.json();
      console.log(myJson);
      let list = document.getElementById('leaderList');
      for(let i =0; i< myJson.length || i<5; i++){
        let listItem = document.createElement('li');
        console.log(listItem);
        listItem.innerText=`${myJson[i].username}: ${myJson[i].highscore} seconds`;
        list.appendChild(listItem);
      }
  }catch(err){
    console.log(err);
  }

}

populateBestTime();
populateLeaderboard();