var timeEl = document.querySelector(".time")

//score starts at 60
var secondsLeft = 60


//quiz should take 60 seconds
function setTime() {
var timerInterval = setInterval(function() {
    console.log("timerInterval:", timerInterval);
    secondsLeft--;
    timeEl.textContent = "score: " + secondsLeft; 

    if (secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
    }

}, 1000) ;
}
setTime();

//if time runs out, alert the user
function sendMessage() {
    
}

//the faster the user completes the quiz, the higher their score (aka their score is the number of seconds left)

//five question quiz

//create the ability to retake the quiz

//create the ability to reset the scores

//create the ability to see the scores