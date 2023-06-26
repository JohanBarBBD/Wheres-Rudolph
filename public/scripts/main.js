window.addEventListener('load', async () =>{
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