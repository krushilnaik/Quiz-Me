var startButton = document.getElementById("start");
var timer       = document.getElementById("timer");
var countdown   = document.getElementById("countdown");
var container   = document.querySelector(".container");
var quizTopic   = document.querySelector("select");

interface QuestionModel {
	question: string;
	choices: string[];
	correctChoice: number;
}

interface QuizModel {
	topicName: string;
	questions: QuestionModel[];
}

var highscores = {};
var runningScore: number = 0;
var quizQuestions: QuizModel;

// this will be used in conjunction with runTimer()
// to make clearInterval callable anywhere in the code
var ticker = 0;

function runTimer() {
	clearInterval(ticker);
	timer.style.color = "green";
	countdown.innerText = "60";
	let seconds = Number(countdown.innerText);
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

function submissionForm() {
	container.innerHTML = "";

	var completionMessage = document.createElement("h1");
	completionMessage.innerText = "All done!";

	var scoreMessage = document.createElement("p");
	scoreMessage.innerText = `Your final score is ${runningScore}`;
	scoreMessage.className = "score-report";

	var form = document.createElement("div");
	form.className = "score-submission";

	var input = document.createElement("input");
	input.name = "initials";

	var label = document.createElement("label");
	label.htmlFor = "initials";
	label.innerText = "Enter Initials";

	var submitButton = document.createElement("button");
	submitButton.innerText = "Submit";
	submitButton.className = "submit";

	submitButton.addEventListener("click", function(event) {
		event.preventDefault();

		if (input.value === "") {
			alert("Please provide initials");
			return;
		}

		var highscores = JSON.parse(localStorage.getItem("highscores"));

		highscores[input.value] = runningScore;

		localStorage.setItem("highscores", JSON.stringify(highscores));
		window.location.replace("highscores.html");
	});

	form.appendChild(label);
	form.appendChild(input);
	form.appendChild(submitButton);

	container.appendChild(completionMessage);
	container.appendChild(scoreMessage);
	container.appendChild(form);
}

function checkAnswer(userChoice: HTMLButtonElement, questionNumber: number) {
	let choiceIndex: number = Number(userChoice.innerText[0]) - 1;
	let correctChoice: number = quizQuestions.questions[questionNumber].correctChoice;

	let response: string = "Correct!";

	if (choiceIndex !== correctChoice) {
		countdown.innerText = String(Number(countdown.innerText) - 3);
		response = "Wrong!";
	} else {
		runningScore++;
	}

	container.appendChild(document.createElement("hr"));
	container.append(response);

	setTimeout(() => {
		if (questionNumber === quizQuestions.questions.length - 1) {
			clearInterval(ticker);
			submissionForm();
			return;
		} else {
			container.innerHTML = "";
			container.appendChild(
				buildQuestion(questionNumber + 1)
			);
		}
	}, 300);
}

function buildQuestion(questionNumber: number): HTMLElement {
	var element = document.createElement("div");

	var currentQuestion: QuestionModel = quizQuestions.questions[questionNumber];

	var questionElement = document.createElement("p");
	var choices = document.createElement("div");
	choices.className = "choices-block";

	questionElement.innerText = currentQuestion.question;

	for (let i = 0; i < currentQuestion.choices.length; i++) {
		let choice = document.createElement("button");
		choice.textContent = `${i+1}. ${currentQuestion.choices[i]}`;
		choice.className = "choice";

		choice.addEventListener("click", function() {checkAnswer(this, questionNumber);});

		choices.appendChild(choice);
	}

	element.appendChild(questionElement);
	element.appendChild(choices);

	return element;
}

function startGame() {
	let topic: string = quizTopic.options[quizTopic.selectedIndex].value;
	let filename: string = `${topic.toLowerCase().replace(/ /g, "-")}.json`;
	console.log(filename);

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				console.log(xhr.responseText);

				quizQuestions = JSON.parse(xhr.responseText);

				container.innerHTML = "";
				container.appendChild(
					buildQuestion(0)
				);

				runTimer();
			}
		}
	}

	xhr.open("GET", `assets/json/${filename}`);
	xhr.send();
}

function loadPage() {
	if (localStorage.getItem("highscores") === null) {
		localStorage.setItem("highscores", JSON.stringify({}));
	}
	highscores = JSON.parse(localStorage.getItem("highscores"));
}

startButton.addEventListener("click", startGame);

loadPage();
