let scoresElement = document.getElementById("scores");

function loadScores() {
	scoresElement.innerHTML = "";

	if (localStorage.getItem("highscores") === "") {
		console.log("No scores found.");
		localStorage.setItem("highscores", "");
		return;
	}

	let scores = localStorage.getItem("highscores")
		.split(",").map(
			(rawString) => {
				let regex = /^'(.+)': (.+) - ([0-5])$/;
				let groups = rawString.split(regex).filter((str) => str !== "");
				return {
					quizName: groups[0],
					initials: groups[1],
					score: Number(groups[2])
				};
			}
		).sort(
			(a, b) => {
				if (a.quizName !== b.quizName) {
					return a.quizName < b.quizName ? -1 : 1;
				} else if (a.score !== b.score) {
					return a.score > b.score ? -1 : 1;
				} else if (a.initials !== b.initials) {
					return a.initials < b.initials ? -1 : 1;
				} else {
					return 0;
				}
			}
		)
	;

	if (scores.length == 0) {
		console.log("No scores found.");
		return;
	}

	var scoreBoard = document.createElement("div");
	scoreBoard.className = "score-board";

	var quizGroup = document.createElement("div");
	quizGroup.className = "quiz-group";

	var currentQuiz = "";
	for (const [i, score] of Object.entries(scores)) {
		if (currentQuiz !== score.quizName) {
			currentQuiz = score.quizName;

			scoreBoard.appendChild(quizGroup);

			quizGroup = document.createElement("div");
			quizGroup.className = "quiz-group";

			quizGroup.innerHTML += `<div class="quiz-topic">${score.quizName}</div>`;
		}

		var scoreGroup = document.createElement("div");
		scoreGroup.className = "score-group";
		scoreGroup.innerHTML = `
			<span class="initials">${score.initials}</span>
			<span class="score">${score.score}</span>
		`;

		quizGroup.appendChild(scoreGroup);

		if (Number(i) === scores.length - 1) {
			scoreBoard.appendChild(quizGroup);
		}
	}

	scoresElement.appendChild(scoreBoard);
}

function clearScores() {
	localStorage.setItem("highscores", "");
	scoresElement.innerHTML = "";
}

loadScores();
