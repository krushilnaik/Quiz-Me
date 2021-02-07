function loadScores() {
	console.log("loading scores...");

	if (localStorage.getItem("highscores") == "{}") {
		localStorage.setItem("highscores", JSON.stringify({
			"KN": Number.MAX_SAFE_INTEGER
		}));
		console.log(localStorage);
	}

	let scores = JSON.parse(localStorage.getItem("highscores"));
	console.log(scores);

	if (scores !== {}) {
		console.log("No scores found, exit code.");
		return;
	}

	let scoresElement = document.getElementById("scores");
	var scoreList = document.createElement("ol");

	for (const [player, score] of scores.entries()) {
		var temp = document.createElement("div");
		temp.className = "score";
		temp.innerText = `${player} - ${score}`;
		scoreList.appendChild(temp);
	}

	scoresElement.appendChild(scoreList);
}

loadScores();
