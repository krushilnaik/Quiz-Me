var startButton = document.getElementById("start");
var timer = document.getElementById("timer");
var countdown = document.getElementById("countdown");
var container = document.querySelector(".container");
var quizTopic = document.querySelector("select");
var runningScore = 0;
var quizQuestions;
/**
 * This will be used in conjunction with setInterval()
 * to make clearInterval() callable from anywhere in the code.
 */
var ticker = 0;
/**
 * Run the countdown when the player hits start.
 */
function runTimer() {
    clearInterval(ticker);
    timer.style.color = "green";
    countdown.innerText = "60";
    ticker = setInterval(function () {
        countdown.innerText = String(Number(countdown.innerText) - 1);
        if (Number(countdown.innerText) <= 0) {
            console.log("Game over");
            clearInterval(ticker);
            submissionForm();
        }
        else if (Number(countdown.innerText) < 11) {
            timer.style.color = "crimson";
        }
        countdown.innerHTML = String(countdown.innerText);
    }, 1000);
}
/**
 * Generate a form for the player to enter their initials
 * and have their score be added to the highscores page.
 */
function submissionForm() {
    // reset element
    container.innerHTML = "";
    // build the "form"
    container.innerHTML += "<h1>All done!</h1>";
    container.innerHTML += "<p class='score-report'>Your final score is " + runningScore + "</p>";
    container.innerHTML += "\n\t\t<div class=\"score-submission\">\n\t\t\t<label for=\"initials\">Enter Initials</label>\n\t\t\t<input type=\"text\" name=\"initials\">\n\t\t</div>\n\t";
    var form = container.querySelector(".score-submission");
    var input = form.querySelector("input");
    // add "submit score" button
    var submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.className = "submit";
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (input.value === "") {
            alert("Please provide initials");
            return;
        }
        var storedScores = localStorage.getItem("highscores");
        var highscores;
        if (storedScores === "") {
            highscores = [];
        }
        else {
            highscores = storedScores.split(",");
        }
        var topic = quizTopic.options[quizTopic.selectedIndex].value;
        highscores.push("Quiz '" + topic + "': " + input.value + " - " + runningScore);
        localStorage.setItem("highscores", highscores.toString());
        // redirect player to the highscores page
        window.location.replace("highscores.html");
    });
    form.appendChild(submitButton);
    container.appendChild(form);
}
/**
 * Check the player's choice against the answer key,
 * then moves on to the next question.
 * If that was the last question, bring up the score submission form.
 * @param userChoice which choice the user clicked on
 * @param questionNumber what question number they're on
 */
function checkAnswer(userChoice, questionNumber) {
    var choiceIndex = Number(userChoice.innerText[0]) - 1;
    var correctChoice = quizQuestions.questions[questionNumber].correctChoice;
    var response = "Correct!";
    if (choiceIndex !== correctChoice) {
        // chop off nine seconds, plus one from already-running setInterval()
        countdown.innerText = String(Number(countdown.innerText) - 9);
        response = "Wrong!";
    }
    else {
        runningScore++;
    }
    container.appendChild(document.createElement("hr"));
    container.append(response);
    setTimeout(function () {
        if (questionNumber === quizQuestions.questions.length - 1) {
            clearInterval(ticker);
            submissionForm();
            return;
        }
        else {
            container.innerHTML = "";
            container.appendChild(buildQuestion(questionNumber + 1));
        }
    }, 300);
}
/**
 * Render the question and its choices into the DOM.
 * @param questionNumber the question number the player is on
 */
function buildQuestion(questionNumber) {
    var element = document.createElement("div");
    var currentQuestion = quizQuestions.questions[questionNumber];
    element.innerHTML = "\n\t\t<p>" + currentQuestion.question + "</p>\n\t";
    var choices = document.createElement("div");
    choices.className = "choices-block";
    // populate the multiple choices on the question page
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = document.createElement("button");
        choice.textContent = i + 1 + ". " + currentQuestion.choices[i];
        choice.className = "choice";
        choice.addEventListener("click", function () { checkAnswer(this, questionNumber); });
        choices.appendChild(choice);
    }
    element.appendChild(choices);
    return element;
}
/**
 * Look at the selected topic and build the quiz.
 */
function startGame() {
    var topic = quizTopic.options[quizTopic.selectedIndex].value;
    var filename = topic.toLowerCase().replace(/ /g, "-") + ".json";
    var xhr = new XMLHttpRequest();
    // try pulling the quiz file corresponding to the selected topic
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // get the JSON opject and put it in a global variable
                quizQuestions = JSON.parse(xhr.responseText);
                // clear the page and show the first question
                container.innerHTML = "";
                container.appendChild(buildQuestion(0));
                runTimer();
            }
        }
    };
    // write and send the request
    xhr.open("GET", "assets/json/" + filename);
    xhr.send();
}
/**
 * Initialize highscores in localStorage
 * if it doesn't already exist.
 */
function loadPage() {
    if (localStorage.getItem("highscores") === null) {
        localStorage.setItem("highscores", "");
    }
}
/**
 * Main Code starts here.
 */
startButton.addEventListener("click", startGame);
loadPage();
