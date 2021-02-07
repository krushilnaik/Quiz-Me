var startButton: HTMLElement = document.getElementById("start");
var timer: HTMLElement = document.getElementById("timer");
var countdown: HTMLElement = document.getElementById("countdown");
var quizTopic = document.getElementById("topics");
var ticker: number = 0;

// I don't wanna use XMLHTTPRqeusts for this just yet
// and jQuery intellisense isn't working
// so just hard code one of the files for now
var javascript = {
	"topicName": "JavaScript",
	"questions": [
		{
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
}

function runTimer() {
	clearInterval(ticker);

	timer.style.color = "green";
	countdown.innerText = "16";
	let seconds = Number(countdown.innerText);

	ticker = setInterval(function() {
		if (seconds == 0) {
			console.log("Game over");
			return;
		}
		
		seconds--;

		if (seconds < 11) timer.style.color = "crimson";

		countdown.innerHTML = String(seconds);
	}, 1000);
}

// function loadTopic() {
// 	let filename = `${topic.toLowerCase().replace(" ", "-")}.json`;
// }

function startGame() {
	runTimer();
	// loadTopic();
}

startButton.addEventListener("click", startGame);
