function onLoadFunc(){
  document.getElementById('gameScore').innerText=`${sessionStorage.getItem('result')} seconds`;
}

onLoadFunc();

function clearSession(){
  sessionStorage.removeItem('result');
}