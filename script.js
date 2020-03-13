var timeEl = document.querySelector(".time")
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

var questionCounter = 0

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

var CorAn = MyQuestions[questionCounter].correctAnswer

//score starts at 120
var secondsLeft = 5


//quiz should take 120 seconds (fixed it later)
function setTime() {
    var timerInterval = setInterval(function () {
        console.log("timerInterval:", timerInterval);
        secondsLeft--;
        timeEl.textContent = "score: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
}


//if time runs out, alert the user
function sendMessage() {
    if (secondsLeft === 0)
        alert("You're out of time. Try again")
}

//the faster the user completes the quiz, the higher their score (aka their score is the number of seconds left)

//five question quiz INPUT ACTUAL QUESTIONS LATER

function QuestionLoop() {

    $("#quiz").append(MyQuestions[questionCounter].question)
    
    var answersHtml = ""
    console.log(MyQuestions[questionCounter].answers.length)
    for (var i = 0; i < MyQuestions[questionCounter].answers.length; i++) {
        answersHtml+= `<label class="btn btn-secondary">
        <input type="radio" name="options" id="option${i+1}" value="${MyQuestions[questionCounter].answers[i]}"
        > ${MyQuestions[questionCounter].answers[i]}
      </label>`;
    // console.log(answersHtml)   
    // console.log('inside loop') 
    }
    $("#answers").append(answersHtml)
    // console.log(answersHtml, "it works")
    questionCounter++
    // var CorAn = MyQuestions[i].correctAnswer
//submit button, can only move onto the next question if they get it right
$("#submit").on("click", function() {
    var checked = $("input[name='options']:checked").val()
    console.log(checked)
    console.log(CorAn)

     //see if they got the question right
    if (checked == CorAn){
        console.log("correct")
     //if they get it right, go on to the next question
        QuestionLoop();


    } 
    //If they get it wrong, do not go to the next question
    else { 
        console.log("Nope")
    }

}
)
}


//ability to start quiz, take away once quiz starts
$("#start").on("click", function() {
    // setTime();
    QuestionLoop();
    $("#start").hide();
})

//create the ability to retake the quiz

//create the ability to reset the scores

//create the ability to see the scores