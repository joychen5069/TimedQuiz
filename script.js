var timeEl = document.querySelector(".time")
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');

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
var Question = MyQuestions[questionCounter]
var CorAn = MyQuestions[questionCounter].correctAnswer
console.log(Question.answers.length)
//score starts at 60
var secondsLeft = 60


//quiz should take 60 seconds (fixed it later)
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
//figure out how to go from question 1 to question 2 and so forth
function QuestionLoop() {

    $("#question1").append(Question.question)
    
    var answersHtml = ""
    console.log(Question.answers.length)
    for (var i = 0; i < Question.answers.length; i++) {
        answersHtml+= `<label class="btn btn-secondary">
        <input type="radio" name="options" id="option${i+1}" value="${Question.answers[i]}"
        > ${Question.answers[i]}
      </label>`;

    }
    $("#answers1").append(answersHtml)

}

 questionCounter+=1
 console.log(questionCounter)

//submit button, can only move onto the next question if they get it right
$("#submit").on("click", function() { 
    console.log('button was clicked')
    var checked = $("input[name='options']:checked").val();
    console.log(checked);
    console.log(CorAn);

    for (i = 0; i < MyQuestions.length; i++) { 
        if (checked === CorAn){
            $("#question1").hide();
            $("#answers1").hide();
           console.log("correct");
            
          
        


        } 
        // If they get it wrong, do not go to the next question
        else { 
            console.log("Nope")
        }

    }
}
)




//ability to start quiz, take away intro once quiz starts
$("#start").on("click", function() {
    // setTime();
    QuestionLoop();
    $("#start").hide();
    $("#intro").hide();
})

//create the ability to retake the quiz

//create the ability to reset the scores

//create the ability to see the scores