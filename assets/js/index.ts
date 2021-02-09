var startButton = document.getElementById("start");
var timer       = document.getElementById("timer");
var countdown   = document.getElementById("countdown");
var container   = document.querySelector(".container");
var quizTopic   = document.getElementById("topics");

var highscores = {};
var runningScore: number = 0;
var quizQuestions: QuizModel;

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

// function loadTopic(topic: string) {
// 	let filename: string = `${topic.toLowerCase().replace(" ", "-")}.json`;
// }

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
	let correctChoice: number = javascript.questions[questionNumber].correctChoice;

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
		if (questionNumber === javascript.questions.length - 1) {
			clearInterval(ticker);
			submissionForm();
			return;
		} else {
			container.innerHTML = "";
			container.appendChild(
				buildQuestion("JavaScript", questionNumber + 1)
			);
		}
	}, 300);
}

interface QuestionModel {
	question: string;
	choices: string[];
	correctChoice: number;
}

function buildQuestion(topicName: string, questionNumber: number): HTMLElement {
	console.log(`Building ${topicName} question ${questionNumber + 1}`);

	var element = document.createElement("div");

	var data: QuestionModel = javascript.questions[questionNumber];

	var question = document.createElement("p");
	var choices = document.createElement("div");
	choices.className = "choices-block";

	question.innerText = data.question;

	for (let i = 0; i < data.choices.length; i++) {
		console.log(`${i+1}. ${data.choices[i]}`);

		let temp = document.createElement("button");
		temp.textContent = `${i+1}. ${data.choices[i]}`;
		temp.className = "choice";

		temp.addEventListener("click", function() {checkAnswer(this, questionNumber);});

		choices.appendChild(temp);
	}

	element.appendChild(question);
	element.appendChild(choices);

	return element;
}

function startGame() {
	// let questions: QuestionModel[] = javascript.questions;
	let qIndex: number = 0;
	let topic: string = "JavaScript";

	container.innerHTML = "";
	container.appendChild(
		buildQuestion(topic, qIndex)
	);

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
