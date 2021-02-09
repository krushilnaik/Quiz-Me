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

var runningScore: number = 0;
var quizQuestions: QuizModel;

/**
 * This will be used in conjunction with setInterval()
 * to make clearInterval callable from anywhere in the code.
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

		if (countdown.innerText === "0") {
			console.log("Game over");
			clearInterval(ticker);
		} else if (Number(countdown.innerText) < 11) {
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
	container.innerHTML += `<p class='score-report'>Your final score is ${runningScore}</p>`;
	container.innerHTML += `
		<div class="score-submission">
			<label for="initials">Enter Initials</label>
			<input type="text" name="initials">
		</div>
	`;

	var form = container.querySelector(".score-submission");
	var input = form.querySelector("input");

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

	form.appendChild(submitButton);
	container.appendChild(form);
}


/**
 * Check the player's choice against the answer key.
 * @param userChoice which choice the user clicked on
 * @param questionNumber what question number they're on
 */
function checkAnswer(userChoice: HTMLButtonElement, questionNumber: number) {
	let choiceIndex: number = Number(userChoice.innerText[0]) - 1;
	let correctChoice: number = quizQuestions.questions[questionNumber].correctChoice;

	let response: string = "Correct!";

	if (choiceIndex !== correctChoice) {
		countdown.innerText = String(Number(countdown.innerText) - 10);
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


/**
 * Render the question and its choices into the DOM.
 * @param questionNumber the question number the player is on
 */
function buildQuestion(questionNumber: number): HTMLElement {
	var element = document.createElement("div");

	var currentQuestion: QuestionModel = quizQuestions.questions[questionNumber];
	element.innerHTML = `
		<p>${currentQuestion.question}</p>
	`;

	var choices = document.createElement("div");
	choices.className = "choices-block";

	for (let i = 0; i < currentQuestion.choices.length; i++) {
		let choice = document.createElement("button");
		choice.textContent = `${i+1}. ${currentQuestion.choices[i]}`;
		choice.className = "choice";

		choice.addEventListener("click", function() {checkAnswer(this, questionNumber);});

		choices.appendChild(choice);
	}

	element.appendChild(choices);

	return element;
}


/**
 * Look at the selected topic and build the quiz.
 */
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


/**
 * Initialize highscores in localStorage
 * if it doesn't already exist.
 */
function loadPage() {
	if (localStorage.getItem("highscores") === null) {
		localStorage.setItem("highscores", JSON.stringify({}));
	}
}


/**
 * Main Code starts here.
 */
startButton.addEventListener("click", startGame);
loadPage();
