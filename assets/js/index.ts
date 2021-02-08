var startButton = document.getElementById("start");
var timer = document.getElementById("timer");
var countdown = document.getElementById("countdown");
var quizTopic = document.getElementById("topics");
var ticker = 0;
var highscores = {};

// I don't wanna use XMLHTTPRqeusts for this just yet
// and jQuery intellisense isn't working
// so just hard code one of the files for now
var javascript = {
	"topicName": "JavaScript",
	"questions": [{
			"question": "Question 1",
			"choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
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
		if (seconds == 0) {
			console.log("Game over");
			clearInterval(ticker);
		}
		seconds--;
		if (seconds < 11)
			timer.style.color = "crimson";
		countdown.innerHTML = String(seconds);
	}, 1000);
}

function loadTopic(topic: string) {
	let filename: string = `${topic.toLowerCase().replace(" ", "-")}.json`;	
	console.log(filename);
}

interface QuestionModel {
	question: string;
	choices: string[];
	correctChoice: number;
}

function buildQuestion(data: QuestionModel): HTMLElement {
	// console.log(`Building question from model ${data}`);
	var element = document.createElement("div");

	var question = document.createElement("p");
	var choices = document.createElement("div");
	choices.className = "choices-block";

	question.innerText = data.question;

	for (let i = 0; i < data.choices.length; i++) {
		console.log(`${i+1}. ${data.choices[i]}`);

		let temp = document.createElement("button");
		temp.textContent = `${i+1}. ${data.choices[i]}`;

		choices.appendChild(temp);
	}

	element.appendChild(question);
	element.appendChild(choices);

	return element;
}

function startGame() {
	runTimer();
	loadTopic("JavaScript");
}

startButton.addEventListener("click", startGame);

function loadPage() {
	if (localStorage.getItem("highscores") === null) {
		localStorage.setItem("highscores", JSON.stringify({}));
	}
	highscores = JSON.parse(localStorage.getItem("highscores"));
}

loadPage();
