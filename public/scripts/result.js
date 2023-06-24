function onLoadFunc(){
  document.getElementById('gameScore').innerText=`${sessionStorage.getItem('result')} seconds`;
}

onLoadFunc();

function clearSession(){
  sessionStorage.removeItem('result');
}

window.addEventListener('load',() =>{
  if(!sessionStorage.getItem('token')){
    window.location.href='login.html';
  }
});
