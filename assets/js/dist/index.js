var startButton = document.getElementById("start");
var timer = document.getElementById("timer");
var countdown = document.getElementById("countdown");
var container = document.querySelector(".container");
var quizTopic = document.getElementById("topics");
var highscores = {};
// this will be used in conjunction with runTimer()
// to make clearInterval callable anywhere in the code
var ticker = 0;
// I don't wanna use XMLHTTPRqeusts for this just yet
// and jQuery intellisense isn't working
// so just hard code one of the files for now
var javascript = {
    "topicName": "JavaScript",
    "questions": [
        {
            "question": "Question 1",
            "choices": ["Choice 1", "Choice 2", "This will be choice 3", "Choice 4"],
            "correctChoice": 0
        },
        {
            "question": "Question 2",
            "choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
            "correctChoice": 1
        },
        {
            "question": "Question 3",
            "choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
            "correctChoice": 2
        },
        {
            "question": "Question 4",
            "choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
            "correctChoice": 3
        }
    ]
};
function runTimer() {
    clearInterval(ticker);
    timer.style.color = "green";
    countdown.innerText = "16";
    var seconds = Number(countdown.innerText);
    ticker = setInterval(function () {
        seconds--;
        if (seconds == 0) {
            console.log("Game over");
            clearInterval(ticker);
        }
        if (seconds < 11)
            timer.style.color = "crimson";
        countdown.innerHTML = String(seconds);
    }, 1000);
}
// function loadTopic(topic: string) {
// 	let filename: string = `${topic.toLowerCase().replace(" ", "-")}.json`;
// }
function checkAnswer(userChoice, questionNumber) {
    var choiceIndex = Number(userChoice.innerText[0]) - 1;
    var correctChoice = javascript.questions[questionNumber].correctChoice;
    var response = "Correct!";
    if (choiceIndex !== correctChoice) {
        countdown.innerText = String(Number(countdown.innerText) - 3);
        response = "Wrong!";
    }
    container.appendChild(document.createElement("hr"));
    container.append(response);
    setTimeout(function () {
        if (questionNumber === javascript.questions.length - 1) {
            clearInterval(ticker);
            return;
        }
        else {
            container.innerHTML = "";
            container.appendChild(buildQuestion("JavaScript", questionNumber + 1));
        }
    }, 300);
}
function buildQuestion(topicName, questionNumber) {
    console.log("Building " + topicName + " question " + (questionNumber + 1));
    var element = document.createElement("div");
    var data = javascript.questions[questionNumber];
    var question = document.createElement("p");
    var choices = document.createElement("div");
    choices.className = "choices-block";
    question.innerText = data.question;
    for (var i = 0; i < data.choices.length; i++) {
        console.log(i + 1 + ". " + data.choices[i]);
        var temp = document.createElement("button");
        temp.textContent = i + 1 + ". " + data.choices[i];
        temp.className = "choice";
        temp.addEventListener("click", function () { checkAnswer(this, questionNumber); });
        choices.appendChild(temp);
    }
    element.appendChild(question);
    element.appendChild(choices);
    return element;
}
function startGame() {
    // let questions: QuestionModel[] = javascript.questions;
    var qIndex = 0;
    var topic = "JavaScript";
    container.innerHTML = "";
    container.appendChild(buildQuestion(topic, qIndex));
    runTimer();
}
startButton.addEventListener("click", startGame);
function loadPage() {
    if (localStorage.getItem("highscores") === null) {
        localStorage.setItem("highscores", JSON.stringify({}));
    }
    highscores = JSON.parse(localStorage.getItem("highscores"));
}
loadPage();
