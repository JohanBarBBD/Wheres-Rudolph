async function populateBestTime(){

  try{
    showLoadingAnimation()

    const response = await fetch(`${apiUrl}/score`, {
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
    hideLoadingAnimation()

  }catch(err){
    hideLoadingAnimation()

    alert("Technical error try again later.")
  }
}



async function populateLeaderboard(){
  try{
    showLoadingAnimation()

    const response = await fetch(`${apiUrl}/leaderboard`, {
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
      hideLoadingAnimation()

  }catch(err){
    hideLoadingAnimation()

    alert("Technical error try again later.")
  }

}

window.addEventListener('load', async() =>{
  if(!sessionStorage.getItem('token')){
    window.location.href='../login.html';
  }else{
    try{
      showLoadingAnimation()
      const response = await fetch(`${authUrl}/verify`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      if(response.status !== 200){
        hideLoadingAnimation()
        window.location.href='../login.html';
      }else{
        hideLoadingAnimation()
        populateLeaderboard();
        populateBestTime();
      }
    }catch(error){
      hideLoadingAnimation()
      window.location.href='../login.html';  
    }
  }
});