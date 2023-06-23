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

function endGame() {
    endTimer();
    document.location.href = "result.html";
    console.log("rudolph found in" + timeElapsed + "seconds")
}

