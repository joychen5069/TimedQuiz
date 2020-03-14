var timeEl = document.querySelector(".time")
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');

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
var questionIndex = 0

//score starts at 60
var secondsLeft = 6


//quiz should take 60 seconds (fixed it later)
function setTime() {
    timeEl.textContent = "score: " + secondsLeft
    var timerInterval = setInterval(function () {
        console.log("timerInterval:", timerInterval);

        if (questionIndex >= MyQuestions.length) {
            $("#score").append("Your score is " + secondsLeft)
            clearInterval(timerInterval)
            console.log(secondsLeft)
        }

        else {
            secondsLeft--;
            timeEl.textContent = "score: " + secondsLeft;
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



//for each question in my list, loop
    // for (i = 0; i < MyQuestions.length; i++) { 
    //     var Question = MyQuestions[questionCounter]
    //     var CorAn = MyQuestions[questionCounter].correctAnswer
    //     if (checked === CorAn){
    //         $("#question1").hide();
    //         $("#answers1").hide();
    //        console.log("correct");
            
          
        


        // } 
        // // If they get it wrong, do not go to the next question
        // else { 
        //     console.log("Nope")
        // }

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

//hide submit button
$(document).ready(function() {
    $("#submit").hide();
});

//create the ability to retake the quiz

//create the ability to reset the scores

//create the ability to see the scores