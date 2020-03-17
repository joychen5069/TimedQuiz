//set variables
var timeEl = document.querySelector(".time");
var msgDiv = document.querySelector("#msg");
var userScore = document.querySelector("#user-scores");
var wrong = document.createElement("audio");
var right = document.createElement("audio");
wrong.setAttribute("src", "assets/bad-beep.mp3");
right.setAttribute("src", "assets/good-beep.wav");

//create question list
var MyQuestions = [
    {
        question: "Which of the following is the correct way to indicate an array? ",
        answers: [
            "( )",
            "{ }",
            "[ ]",
            "< >",
        ],
        correctAnswer: "[ ]"
    },
    {
        question: "What does Math.random() return?",
        answers: [
            "A random number from 1 to infinity",
            "A random number from 0 to whatever number you place inside ()",
            "A random number from -infinty to infinity",
            "A random number from 0 to 1",
        ],
        correctAnswer: "A random number from 0 to 1"
    },
    {
        question: "What operator do you use to depict 'equal value and equal type'?",
        answers: [
            "=",
            "===",
            "=",
            "!=",
        ],
        correctAnswer: "==="
    },
    {
        question: "Where should JavaScript be added in an HTML?",
        answers: [
            "Wherever you want!",
            "Before < body >",
            "At the end, before < /body >",
            "In the <head>",
        ],
        correctAnswer: "At the end, before < /body >"
    },
    {
        question: "True or False: Javascript MUST be written in HTML and cannot be its own external file",
        answers: [
            "True: you have to have all of your code in one file",
            "False: You can have an external JS file if you want",
        ],
        correctAnswer: "False: You can have an external JS file if you want"
    },
]

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
}

var questionIndex = 0

//score starts at 60
var secondsLeft = 60

//quiz should take 60 seconds
function setTime() {
    timeEl.textContent = "Time Left: " + secondsLeft
    var timerInterval = setInterval(function () {
        console.log("timerInterval:", timerInterval);

        if (questionIndex >= MyQuestions.length) {
            clearInterval(timerInterval)
            console.log(secondsLeft)
        }

        else {
            secondsLeft--;
            timeEl.textContent = "Time Left: " + secondsLeft;
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
        wrong.play();
    $("#results").append("You failed to complete the quiz. Refresh and try again")
    $("#submit").hide();
    $("#questions").html("")
    $("#answers").html("")
}

//five question quiz
//how to go from question 1 to question 2 and so forth
function AskQuestion() {
    var Question = MyQuestions[questionIndex];

    $("#questions").append(Question.question)

    var answersHtml = ""
    console.log(Question.answers.length)
    for (var i = 0; i < Question.answers.length; i++) {
        answersHtml += `<label class="btn btn-secondary">
        <input type="radio" name="options" id="option${i + 1}" value="${Question.answers[i]}"
        > ${Question.answers[i]}
      </label>`;
    }
    $("#answers").append(answersHtml)
}

//submit button, can only move onto the next question if they get it right
$("#submit").on("click", function () {
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
            right.play();
            $("#results").append("Congrats. You've finished!");
            $("#score").append("Your score is " + secondsLeft)
            $("#save").show();
            $("#form").show();
            $("#name").show();

            //hide button, and questions
            $("#submit").hide();
            $("#questions").html("")
            $("#answers").html("")
        }
        else {
            //clear divs and append new questions
            right.play();
            $("#questions").html("");
            $("#answers").html("");
            AskQuestion();
        }
    }
    else { //take away a second if they get it wrong
        wrong.play();
        secondsLeft--
    }
})

//ability to start quiz, take away intro once quiz starts
$("#start").on("click", function () {
    setTime();
    $("#submit").show();
    AskQuestion(0);
    $("#start").hide();
    $(".intro").hide();
})

//hide submit button, save button, and form when page loads
$(document).ready(function () {
    $("#submit").hide();
    $("#save").hide();
    $("#name").hide();
    $("#high-scores").hide();
    // $("#buttonHigh").hide();
    $("#retest").hide();
    $("#reset").hide();

    //load high score board
    if (localStorage.getItem("#user-scores") === null) {
        var board = []
    }
});

//creat score sections
$("#save").on("click", function (event) {
    $("#high-scores").show();
    $("#retest").show();
    var initials = document.querySelector("#name").value;
    //if user doesnt input text, send error
    if (initials === "") {
        displayMessage("error", "Cannot Be Blank");
        $("#high-scores").hide();
    }
    //create an empty array if user-score is empty 
    else if (localStorage.getItem("#user-scores") === null) {
        var board = []
    }
    else {
        var board = JSON.parse(localStorage.getItem("#user-scores"));
    }

    var highscore = secondsLeft + "  " + initials;
    board.push(highscore)
    localStorage.setItem("#user-scores", JSON.stringify(board));
    console.log(board) //make sure it gets added to list
    // $("#user-scores").append(board);

    var ul = document.createElement("ul");
    document.getElementById("user-scores").appendChild(ul);

    board.forEach(function (board) {
        var li = document.createElement("li");
        ul.append(li);
        li.innerHTML += board;
    });

    $("#save").hide();
    $("#reset").show();
});

$("#reset").on("click", function () {
    localStorage.clear();
})

//create the ability to retry
$("#retest").on("click", function () {
    document.location.reload();
})