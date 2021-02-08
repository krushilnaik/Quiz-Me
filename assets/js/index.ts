var startButton = document.getElementById("start");
var timer       = document.getElementById("timer");
var countdown   = document.getElementById("countdown");
var container   = document.querySelector(".container");
var quizTopic   = document.getElementById("topics");

var ticker = 0;
var highscores = {};

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

function checkAnswer(userChoice: HTMLButtonElement, questionNumber: number) {
	let choiceIndex: number = Number(userChoice.innerText[0]) - 1;
	let correctChoice: number = javascript.questions[questionNumber].correctChoice;

	if (choiceIndex !== correctChoice) {
		countdown.innerText = String(Number(countdown.innerText) - 5);
	}

	if (questionNumber === javascript.questions.length - 1) {
		return;
	} else {
		container.innerHTML = "";
		container.appendChild(
			buildQuestion("JavaScript", questionNumber + 1)
		);
	}
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
