const apiUrl ="https://fery43gfzh.us-east-1.awsapprunner.com"
const authUrl = "https://8q6pijzt5y.us-east-1.awsapprunner.com"

function showLoadingAnimation() {
    var loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.display = "flex";
}
  
  
function hideLoadingAnimation() {
    var loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.display = "none";
}