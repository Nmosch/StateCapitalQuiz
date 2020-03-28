//Setting global variables
var timerElement = document.querySelector("#timer");
var startButton = document.getElementById("startButton");
var questionDiv = document.getElementById("questionDiv");
var secondsLeft = 120;
var highScoreInitials = document.getElementById("highScore");

highScoreInitials.classList.add("hidden");

//Initial display ofvar timer
timerElement.textContent = "Time: " + secondsLeft;

var index = 0
var setIntervalId;

console.log(questions)

function displayQuestions() {



    questionDiv.textContent = "";
    var questionTag = document.createElement("p");
    if (index < (questions.length)) {
        questionTag.textContent = questions[index].question

        questionDiv.appendChild(questionTag)
        var br = document.createElement("br");
        for (var i = 0; i < questions[index].choices.length; i++) {
            //Begins looping through questions
            var choicesTag = document.createElement("p");
            choicesTag.setAttribute("class", "choices");
            choicesTag.append(questions[index].choices[i]);
            choicesTag.addEventListener("click", function () {


                console.log("index;", index, " length;", questions.length)
                if (index < (questions.length)) {

                    var currentValue = this.textContent;
                    console.log("value;", currentValue);
                    console.log(questions[index].answer, currentValue);
                    //Removes 10 seconds from timer when question is incorrect
                    if (questions[index].answer !== currentValue) {
                        secondsLeft -= 10;

                        console.log("seconds left;", secondsLeft);

                        var pWrong = document.createElement("p");
                        pWrong.textContent = "You have choosen poorly";
                        questionDiv.appendChild(pWrong);
                    }
                    else {
                        var pCorrect = document.createElement("p");
                        pCorrect.textContent = "You have choosen wisely";

                        questionDiv.appendChild(pCorrect);
                    }


                    setTimeout(function () {
                        index++;
                        clearInterval(setIntervalId);

                        start();

                    }, 1000)

                }




            });
            questionDiv.appendChild(choicesTag);

        }
    }
    else {

        stopTimer();

    }


};

function stopTimer() {
    clearInterval(setIntervalId);
    console.log("stop");
    document.getElementById("timer").classList.add("hidden");
    document.getElementById("highScore").classList.remove("hidden");
    return;
}

function countdown() {
    //Timer countdown
    secondsLeft--;
    timerElement.textContent = "Time: " + secondsLeft;
    if (secondsLeft === 0) {
        clearInterval(setIntervalId)
    }
};

function start() {
    document.getElementById("startButton").classList.add("hidden");
    displayQuestions()
    setIntervalId = setInterval(countdown, 1000)
};

//Begins program with click of start button
startButton.addEventListener("click", function () {
    start()
});

document.getElementById("submit").addEventListener("click", function () {
    var initialsHighScore = document.getElementById("initials").value;
    localStorage.setItem("initials", initialsHighScore);
    localStorage.setItem("score", secondsLeft.toString());

    var storedScores = localStorage.getItem("score");
    var storedInitials = localStorage.getItem("initials");
    document.getElementById("displayHighScore").textContent = storedInitials + " " + storedScores;
    highScoreInitials.classList.add("hidden");

});

 