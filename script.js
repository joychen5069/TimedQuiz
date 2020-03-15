var timeEl = document.querySelector(".time");
var msgDiv = document.querySelector("#msg");
var userInput = document.querySelector("#user-init")
var userScore = document.querySelector("#user-scores")


// userInput.textContent = username;
// userScore.textContent = userscore;

var MyQuestions = [
    {
        question: "What?",
        answers: [
             "1",
            "2",
             "3",
        ],
        correctAnswer: "3"
    },
    {
        question: "When?",
        answers: [
            "what?",
            "who?",
             "no",
        ],
        correctAnswer: "no"
    }
]

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  }

var questionIndex = 0

//score starts at 60
var secondsLeft = 6

//quiz should take 60 seconds (fix it later)
function setTime() {
    timeEl.textContent = "time left: " + secondsLeft
    var timerInterval = setInterval(function () {
        console.log("timerInterval:", timerInterval);

        if (questionIndex >= MyQuestions.length) {
            $("#score").append("Your score is " + secondsLeft)
            clearInterval(timerInterval)
            console.log(secondsLeft)
        }

        else {
            secondsLeft--;
            timeEl.textContent = "time left: " + secondsLeft;
        }

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
      }, 1000);
}

//if time runs out, alert the user
function sendMessage() {
    if (secondsLeft === 0)
        $("#results").append("You failed to complete the quiz. Refresh and try again")
        $("#submit").hide();
        $("#questions").html("")
        $("#answers").html("")
}

//the faster the user completes the quiz, the higher their score (aka their score is the number of seconds left)

//five question quiz INPUT ACTUAL QUESTIONS LATER
//figure out how to go from question 1 to question 2 and so forth
function AskQuestion() {
    var Question = MyQuestions[questionIndex];

    $("#questions").append(Question.question)
    
    var answersHtml = ""
    console.log(Question.answers.length)
    for (var i = 0; i < Question.answers.length; i++) {
        answersHtml+= `<label class="btn btn-secondary">
        <input type="radio" name="options" id="option${i+1}" value="${Question.answers[i]}"
        > ${Question.answers[i]}
      </label>`;
    }
    $("#answers").append(answersHtml)
}

//submit button, can only move onto the next question if they get it right
$("#submit").on("click", function() { 
    console.log('button was clicked')
    var checked = $("input[name='options']:checked").val();
    console.log(checked);
    // console.log(CorAn);

    //when you click submit, if the user gets the question right, continue to the next question
    if (checked === MyQuestions[questionIndex].correctAnswer) {
        questionIndex++

        //if user completes questions
        if (questionIndex >= MyQuestions.length) {
            //show results
           $("#results").append("Congrats. You've finished!");
           $("#save").show();
           $("#form").show();

           //hide button, and questions
           $("#submit").hide();
           $("#questions").html("")
           $("#answers").html("")
        }
        else { 
            //clear divs and append new questions
            $("#questions").html("")
            $("#answers").html("")
            AskQuestion();
        }
    }
    else {
        //if user fails to get question right, DING them and keep question on page
    }
    }

)

//ability to start quiz, take away intro once quiz starts
$("#start").on("click", function() {
    setTime();
   $("#submit").show();
    AskQuestion(0);
    $("#start").hide();
    $("#intro").hide();
})

//hide submit button, save button, and form when page loads
$(document).ready(function() {
    // $("#submit").hide();
    // $("#save").hide();
    // $("#name").hide();
    // $("#high-scores").hide();
});

//save the user's score
// function renderLast() {
//     var name = localStorage.getItem("name")
      
//     if (name === null) {
//       return
//     }


$("#save").on("click", function(event) {
    var initials = document.querySelector("#name").value;
    //if user doesnt input text, send error
    if (initials === ""){
        displayMessage("error", "cannot be blank")
    }

//save score to localStorage and put into highscore board
localStorage.setItem("initials" , initials);
localStorage.setItem("score" , secondsLeft);
var highscore = [initials + " "+ secondsLeft];
localStorage.setItem("#user-scores", JSON.stringify(highscore));
var board = JSON.parse(localStorage.getItem("#user-scores"));

$("#user-scores").append(board)
})

//create the ability to retry
$("#retest").on("click", function() {
    document.location.reload();
})
//create the ability to see the scores